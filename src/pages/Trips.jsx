import { useEffect, useState } from "react";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservationByUserId from "../data/listings/getReservationByUserId";
import TripsClient from "../components/TripsClient";
import Loading from "../components/Loading";

const Trips = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  // const fetchReservations = async () => {
  //   if (currentUser) {
  //      // Pass the userId
  //     console.log(data);
  //     setReservations(data);
  //   }
  // };

  const fetchCurrentUserData = async () => {
    setLoading(true);
    const data = await getCurrentUser();
    setCurrentUser(data);

    if (data && data.uid) {
      // fetchReservations(data.userId);
      const reservationData = await getReservationByUserId(data.uid);
      setReservations(reservationData);
      console.log(reservationData);
      // Fetch reservations when user is set
      reservationData.forEach(async (signleReservation) => {
        const listingData = await getListingById(signleReservation.listingId);
        setReservations((reservations[0].listing = listingData));
        // setListings((value) => {
        //   [...value, listingData];
        // });
      });
    }
    console.log(reservations);

    setLoading(false);
  };

  // useEffect with dependency array to avoid infinite loop
  useEffect(() => {
    fetchCurrentUserData();
  });

  if (loading) {
    return <Loading />;
  }

  if (!currentUser) {
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <EmptyState
          title="Unauthorized access!"
          subtitle="Please login first!"
        />
      </>
    );
  }

  if (reservations.length === 0) {
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <EmptyState
          title="No trips found!"
          subtitle="Looks like you haven't booked any trips!"
        />
      </>
    );
  }

  return (
    <>
      <SimpleNavbar user={currentUser} />
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </>
  );
};

export default Trips;
