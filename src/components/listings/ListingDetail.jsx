import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../Container";
import ListingHead from "./ListingHead";
import Loading from "../Loading";
import { getListingById } from "../../data/favorites/getListing";
import ListingInfo from "./ListingInfo";
import Map from "../Map";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await getListingById(id);
        console.log(res);

        setListing(res);
      } catch (error) {
        alert("Error: ", error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <Loading />;
  }

  return (
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
            />
          </div>
        </div>
      </div>
      <Map />
    </Container>
  );
}
