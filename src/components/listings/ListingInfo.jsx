import React, { useEffect, useState } from "react";
import Avatar from "../../components/Avatar";
import getHostById from "../../data/details/getHostById";
import Loading from "../Loading";

export default function ListingInfo({
  description,
  roomCount,
  location,
  guestCount,
  category,
  id,
}) {
  const [host, setHost] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await getHostById(id);
        console.log(res, "data");
        setHost(res);
      } catch (error) {
        alert("Error: ", error);
      }
    };

    fetchListing();
  }, [id]);

  if (!host) {
    return <Loading />;
  }

  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {host.name}</div>
          <Avatar imageSrc={host.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-6 py-7">
        <div className="flex flex-col">
          <div className="text-lg text-neutral-500 font-semibold">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}
