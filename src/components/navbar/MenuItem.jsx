// eslint-disable-next-line react/prop-types
function MenuItem({ onClick, label }) {
  return (
    <div
      onClick={onClick}
      className="
            px-4
            py-3
            hover:bg-neutral-100
            transition
            font-semibold
            cursor-pointer
        "
    >
      {label}
    </div>
  );
}

export default MenuItem;
