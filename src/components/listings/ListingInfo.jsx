/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
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
  price,
}) {
  const { t } = useTranslation();
  const [host, setHost] = useState(null);
  const navigator = useNavigate();
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await getHostById(id);
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
          <div>
            {guestCount} {t("guests")}
          </div>
          <div>
            {roomCount} {t("rooms")}
          </div>
        </div>
        <div className="font-light text-2xl  text-neutral-500">{location}</div>
        <div className="flex flex-row items-center gap-4 text-2xl text-neutral-500">
          <div>{t(category)}</div>
        </div>
        <hr />
        <div className="flex flex-row items-center ">
          <div className="text-2xl font-semibold">
            {t("$")} {price}{" "}
          </div>
          <div className="font-light text-neutral-500 ml-3 text-sm">
            {t("pernight")}{" "}
          </div>
        </div>
        <hr />
      </div>
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
