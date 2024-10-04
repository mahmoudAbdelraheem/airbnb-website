import React, { useEffect, useState } from "react";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import getCurrentUser from "../data/auth/getCurrentUser";
import EmptyState from "../components/EmptyState";
import getReservationByUserId from "../data/listings/getReservationByUserId";
import Container from "../components/Container";
import Navbar from "../components/navbar/Navbar";
import TripsClient from "../components/TripsClient";
import Loading from "../components/Loading";
import { getListingById } from "../data/favorites/getListingById";

const Trips = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);

  // Fetch current user and reservations
  const fetchCurrentUserData = async () => {
    setLoading(true);
    const data = await getCurrentUser();
    setCurrentUser(data);

    if (data && data.uid) {
      const reservationData = await getReservationByUserId(data.uid);
      setReservations(reservationData);

      // Fetch listings for each reservation
      const listingsData = await Promise.all(
        reservationData.map(async (singleReservation) => {
          const listingData = await getListingById(singleReservation.listingId);
          return listingData;
        })
      );

      setListings(listingsData); // Set listings
    }
    setLoading(false);
  };

  // useEffect with dependency array to avoid infinite loop
  useEffect(() => {
    fetchCurrentUserData();
  }, []); // Run once on component mount

  if (loading) {
    return <Loading />;
  }

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
      <TripsClient
        listings={listings}
        reservations={reservations}
        currentUser={currentUser}
      />
    </>
  );
};

export default Trips;
