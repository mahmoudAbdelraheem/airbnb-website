/* eslint-disable react/prop-types */
import placeholder from "../assets/placeholder.jpg";

function Avatar({ imageSrc }) {
  return (
    <img
      alt="avatar"
      className="
            rounded-full
            w-8
            h-8
            "
      src={imageSrc || placeholder}
    />
  );
}

export default Avatar;
