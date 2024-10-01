import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import ListingHead from "../components/listings/ListingHead";
import Loading from "../components/Loading";
import { getListingById } from "../data/favorites/getListing";
import ListingInfo from "../components/listings/ListingInfo";
import Map from "../components/Map";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCurrentUserData = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };

  const fetchListing = async () => {
    try {
      const res = await getListingById(id);
      console.log("listing fetch data", res);

      setListing(res);
    } catch (error) {
      alert("Error: ", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchListing();
    fetchCurrentUserData();
    setLoading(false);
  }, [id]);

  if (loading || !listing) {
    return <Loading />;
  }

  return (
    <>
      <SimpleNavbar user={currentUser} />
      <div className="h-[15vh]" />
      <Container>
        <div className="max-w-screen-lg mx-auto">
          <div className="flex flex-col gap-6">
            <ListingHead
              title={listing.title}
              imageSrc={listing.imageSrc}
              location={listing.location}
              id={listing.id}
            />
            <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
              <ListingInfo
                description={listing.description}
                location={listing.location}
                guestCount={listing.guestCount}
                roomCount={listing.roomCount}
                category={listing.category}
                id={listing.userId}
                price={listing.price}
              />
            </div>
          </div>
        </div>
        <Map />
      </Container>
    </>
  );
}
