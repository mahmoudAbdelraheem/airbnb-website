import { useNavigate } from "react-router-dom";
import Container from "../Container";
import Heading from "../Heading";
import { useCallback, useState } from "react";
import { deleteReservationById } from "../../data/listings/deleteReservationById";
import toast from "react-hot-toast";
import ListingsCard from "../listings/ListingsCard";
import ToasterProvider from "../../providers/ToasterProvider";

/* eslint-disable react/prop-types */
function ReservationsClient({ reservations, currentUser }) {
  const navigator = useNavigate();
  const [deletingId, setDeletingId] = useState(null);
  const onCancel = useCallback(
    async (id) => {
      try {
        setDeletingId(id);
        await deleteReservationById(id);
        toast.success("Reservation cancelled successfully");
        setDeletingId(null);
        console.log("Reservation cancelled successfully");
        navigator(0);
      } catch (error) {
        console.error("Error cancelling reservation:", error);
        toast.error("Failed to cancel the reservation");
        setDeletingId(null);
      }
    },
    [navigator]
  );

  return (
    <Container>
      <div className="pt-24" />
      <ToasterProvider />
      <Heading title="Reservations" subtitle="Bookings on your properties" />

      <div
        className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8   
        "
      >
        {reservations.map((reservation) => (
          <ListingsCard
            currentUser={currentUser}
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel Guest Reservation"
            actionId={reservation.id}
          />
        ))}
      </div>
    </Container>
  );
}

export default ReservationsClient;
