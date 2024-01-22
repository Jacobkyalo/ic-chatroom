import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VscAccount } from "react-icons/vsc";
import MemberDetailsCard from "../components/member-details-card";

export default function MemberProfile() {
  const [member, setMember] = useState({});
  const [loading, setLoading] = useState(false);

  const params = useParams();

  useEffect(() => {
    const getMember = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_USERS_ENDPOINT}/${params.id}`,
        );
        setMember(res.data);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
    };

    getMember();
  }, [params.id]);

  return (
    <main>
      <section className="mx-auto mt-16 flex h-auto w-full max-w-xl items-center justify-center rounded-lg bg-white p-4 text-center shadow-2xl sm:p-10">
        {loading ? (
          "Loading..."
        ) : (
          <div className="w-full">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-ic-green text-white">
              {/* <span className="text-2xl">{sliceName(member?.name)}</span> */}
              <VscAccount size={40} />
            </div>
            <div className="mb-6">
              <span className="text-xl text-neutral-600">{member?.name}</span>
            </div>

            <div className="flex w-full flex-col gap-y-4">
              <MemberDetailsCard member={member} />
            </div>

            <button
              type="button"
              onClick={() => alert("Not implemented yet!")}
              className="mt-10 rounded bg-ic-green px-6 py-3 text-white"
            >
              Message
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
