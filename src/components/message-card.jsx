import { PropTypes } from "prop-types";
import { FaRegTrashCan } from "react-icons/fa6";
import useAuth from "../hooks/useAuth";

export default function MessageCard({ message, deleteMessage }) {
  const { user } = useAuth();
  return (
    <div className="mb-2 rounded-r-xl rounded-bl-xl bg-ic-green bg-opacity-30 text-black">
      <div className="p-4">
        <div className="flex items-center justify-between text-xs text-ic-pink">
          <span>@{message?.username}</span>
          <div className="flex items-center gap-x-2">
            <span>{message?.userEmail}</span>
            {message?.$permissions.includes(`delete("user:${user?.$id}")`) && (
              <FaRegTrashCan
                size={15}
                className="cursor-pointer"
                onClick={() => deleteMessage(message?.$id)}
              />
            )}
          </div>
        </div>
        <p className="my-2 text-sm">{message?.body}</p>
        <div className="text-end text-xs">
          <span>{new Date(message?.$createdAt).toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
}

MessageCard.propTypes = {
  message: PropTypes.shape({
    username: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    $createdAt: PropTypes.string.isRequired,
    $permissions: PropTypes.arrayOf(PropTypes.string).isRequired,
    $id: PropTypes.string.isRequired,
  }).isRequired,
  deleteMessage: PropTypes.func,
};
