import React, { useEffect, useState } from "react";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservation from "../data/listings/getReservation";
import { Link } from "react-router-dom";
import Container from "../components/Container";
import Navbar from "../components/navbar/Navbar";
import TripsClient from "../components/TripsClient";

const Trips = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [reservations, setreservations] = useState([]);

  const fetchReservations = async () => {
    const data = await getReservation();
    console.log(data);
    setreservations(data);
  };

  const fetchCurrentUserData = async () => {
    const data = await getCurrentUser();
    setCurrentUser(data);
  };

  useEffect(() => {
    fetchCurrentUserData();
  }, []);

  if (!currentUser) {
    return (
      <>
        <Navbar user={currentUser} />
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
        <Navbar user={currentUser} />
        <EmptyState
          title="No trips found!"
          subtitle="Looks like you haven't booked any trips!"
        />
      </>
    );
  }

  return (
    <>
      <Navbar user={currentUser} />
      <TripsClient reservations={reservations} currentUser={currentUser} />
    </>
  );
};

export default Trips;
