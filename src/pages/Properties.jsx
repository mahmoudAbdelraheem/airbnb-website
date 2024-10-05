import { useEffect, useState } from "react";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";
import EmptyState from "../components/EmptyState";
import Loading from "../components/Loading";
import getCurrentUserProperties from "../data/properites/getCurrentUserProperites";
import PropertiesClient from "../components/PropertiesClient";

const Properties = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCurrentUserDataAndProperties = async () => {
    setLoading(true);
    const userData = await getCurrentUser();
    setCurrentUser(userData);
    const propertiesData = await getCurrentUserProperties(userData.uid);
    setProperties(propertiesData);
    console.log("current user properties", propertiesData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentUserDataAndProperties();
  }, []);

  if (loading) {
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <Loading />;
      </>
    );
  }

  if (!currentUser) {
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <EmptyState
          title="Unauthorized access!"
          subtitle="Please login first!"
        />
      </>
    );
  }

  if (properties.length === 0) {
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <EmptyState
          title="No properties found!"
          subtitle="Looks like you have not listed any properties yet!"
        />
      </>
    );
  }

  return (
    <>
      <SimpleNavbar user={currentUser} />
      <PropertiesClient listings={properties} currentUser={currentUser} />
    </>
  );
};

export default Properties;
