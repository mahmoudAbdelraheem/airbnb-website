import { useEffect, useState } from "react";
import AccountCards from "../../components/account/AccountCards";
import SimpleNavbar from "../../components/navbar/SimpleNavbar";
import getCurrentUser from "../../data/auth/getCurrentUser";
import Loading from "../../components/Loading";
import { Outlet, useLocation } from "react-router-dom";
import ToasterProvider from "../../providers/ToasterProvider";

function Account() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); // Get current path

  const fetchCurrentUserData = async () => {
    setLoading(true);
    const data = await getCurrentUser();
    setCurrentUser(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Conditionally render the account cards if not on a nested route
  return (
    <>
      <ToasterProvider />

      <SimpleNavbar user={currentUser} />
      <div className="h-[20vh]" />

      {/* Outlet renders child components for nested routes */}
      <Outlet />

      {/* Show AccountCards only on the base /account route */}
      {location.pathname === "/account" && <AccountCards />}
    </>
  );
}

export default Account;
