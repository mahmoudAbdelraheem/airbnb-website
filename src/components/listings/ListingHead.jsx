import React from "react";
import Heading from "../Heading";
import HeartButton from "../HeartButton";

export default function ListingHead({ title, location, id, imageSrc }) {
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
          <HeartButton listingId={id} />
        </div>
      </div>
    </>
  );
}
