/* eslint-disable react/prop-types */

import { useCallback, useState } from "react";
import Container from "./Container";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import ListingsCard from "./listings/ListingsCard";
import { deleteReservationById } from "../data/listings/deleteReservationById";
import { toast } from "react-hot-toast";
import ToasterProvider from "../providers/ToasterProvider";
import { useTranslation } from "react-i18next";

export default function TripsClient({ reservations, currentUser }) {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id) => {
      try {
        setDeletingId(id);
        await deleteReservationById(id);
        toast.success("Reservation cancelled successfully");
        setDeletingId("");
        console.log("Reservation cancelled successfully");
        navigate(0);
      } catch (error) {
        console.error("Error cancelling reservation:", error);
        toast.error("Failed to cancel the reservation");

        setDeletingId(null);
      }
    },
    [navigate] // Change to [navigate]
  );

  return (
    <Container>
      <div className="pt-24" />

      <ToasterProvider />
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

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
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deletingId === reservation.id}
            actionLabel={t("Cancelreservation")}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
