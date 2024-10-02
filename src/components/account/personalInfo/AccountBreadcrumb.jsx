import { useNavigate } from "react-router-dom";

function AccountBreadcrumb() {
  const navigate = useNavigate();
  return (
    <div className="text-sm text-gray-600 mb-4">
      <span
        onClick={() => navigate("/account")}
        className="text-gray-800 text-xl font-semibold cursor-pointer "
      >
        Account
      </span>{" "}
      &gt;
      <span className="text-gray-800 text-lg font-semibold ">
        Personal Info
      </span>
    </div>
  );
}

export default AccountBreadcrumb;
