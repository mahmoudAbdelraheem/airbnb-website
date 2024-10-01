import { useEffect, useState } from "react";
import AccountCards from "../components/account/AccountCards";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";
import Loading from "../components/Loading";

function Account() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
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
  return (
    <>
      <SimpleNavbar user={currentUser} />
      <div className="h-[20vh]" />
      <AccountCards />
    </>
  );
}

export default Account;
