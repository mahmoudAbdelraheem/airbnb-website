import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListingById } from "../../data/listings/getListing";
import Container from "../Container";
import ListingHead from "./ListingHead";

export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await getListingById(id);
        setListing(res.data);
      } catch (error) {
        alert("Error: ", error);
      }
    };

    fetchListing();
  }, [id]);

  if (!listing) {
    return <div>Loading...</div>;
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
        </div>
      </div>
    </Container>
  );
}
