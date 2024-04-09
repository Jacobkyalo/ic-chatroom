import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-toastify";
import { ID } from "appwrite";
import axios from "axios";
import { Helmet } from "react-helmet";
import { VscAccount } from "react-icons/vsc";
import { MdMenu, MdOutlineHelpOutline } from "react-icons/md";
import useAuth from "../hooks/useAuth";
import { IoPeopleOutline } from "react-icons/io5";
import { DB_ID, ROOM_COLL_ID, databases } from "../config/appwrite.config";
import LogoHeader from "../components/logo-header";
import RoomItem from "../components/room-item";
import MemberCard from "../components/member-card";
import chatImg from "../assets/images/ic_illustration5.svg";

export default function Chatroom() {
  const [isCommunitiesOpen, setIsCommunitiesOpen] = useState(false);
  const [isMembersOpen, setIsMembersOpen] = useState(false);
  const [isAddCommunityOpen, setIsAddCommunityOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState({});
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

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

  function openAddCommunityModal() {
    setIsAddCommunityOpen(true);
  }

  function closeAddCommunityModal() {
    setIsAddCommunityOpen(false);
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
      <Helmet>
        <title>Chatroom | Innovation Club</title>
        <meta
          name="description"
          content="Meru University Innovation Club Chatroom"
        />
        <meta
          name="keywords"
          content="Chatroom system, Meru University of Science and Technology, Meru University Innovation Club, Meru University Innovation Club Chatroom, Meru University Innovation Club Chatroom System, Innovation Club, Innovation Club Chatroom, Innovation Club Chatroom System"
        />
      </Helmet>
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

              {user?.labels?.includes("admin") && (
                <button
                  type="button"
                  onClick={openAddCommunityModal}
                  className="mt-8 flex w-full items-center justify-center gap-x-2 rounded bg-ic-green px-4 py-3 text-base text-white"
                >
                  + Chatroom
                </button>
              )}
            </div>
          </div>
        </aside>

        <main className="relative w-full flex-1 overflow-auto border-ic-green md:border-l-4 lg:border-r-4">
          <div className="sticky top-0 w-full bg-white px-2 py-6 shadow-lg sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-4">
                <MdMenu
                  size={25}
                  className="cursor-pointer md:hidden"
                  onClick={openCommunities}
                />
                <span className="text-xl text-neutral-600">
                  # {room?.href?.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-x-4">
                <Link to="/h/help">
                  <MdOutlineHelpOutline
                    size={25}
                    className="text-neutral-600 transition-all duration-200 ease-in-out hover:text-ic-green"
                  />
                </Link>
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
                openAddCommunityModal={openAddCommunityModal}
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

            {open && (
              <AddCommunityModal
                isAddCommunityOpen={isAddCommunityOpen}
                closeAddCommunityModal={closeAddCommunityModal}
                setIsAddCommunityOpen={setIsAddCommunityOpen}
                rooms={rooms}
                setRooms={setRooms}
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

function AddCommunityModal({
  isAddCommunityOpen,
  closeAddCommunityModal,
  setIsAddCommunityOpen,
  rooms,
  setRooms,
}) {
  const [addLoading, setAddLoading] = useState(false);
  const navigate = useNavigate();

  const schema = yup
    .object()
    .shape({
      name: yup.string().required("Please provide a chatroom name"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const payload = {
        name: data.name,
        href: null,
      };
      setAddLoading(true);
      const res = await databases.createDocument(
        DB_ID,
        ROOM_COLL_ID,
        ID.unique(),
        payload,
      );

      setAddLoading(false);
      setIsAddCommunityOpen(false);
      navigate("/");
      toast.success("Chatroom added successfully");
      console.log("rooms:", rooms);
      console.log("typeof rooms:", typeof rooms);
      // if (Array.isArray(rooms)) {
      setRooms([...rooms, res]);
      // }
    } catch (error) {
      toast.error(error.message);
      setAddLoading(false);
    }
  };
  return (
    <Transition appear show={isAddCommunityOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={closeAddCommunityModal}
      >
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
                  <div className="flex flex-col gap-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold">New Chatroom</h2>
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-ic-green text-sm font-medium text-white outline-none hover:bg-opacity-80"
                        onClick={closeAddCommunityModal}
                      >
                        X
                      </button>
                    </div>
                    <div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                          <label htmlFor="roomName">
                            <span className="mb-1 block">Chatroom name</span>
                            <input
                              {...register("name")}
                              type="text"
                              placeholder="Chatroom name"
                              name="name"
                              id="roomName"
                              // value={roomName}
                              autoComplete="off"
                              className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                            />
                            <span className="mt-1 block text-sm text-red-600">
                              {errors.name?.message}
                            </span>
                          </label>
                        </div>
                        <button
                          type="submit"
                          disabled={addLoading}
                          className="my-4 w-full rounded bg-ic-green py-3 text-base text-white"
                        >
                          {addLoading ? "Please wait..." : "Add Chatroom"}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
function CommunitiesDialog({
  isCommunitiesOpen,
  closeCommunities,
  rooms,
  openAddCommunityModal,
}) {
  const { user } = useAuth();
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
                        {user?.labels?.includes("admin") && (
                          <button
                            type="button"
                            onClick={openAddCommunityModal}
                            className="mt-8 flex w-full items-center justify-center gap-x-2 rounded bg-ic-green px-4 py-3 text-base text-white"
                          >
                            + Chatroom
                          </button>
                        )}
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

AddCommunityModal.propTypes = {
  isAddCommunityOpen: PropTypes.bool,
  closeAddCommunityModal: PropTypes.func,
  setIsAddCommunityOpen: PropTypes.func,
  rooms: PropTypes.array,
  setRooms: PropTypes.func,
};

CommunitiesDialog.propTypes = {
  isCommunitiesOpen: PropTypes.bool,
  closeCommunities: PropTypes.func,
  openAddCommunityModal: PropTypes.func,
  rooms: PropTypes.array,
};

MembersDialog.propTypes = {
  isMembersOpen: PropTypes.bool,
  closeMembers: PropTypes.func,
  members: PropTypes.array,
  loading: PropTypes.bool,
};
