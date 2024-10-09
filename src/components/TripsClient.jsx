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
import useReviewModal from "../hooks/useReviewModal";

export default function TripsClient({ reservations, currentUser }) {
  const { t } = useTranslation();
  const reviewModal = useReviewModal(); // Accessing the review modal state
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    async (id) => {
      try {
        setDeletingId(id);
        await deleteReservationById(id);
        toast.success("Reservation cancelled successfully");
        setDeletingId("");
        navigate(0); // Refresh the page
      } catch (error) {
        console.error("Error cancelling reservation:", error);
        toast.error("Failed to cancel the reservation");
        setDeletingId(null);
      }
    },
    [navigate]
  );

  const onReview = useCallback(
    async (id) => {
      try {
        setDeletingId(id); // This can be used to disable the button if needed
      } catch (error) {
        console.error("Error reviewing reservation:", error);
        toast.error("Failed to review the reservation");
        setDeletingId(null);
      }
    },
    [reviewModal] // Added reviewModal to dependencies
  );

  return (
    <Container>
      <div className="pt-24" />
      <ToasterProvider />
      <Heading title={t("trips")} subtitle={t("whereTo")} />
      <div
        className="
        my-[70px]
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
            onAction={onCancel} // Action for cancel
            disabled={deletingId === reservation.id} // Disable button when deleting
            actionLabel={t("Cancelreservation")}
            currentUser={currentUser}
            onSecondaryAction={onReview} // This opens the review modal
            secondaryActionLabel={t("Reviewreservation")}
          />
        ))}
      </div>
    </Container>
  );
}
