/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import HeartButton from "../HeartButton";

const ListingsCard = ({ data, currentUser }) => {
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <img
            src={data.imageSrc[0]}
            alt=""
            className="object-cover h-full w-full group-hover:scale-110 transition "
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">{data.location}</div>
        <div className="font-light text-neutral-500">{data.category}</div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {data.price}</div>
          <div className="font-light">night</div>
        </div>
      </div>
    </div>
  );
};
export default ListingsCard;
