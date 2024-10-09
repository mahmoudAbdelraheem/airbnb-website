import { useEffect, useState } from "react";
import EmptyState from "../components/EmptyState";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";
import Loading from "../components/Loading";
import getReservationByAuthorId from "../data/reservations/getReservationsByAuthorId";
import ReservationsClient from "../components/reservations/ReservationsClient";
import Footer from "../components/Footer";

function Reservations() {
  const [currentUser, setCurrentUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchCurrentUserDataAndReservations = async () => {
    setLoading(true);
    const userData = await getCurrentUser();
    setCurrentUser(userData);
    const reservationData = await getReservationByAuthorId(userData.uid);
    setReservations(reservationData);
    setLoading(false);
  };

  useEffect(() => {
    fetchCurrentUserDataAndReservations();
  }, []);

  if (loading) {
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <Loading />
        <Footer />
      </>
    );
  }

  if (reservations.length === 0) {
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
        <Footer />
      </>
    );
  }

  if (!currentUser) {
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <EmptyState
          title="Unauthorized access!"
          subtitle="Please login first!"
        />
        <Footer />
      </>
    );
  }
  return (
    <>
      <SimpleNavbar user={currentUser} />
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
      <Footer />
    </>
  );
}

export default Reservations;
