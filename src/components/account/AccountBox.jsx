/* eslint-disable react/prop-types */
function AccountBox({ icon: Icon, title, description, onClick }) {
  return (
    <div
      onClick={onClick}
      className="p-4 bg-white 
      shadow 
      cursor-pointer
      drop-shadow-xl rounded-lg flex flex-col items-start"
    >
      <div className="text-2xl">
        <Icon size={34} />
      </div>
      <h2 className="text-lg font-semibold mt-2">{title}</h2>
      <p className="text-gray-500 mt-1">{description}</p>
    </div>
  );
}

export default AccountBox;
