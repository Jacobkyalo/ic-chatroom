import PropTypes from "prop-types";

export default function Container({ children }) {
  return <div className="container mx-auto w-full">{children}</div>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
