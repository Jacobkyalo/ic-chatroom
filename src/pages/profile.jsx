import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useState } from "react";
import {
  IoChevronBack,
  IoTrashOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import useAuth from "../hooks/useAuth";
import { sliceName } from "../utils";
import Container from "../components/container";

export default function Profile() {
  const {
    user,
    loading,
    logoutUser,
    updateName,
    updateEmail,
    updatePhone,
    updatePassword,
  } = useAuth();
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [phonePassword, setPhonePassword] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  // console.log(user);
  return (
    <>
      <Helmet>
        <title>Profile | Chatroom - Innovation Club</title>
        <meta
          name="description"
          content="Your profile for Innovation Club Chatroom"
        />
        <meta
          name="keywords"
          content="Chatroom system, Meru University of Science and Technology, Meru University Innovation Club, Meru University Innovation Club Chatroom, Meru University Innovation Club Chatroom System, Innovation Club, Innovation Club Chatroom, Innovation Club Chatroom System"
        />
      </Helmet>
      <main>
        <Container>
          <header className="flex items-center justify-between py-3">
            <Link
              to="/"
              className="flex items-center gap-x-2 text-base font-medium text-black hover:text-ic-green"
            >
              <IoChevronBack size={15} />
              Chatroom
            </Link>
            <button
              type="button"
              disabled={loading}
              className="flex items-center gap-x-2 rounded bg-red-600 px-4 py-2 text-base text-white"
              onClick={logoutUser}
            >
              <IoLogOutOutline size={20} />
              {loading ? "Logging out..." : "Logout"}
            </button>
          </header>

          <section className="mx-auto my-10 w-full max-w-3xl">
            <div className="bg-ic-greenn rounded-lg bg-opacity-10 py-6">
              <h2 className="mb-8 text-3xl font-bold text-black">
                My profile details
              </h2>

              <div className="mb-4 rounded-lg border border-ic-green p-4">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex items-center gap-x-4">
                    <div className="full flex h-10 w-10 items-center justify-center rounded-full bg-ic-green">
                      <span className="text-lg text-white">
                        {sliceName(user?.name)}
                      </span>
                    </div>
                    <span className="text-lg">{user?.name}</span>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span>{user?.email}</span>
                    <span>
                      Joined: {new Date(user?.$createdAt).toDateString()}
                    </span>
                  </div>
                  <div className="rounded-full bg-ic-green p-2 text-sm text-white">
                    {user?.emailVerification === true
                      ? "Verified"
                      : "Unverified"}
                  </div>
                </div>
                <div className="my-4">
                  <hr />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled
                    className="rounded-md border-0 bg-ic-green p-3 text-sm text-white outline-none"
                  >
                    Verify account
                  </button>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-ic-green p-4">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-col gap-y-2">
                    <span className="text-lg font-bold">Name</span>
                    <span className="text-sm">Update your name here</span>
                  </div>
                  <div>
                    <label htmlFor="name">
                      <span className="mb-1 block">Name</span>
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        id="name"
                        autoComplete="on"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                      />
                    </label>
                  </div>
                </div>
                <div className="my-4">
                  <hr />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => updateName(name)}
                    className="rounded-md border-0 bg-ic-green p-3 text-sm text-white outline-none"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-ic-green p-4">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-col gap-y-2">
                    <span className="text-lg font-bold">Email</span>
                    <span className="text-sm">Update your email here</span>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label htmlFor="email">
                      <span className="mb-1 block">Email</span>
                      <input
                        type="email"
                        placeholder="Email address"
                        name="email"
                        id="email"
                        autoComplete="on"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                      />
                    </label>
                    <label htmlFor="email-password">
                      <span className="mb-1 block">Your Password</span>
                      <input
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        id="email-password"
                        autoComplete="off"
                        value={emailPassword}
                        onChange={(e) => setEmailPassword(e.target.value)}
                        required
                        className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                      />
                    </label>
                  </div>
                </div>
                <div className="my-4">
                  <hr />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => updateEmail(email, emailPassword)}
                    className="rounded-md border-0 bg-ic-green p-3 text-sm text-white outline-none"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-ic-green p-4">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-col gap-y-2">
                    <span className="text-lg font-bold">Phone</span>
                    <span className="text-sm">
                      Update your phone here e.g +254712345678
                    </span>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label htmlFor="phone">
                      <span className="mb-1 block">Phone Number</span>
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        name="phone"
                        id="phone"
                        autoComplete="off"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                      />
                    </label>
                    <label htmlFor="phone-password">
                      <span className="mb-1 block">Your Password</span>
                      <input
                        type="password"
                        placeholder="Your Password"
                        name="password"
                        id="phone-password"
                        autoComplete="off"
                        value={phonePassword}
                        onChange={(e) => setPhonePassword(e.target.value)}
                        required
                        className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                      />
                    </label>
                  </div>
                </div>
                <div className="my-4">
                  <hr />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => updatePhone(phone, phonePassword)}
                    className="rounded-md border-0 bg-ic-green p-3 text-sm text-white outline-none"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-ic-green p-4">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-col gap-y-2">
                    <span className="text-lg font-bold">New Password</span>
                    <span className="text-sm">Update your password here</span>
                  </div>
                  <div className="flex flex-col gap-y-1">
                    <label htmlFor="new-password">
                      <span className="mb-1 block">New Password</span>
                      <input
                        type="password"
                        placeholder="New Password"
                        name="password"
                        id="new-password"
                        autoComplete="off"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                      />
                    </label>
                    <label htmlFor="old-password">
                      <span className="mb-1 block">Old Password</span>
                      <input
                        type="password"
                        placeholder="Old Password"
                        name="oldPassword"
                        id="old-password"
                        autoComplete="off"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        className="w-full rounded border border-neutral-600 p-3 outline-none placeholder:text-sm focus:border-ic-green focus:ring-1 focus:ring-ic-green"
                      />
                    </label>
                  </div>
                </div>
                <div className="my-4">
                  <hr />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => updatePassword(newPassword, oldPassword)}
                    className="rounded-md border-0 bg-ic-green p-3 text-sm text-white outline-none"
                  >
                    Update
                  </button>
                </div>
              </div>

              <div className="mb-4 rounded-lg border border-ic-green p-4">
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-col gap-y-2">
                    <span className="text-lg font-bold text-red-600">
                      Delete Account
                    </span>
                    <span className="text-sm">
                      You will be permanently deleted from database, including
                      all data associated with you. This action is irreversible.
                    </span>
                  </div>
                  <div className="flex items-center gap-x-4 rounded-lg border p-3">
                    <div className="full flex h-10 w-10 items-center justify-center rounded-full bg-ic-green">
                      <span className="text-lg text-white">
                        {sliceName(user?.name)}
                      </span>
                    </div>
                    <div className="block text-sm">
                      <span>{user?.name}</span>
                      <br />
                      <span>{user?.email}</span>
                    </div>
                  </div>
                </div>
                <div className="my-4">
                  <hr />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => alert("Not implemented yet")}
                    className="mt-8 flex items-center gap-x-2 rounded bg-red-600 px-6 py-3 text-base text-white"
                  >
                    <IoTrashOutline size={20} />
                    Delete account
                  </button>
                </div>
              </div>
            </div>
          </section>
        </Container>
      </main>
    </>
  );
}
