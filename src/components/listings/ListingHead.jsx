/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import Heading from "../Heading";
import getCurrentUser from "../../data/auth/getCurrentUser";
import ImageListing from "./ImageListing";

export default function ListingHead({ title, location, imageSrc, id }) {
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUser = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Heading title={title} subtitle={location} />
      <ImageListing imageSrc={imageSrc} id={id} />
    </>
  );
}
