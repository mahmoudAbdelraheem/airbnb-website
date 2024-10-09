import { useEffect, useState } from "react";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservationByUserId from "../data/listings/getReservationByUserId";
import TripsClient from "../components/TripsClient";
import Loading from "../components/Loading";
import { useTranslation } from "react-i18next";
import ReviewModal from "../components/modals/ReviewModal";
import Footer from "../components/Footer";

const Trips = () => {
  const { t } = useTranslation();

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
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <Loading />;
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

  if (reservations.length === 0) {
    return (
      <>
        <SimpleNavbar user={currentUser} />
        <EmptyState title={t("hfound")} subtitle={t("pfound")} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <ReviewModal />
      <SimpleNavbar user={currentUser} />
      <TripsClient reservations={reservations} currentUser={currentUser} />
      <Footer />
    </>
  );
};

export default Trips;
