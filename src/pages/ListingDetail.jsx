import { useEffect, useState, useMemo, useCallback } from "react";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import ListingHead from "../components/listings/ListingHead";
import Loading from "../components/Loading";
import { getListingById } from "../data/favorites/getListingById";
import ListingInfo from "../components/listings/ListingInfo";
import Map from "../components/Map";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";
import useLoginModal from "../hooks/useLoginModal";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ListingReservation from "../components/listings/ListingReservation";
import getReservationByListingId from "../data/listings/getReservationByListingId";
import ToasterProvider from "../providers/ToasterProvider";
import LoginModal from "../components/modals/LoginModal";
import { createNewReservation } from "../data/details/createNewReservation";
const initialDateRange = {
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
  // const registerModel = useRegisterModal();
  const nav = useNavigate();

  const fetchCurrentUserData = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
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

  const fetchReservations = async () => {
    const data = await getReservationByListingId(id);
    console.log("reservations fetch data", data);
    setReservations(data);
  };

  useEffect(() => {
    setLoading(true);
    fetchListing();
    fetchCurrentUserData();
    fetchReservations();
    setLoading(false);
  }, [id]);

  const [totalPrice, setTotalPrice] = useState(listing?.price);
  const [dateRange, setDateRange] = useState(initialDateRange);
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

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModel.onOpen();
    }

    setLoading(true);

    // Call the Firebase function
    const result = await createNewReservation({
      totalPrice,
      dateRange,
      listingId: listing.id,
      userId: currentUser.uid,
    });

    if (result.success) {
      // Success feedback
      toast.success("Listing reserved successfully");
      nav("/trips");
      // Reset date range and stop loading
      setDateRange(initialDateRange);
      nav(0);
    } else {
      // Handle errors
      toast.error(result.message);
    }

    setLoading(false);
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
      <ToasterProvider />
      <LoginModal />
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
                  onChangeDate={(value) => setDateRange(value)}
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
