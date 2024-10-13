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
import { getReviewsByHostId } from "../data/reviews/getReviewsByHostId";
import Footer from "../components/Footer";

function Host() {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState(null);
  const [hostData, setHostData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [avarageRating, setAvarageRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentUserData = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };

  const fetchReviews = async () => {
    try {
      const data = await getReviewsByHostId(id);
      setReviews(data.reviews);
      setAvarageRating(data.averageRating);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const fetchHostData = async () => {
    try {
      const data = await getHostById(id);

      await fetchReviews(id);
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
            <HostCardInfo
              host={hostData}
              avarageRating={avarageRating}
              reviewsCount={reviews.length}
            />
            {/* Confirmed Information */}
            <HostConfirmedInfo host={hostData} />
          </div>

          {/* Right Section */}
          <div className="lg:w-2/3">
            {/* About Section */}
            <HostAbout host={hostData} />
            {/* Reviews Section */}
            <HostReviews host={hostData} reviews={reviews} />
          </div>
        </div>
        <Footer />
      </Container>
    </>
  );
}

export default Host;
