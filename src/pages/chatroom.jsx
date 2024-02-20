import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import axios from "axios";
import { VscAccount } from "react-icons/vsc";
import { MdMenu } from "react-icons/md";
import { IoPeopleOutline } from "react-icons/io5";
import { DB_ID, ROOM_COLL_ID, databases } from "../config/appwrite.config";
import LogoHeader from "../components/logo-header";
import RoomItem from "../components/room-item";
import MemberCard from "../components/member-card";
import chatImg from "../assets/images/ic_illustration5.svg";

export default function Chatroom() {
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const params = useParams();

  function openCommunities() {
    setIsCommunitiesOpen(true);
  }

  function closeCommunities() {
    setIsCommunitiesOpen(false);
  }

  function openMembers() {
    setIsMembersOpen(true);
  }

  function closeMembers() {
    setIsMembersOpen(false);
  }

  const getAllMembers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(import.meta.env.VITE_USERS_ENDPOINT);
      setMembers(res.data.users);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllMembers();

    const getAllRooms = async () => {
      try {
        setLoading(true);
        const res = await databases.listDocuments(DB_ID, ROOM_COLL_ID);
        setRooms(res.documents);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    getAllRooms();

    const getRoom = async () => {
      try {
        setLoading(true);
        const res = await databases.getDocument(
          DB_ID,
          ROOM_COLL_ID,
          params.roomId,
        );
        setRoom(res);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    if (location.pathname !== "/") {
      getRoom();
    }
  }, [params.roomId, location.pathname]);

  return (
    <>
      <section className="flex h-screen">
        <aside className="hidden w-72 overflow-auto p-6 md:block">
          <div className="flex flex-col gap-y-10">
            <LogoHeader />
            <div className="flex-1">
              <h4 className="mb-4 text-lg font-bold">Communities</h4>
              {loading ? (
                "Loading..."
              ) : (
                <ul className="flex flex-col gap-y-4">
                  {rooms?.map((room) => (
                    <RoomItem key={room.$id} room={room} />
                  ))}
                </ul>
              )}
            </div>
          </div>
        </aside>

        <main className="relative w-full flex-1 overflow-auto border-ic-green md:border-l-4 lg:border-r-4">
          <div className="sticky top-0 w-full bg-white px-2 py-6 shadow-lg sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <MdMenu
                  size={25}
                  className="cursor-pointer md:hidden"
                  onClick={openCommunities}
                />
                <span className="text-xl text-neutral-600">
                  # {room?.href?.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-x-2">
                <Link to="/account/profile">
                  <VscAccount
                    size={25}
                    className="text-neutral-600 transition-all duration-200 ease-in-out hover:text-ic-green"
                  />
                </Link>
                <IoPeopleOutline
                  size={25}
                  className="cursor-pointer lg:hidden"
                  onClick={openMembers}
                />
              </div>
            </div>
          </div>

          <>
            {isCommunitiesOpen && (
              <CommunitiesDialog
                isCommunitiesOpen={isCommunitiesOpen}
                closeCommunities={closeCommunities}
                rooms={rooms}
              />
            )}

            {isMembersOpen && (
              <MembersDialog
                isMembersOpen={isMembersOpen}
                closeMembers={closeMembers}
                members={members}
                loading={loading}
              />
            )}
          </>
          {location.pathname === "/" ? (
            <div className="mt-20">
              <img
                src={chatImg}
                alt="starter_chat_img"
                className="object-fit h-60 w-full"
              />
              <p className="text-center text-xl text-neutral-600">
                👈 Please select a community to send message
              </p>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
        <div className="hidden w-72 overflow-auto p-6 lg:block">
          <div className="flex-1">
            <h4 className="mb-4 text-lg font-bold">
              Members ({members.length})
            </h4>
            {loading ? (
              "Loading..."
            ) : (
              <ul className="flex flex-col gap-y-4">
                {members?.map((member) => (
                  <MemberCard key={member.$id} member={member} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

function CommunitiesDialog({ isCommunitiesOpen, closeCommunities, rooms }) {
  return (
    <>
      <Transition appear show={isCommunitiesOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeCommunities}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div>
                    <div className="flex flex-col gap-y-10">
                      <div className="flex items-center justify-between">
                        <LogoHeader />
                        <button
                          type="button"
                          className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ic-green text-sm font-medium text-white outline-none hover:bg-opacity-80"
                          onClick={closeCommunities}
                        >
                          X
                        </button>
                      </div>
                      <div>
                        <h4 className="mb-4 text-lg font-bold">Communities</h4>
                        <ul className="flex flex-col gap-y-4">
                          {rooms?.map((room) => (
                            <RoomItem
                              key={room.$id}
                              room={room}
                              closeCommunities={closeCommunities}
                            />
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded bg-ic-green px-4 py-2 text-sm font-medium text-white outline-none hover:bg-opacity-80"
                      onClick={closeCommunities}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

function MembersDialog({ isMembersOpen, closeMembers, members, loading }) {
  return (
    <>
      <Transition appear show={isMembersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeMembers}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mb-4 flex justify-end">
                    <button
                      type="button"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ic-green text-sm font-medium text-white outline-none hover:bg-opacity-80"
                      onClick={closeMembers}
                    >
                      X
                    </button>
                  </div>
                  <h4 className="mb-4 text-lg font-bold">
                    Members ({members?.length})
                  </h4>
                  <ul className="flex flex-col gap-y-4">
                    {loading ? (
                      "Loading..."
                    ) : (
                      <ul className="flex flex-col gap-y-4">
                        {members?.map((member) => (
                          <MemberCard key={member.$id} member={member} />
                        ))}
                      </ul>
                    )}
                  </ul>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded bg-ic-green px-4 py-2 text-sm font-medium text-white outline-none hover:bg-opacity-80"
                      onClick={closeMembers}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

CommunitiesDialog.propTypes = {
  isCommunitiesOpen: PropTypes.bool.isRequired,
  closeCommunities: PropTypes.func.isRequired,
  rooms: PropTypes.array.isRequired,
};

MembersDialog.propTypes = {
  isMembersOpen: PropTypes.bool.isRequired,
  closeMembers: PropTypes.func.isRequired,
  members: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};
