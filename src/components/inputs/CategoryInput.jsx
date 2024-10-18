/* eslint-disable react/prop-types */

export default function CategoryInput({ label, selected, onClick, imageUrl }) {
  return (
    <div
      onClick={() => onClick(label)}
      className={`
    rounded-xl
    border-2
    p-4
    flex
    flex-col
    gap-3
    hover:border-black
    transition
    cursor-pointer
    ${selected ? "border-black" : "border-neutral-200"}
    `}
    >
      <img src={imageUrl} alt={label} className="w-12 h-12 object-cover" />
      <div className="font-semibold">{label}</div>
    </div>
  );
}
