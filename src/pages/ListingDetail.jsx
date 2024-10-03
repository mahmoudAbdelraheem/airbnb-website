import axios from "axios";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import ListingHead from "../components/listings/ListingHead";
import Loading from "../components/Loading";
import { getListingById } from "../data/favorites/getListing";
import ListingInfo from "../components/listings/ListingInfo";
import Map from "../components/Map";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ListingReservation from "../components/listings/ListingReservation";
import getReservation from "../data/listings/getReservation";
const initalDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
export default function ListingDetail() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const loginModel = useLoginModal();
  const nav = useNavigate();

  const fetchCurrentUserData = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };
  const fetchReservations = async () => {
    const data = await getReservation();
    setReservations(data);
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
    fetchReservations();
    setLoading(false);
  }, [id]);

  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateٌٌٌRange] = useState(initalDateRange);
  const disableDates = useMemo(() => {
    let dates = [];
    reservations.forEach((item) => {
      const range = eachDayOfInterval({
        start: new Date(item.startDate),
        end: new Date(item.endDate),
      });
      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);
  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      return loginModel.onOpen();
    }
    setLoading(true);
    // add logic to create reservation
    console.log({ totalPrice, dateRange });
    axios
      .post("http://localhost:3000/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      })
      .then(() => {
        toast.success("Listing reserved successfully");
        setDateٌٌٌRange(initalDateRange);
        nav(0);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.toString());
        setLoading(false);
      });
  }, [totalPrice, dateRange, listing?.id, nav, currentUser, loginModel]);
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing?.price) {
        setTotalPrice(dayCount * listing?.price);
      } else {
        setTotalPrice(listing?.price);
      }
    }
  }, [dateRange, listing?.price]);
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
              <div className="order-first mb-10 md:order-last md:col-span-3">
                <ListingReservation
                  price={listing.price}
                  totalPrice={totalPrice}
                  onChangeDate={(value) => setDateٌٌٌRange(value)}
                  dateRange={dateRange}
                  onSubmit={onCreateReservation}
                  disabled={loading}
                  disabledDates={disableDates}
                />
              </div>
            </div>
          </div>
        </div>
        <Map />
      </Container>
    </>
  );
}
