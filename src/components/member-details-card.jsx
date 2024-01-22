import { PropTypes } from "prop-types";
import { FaRegEnvelope } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";

export default function MemberDetailsCard({ member }) {
  return (
    <>
      <div className="w-full rounded border-2 border-ic-green">
        <div className="flex items-center gap-x-4 p-2">
          <VscAccount size={20} className="text-ic-green" />
          <span>{member?.name}</span>
        </div>
      </div>
      <div className="w-full rounded border-2 border-ic-green">
        <div className="flex items-center gap-x-4 p-2">
          <FaRegEnvelope size={20} className="text-ic-green" />
          <span>{member?.email}</span>
        </div>
      </div>
      <div className="w-full rounded border-2 border-ic-green">
        <div className="flex items-center gap-x-4 p-2">
          <LuPhone size={20} className="text-ic-green" />
          <span>{member?.phone || "N/A"}</span>
        </div>
      </div>
    </>
  );
}

MemberDetailsCard.propTypes = {
  member: PropTypes.object.isRequired,
};
