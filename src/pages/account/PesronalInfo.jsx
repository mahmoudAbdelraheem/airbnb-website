import { useEffect, useState } from "react";
import getCurrentUser from "../../data/auth/getCurrentUser";
import Loading from "../../components/Loading";
import Container from "../../components/Container";
import InfoSection from "../../components/account/personalInfo/InfoSection";
import AccountBreadcrumb from "../../components/account/personalInfo/AccountBreadcrumb";
import UserDataSection from "../../components/account/personalInfo/UserDataSection";
function PersonalInfo() {
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
    <Container>
      <div className=" mx-auto p-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <AccountBreadcrumb />

        {/* Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Section (Personal Info) */}
          <UserDataSection currentUser={currentUser} />
          {/* Right Section (Info Explanation) */}
          <InfoSection />
        </div>
      </div>
    </Container>
  );
}

export default PersonalInfo;
