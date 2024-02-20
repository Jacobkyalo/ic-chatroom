import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ID, Query } from "appwrite";
import { toast } from "react-toastify";
import { MdOutlineAttachFile } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import client, {
  databases,
  DB_ID,
  MSG_COLL_ID,
} from "../config/appwrite.config";
import MessageCard from "./message-card";

export default function Room() {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { roomId } = useParams();

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message) return;

    const payload = {
      userId: user.$id,
      username: user.name,
      userEmail: user.email,
      body: message,
      roomId: roomId,
    };

    try {
      await databases.createDocument(DB_ID, MSG_COLL_ID, ID.unique(), payload);
      setMessage("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getMessages = async () => {
    try {
      const res = await databases.listDocuments(DB_ID, MSG_COLL_ID, [
        Query.equal("roomId", roomId),
        Query.orderAsc("$createdAt"),
      ]);
      setMessages(res.documents);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteMessage = async (messageId) => {
    try {
      await databases.deleteDocument(DB_ID, MSG_COLL_ID, messageId);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessages();

    const unsubscribe = client.subscribe(
      `databases.${DB_ID}.collections.${MSG_COLL_ID}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create",
          )
        ) {
          console.log("A MESSAGE WAS CREATED");
          setMessages((prevState) => [response.payload, ...prevState]);
        }

        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete",
          )
        ) {
          console.log("A MESSAGE WAS DELETED!!!");
          setMessages((prevState) =>
            prevState.filter((message) => message.$id !== response.payload.$id),
          );
        }
      },
    );

    // console.log("unsubscribe:", unsubscribe);

    return () => {
      unsubscribe();
    };
  }, [getMessages]);

  return (
    <>
      <div className="mb-32 h-full overflow-auto pt-6 md:pl-6 md:pr-6">
        <p className="mb-4 text-center text-sm text-neutral-600">
          {new Date().toDateString()}
        </p>

        {messages.length < 1 ? (
          <p className="mt-10 text-center text-neutral-600">
            No Messages here yet
          </p>
        ) : (
          <>
            {messages?.map((message) => (
              <MessageCard
                key={message.$id}
                message={message}
                deleteMessage={deleteMessage}
              />
            ))}
          </>
        )}
      </div>
      <div className="sticky bottom-0">
        <form
          onSubmit={sendMessage}
          className="absolute bottom-0 w-full border-t bg-white px-2 py-6 md:px-6"
        >
          <div className="flex items-center gap-x-4">
            <button
              type="button"
              onClick={() => alert("Not implemented yet")}
              className="rounded-full bg-ic-green p-3 text-white hover:opacity-80"
            >
              <MdOutlineAttachFile size={20} />
            </button>
            <label htmlFor="message" className="w-full">
              <textarea
                name="message"
                id="message"
                cols="30"
                rows="2"
                placeholder="Message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full resize-none overflow-hidden rounded-full px-6 pt-1 outline-none ring-1 ring-ic-green"
              />
            </label>
            <button
              type="submit"
              className="rounded-full bg-ic-green p-3 text-center text-white hover:opacity-80"
            >
              <IoSend size={20} />
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
