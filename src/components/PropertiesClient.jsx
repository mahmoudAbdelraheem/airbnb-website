/* eslint-disable react/prop-types */

import { useCallback, useState } from "react";
import Container from "./Container";
import Heading from "./Heading";
import { useNavigate } from "react-router-dom";
import ListingsCard from "./listings/ListingsCard";
import { toast } from "react-hot-toast";
import ToasterProvider from "../providers/ToasterProvider";
import { deleteListingById } from "../data/properites/deleteListingById";

export default function PropertiesClient({ listings, currentUser }) {
  const navigate = useNavigate();
  const [deletingId, setDeletingId] = useState("");

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
          <ListingsCard
            key={listing}
            data={listing}
            actionId={listing.id}
            onAction={onCancel}
            disabled={deletingId === listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}