import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getHostById from "../data/details/getHostById";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import Loading from "../components/Loading";
import getCurrentUser from "../data/auth/getCurrentUser";
import ToasterProvider from "../providers/ToasterProvider";
import { toast } from "react-hot-toast";
import Container from "../components/Container";
import HostCardInfo from "../components/host/HostCardInfo";
import HostAbout from "../components/host/HostAbout";
import HostReviews from "../components/host/HostReviews";
import HostConfirmedInfo from "../components/host/HostConfirmedInfo";

function Host() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [hostData, setHostData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentUserData = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };

  const fetchHostData = async () => {
    try {
      const data = await getHostById(id);
      console.log("current host data ", data);
      setHostData(data);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    fetchHostData();
    fetchCurrentUserData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <>
        <ToasterProvider />
        <SimpleNavbar user={currentUser} />
        <Loading />
      </>
    );
  }

  if (!hostData) return null;

  return (
    <>
      <ToasterProvider />
      <SimpleNavbar user={currentUser} />
      <div className="h-[15vh]" />

      <Container>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Section */}
          <div className="w-full lg:w-1/3 space-y-8">
            {" "}
            {/* Added this div to wrap both */}
            {/* Host Card */}
            <HostCardInfo host={hostData} />
            {/* Confirmed Information */}
            <HostConfirmedInfo host={hostData} />
          </div>

          {/* Right Section */}
          <div className="lg:w-2/3">
            {/* About Section */}
            <HostAbout host={hostData} />
            {/* Reviews Section */}
            {/* //TODO: adding reviews in firebase */}
            <HostReviews host={hostData} />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Host;
