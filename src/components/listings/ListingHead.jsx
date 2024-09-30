import React, { useEffect, useState } from "react";
import Heading from "../Heading";
import HeartButton from "../HeartButton";
import getCurrentUser from "../../data/auth/getCurrentUser";

export default function ListingHead({ title, location, id, imageSrc }) {
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
      <div
        className="
      w-full h-[60vh]
      overflow-hidden
      rounded-xl
      relative
      "
      >
        <img src={imageSrc} alt="Image" className="object-cover w-full " />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
