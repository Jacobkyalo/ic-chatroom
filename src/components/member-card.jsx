import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";

export default function MemberCard({ member }) {
  return (
    <li className="w-full border-none outline-none">
      <Link
        to={`/member/${member?.$id}`}
        className="flex items-center gap-x-2 rounded px-2 py-3 text-neutral-700 transition-all duration-150 ease-in-out hover:bg-ic-green hover:bg-opacity-30 hover:text-neutral-900"
      >
        <VscAccount size={20} />
        <span>{member?.name}</span>
      </Link>
    </li>
  );
}

MemberCard.propTypes = {
  member: PropTypes.object.isRequired,
};
