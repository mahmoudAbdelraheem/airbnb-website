/* eslint-disable react/prop-types */

import { useCallback, useState } from "react";
import Container from "./Container";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import ListingsCard from "./listings/ListingsCard";
import { toast } from "react-hot-toast";
import ToasterProvider from "../providers/ToasterProvider";
import { deleteListingById } from "../data/properites/deleteListingById";
import useRentModal from "../hooks/useRentModal";

export default function PropertiesClient({ listings, currentUser }) {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState("");
  const rentModal = useRentModal();
  const onCancel = useCallback(
    async (id) => {
      try {
        setDeletingId(id);
        await deleteListingById(id);
        toast.success("Listing deteted successfully");
        setDeletingId("");
        console.log("Listing deteted successfully");
        navigate(0);
      } catch (error) {
        console.error("Error deleteing listing:", error);
        toast.error("Failed to delete the listing");

        setDeletingId(null);
      }
    },
    [navigate] // Change to [navigate]
  );
  const onEdit = useCallback(
    (listing) => {
      console.log("******************************");
      console.log(listing);
      rentModal.onOpen(listing);
    },
    [rentModal]
  );

  return (
    <Container>
      <div className="pt-24" />

      <ToasterProvider />
      <Heading title="Properties" subtitle="List of your properties" />

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
        {listings.map((listing) => (
          <div
            className={
              !listing.approved
                ? "border-2 rounded-xl border-red-600 p-1"
                : "border-2 rounded-xl border-green-400 p-1"
            }
            key={listing.id}
          >
            <ListingsCard
              key={listing}
              data={listing}
              actionId={listing.id}
              onAction={onCancel}
              disabled={deletingId === listing.id}
              actionLabel="Delete property"
              secondaryActionLabel="Edit property"
              onSecondaryAction={() => onEdit(listing)}
              currentUser={currentUser}
            />
          </div>
        ))}
      </div>
    </Container>
  );
}
