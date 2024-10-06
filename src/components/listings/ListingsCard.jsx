/* eslint-disable react/prop-types */
import HeartButton from "../HeartButton";
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Button from "../Button";
import { useTranslation } from "react-i18next";

const ListingsCard = ({
  data,
  currentUser,
  reservation,
  onAction,
  actionLabel,
  actionId = "",
  disabled,
}) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const nav = useNavigate();

  const handleNextClick = (e) => {
    e.stopPropagation(); // Prevent navigation on click
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.imageSrc.length);
  };

  const handlePrevClick = (e) => {
    e.stopPropagation(); // Prevent navigation on click
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + data.imageSrc.length) % data.imageSrc.length
    );
  };

  const handleCancel = useCallback(
    (e) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  // const price = useMemo(() => {
  //   if (reservation) {
  //     return reservation.totalPrice;
  //   }

  //   return data.price;
  // }, [reservation, data.price]);

  // const reservationDate = useMemo(() => {
  //   if (!reservation) {
  //     return null;
  //   }

  //   const start = new Date(reservation.startDate);
  //   const end = new Date(reservation.endDate);

  //   return `${format(start, "PP")} - ${format(end, "PP")}`;
  // }, [reservation]);

  return (
    <div
      onClick={() => nav(`/listings/${data.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
          <div className="aspect-square w-full relative overflow-hidden rounded-xl">
            <img
              src={data.imageSrc[currentIndex]}
              alt={`Image ${currentIndex}`}
              className="object-cover h-full w-full group-hover:scale-110 transition "
            />
            <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
            <button
              onClick={handlePrevClick}
              className="h-8 w-8 absolute top-1/2 left-2 transform  flex justify-center items-center -translate-y-1/2 bg-white  text-black p-2 rounded-full hover:bg-gray-300"
            >
              {"<"}
            </button>
            <button
              onClick={handleNextClick}
              className=" h-8 w-8 absolute top-1/2 right-2 flex justify-center items-center transform -translate-y-1/2 bg-white  text-black p-2 rounded-full hover:bg-gray-300"
            >
              {">"}
            </button>
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {data.imageSrc.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    currentIndex === index ? "bg-white" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="font-semibold text-lg">{data.location}</div>
        {!reservation && (
          <div className="font-light text-neutral-500">{t(data.category)}</div>
        )}
        {reservation && (
          <div className="font-light text-neutral-500">
            {reservation.startDate} - {reservation.endDate}
          </div>
        )}
        <div className="flex flex-row items-center gap-1">
          {!reservation && (
            <>
              <div className="font-semibold">{data.price}$</div>
              <div className="font-light">{t("night")}</div>
            </>
          )}
          {reservation && (
            <div className="font-semibold">
              {t("totalPrice")}: {reservation.totalPrice}$
            </div>
          )}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
export default ListingsCard;
