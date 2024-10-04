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

  const fetchCurrentUserDataAndReservations = async () => {
    setLoading(true);
    const userData = await getCurrentUser();
    setCurrentUser(userData);
    const reservationData = await getReservationByUserId(userData.uid);
    setReservations(reservationData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentUserDataAndReservations();
  }, []);

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
