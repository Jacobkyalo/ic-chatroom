import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

export default function RoomItem({ room }) {
  return (
    <li className="w-full">
      <Link
        to={`${room?.$id}`}
        className="flex items-center gap-x-2 rounded px-2 py-3 text-neutral-700 transition-all duration-150 ease-in-out hover:bg-ic-green hover:bg-opacity-30 hover:text-neutral-900"
      >
        <span>#</span>
        <span>{room?.name}</span>
      </Link>
    </li>
  );
}

RoomItem.propTypes = {
  room: PropTypes.shape({
    name: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    $id: PropTypes.string.isRequired,
  }).isRequired,
};
