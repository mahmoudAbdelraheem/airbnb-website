/* eslint-disable react/prop-types */

import React, { useCallback, useState } from "react";
import Container from "./Container";
import Heading from "./Heading";
import { useNavigation } from "react-router-dom";
import axios from "axios";
import ListingsCard from "./listings/ListingsCard";

export default function TripsClient({ reservations, currentUser }) {
  const navigation = useNavigation();
  const [deletingId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id) => {
      setDeletingId(id);

      // Will replace later with firebase
      // axios.delete()
    },
    [navigation]
  );

  return (
    <Container>
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
            actionLabel="Cancel reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
