import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

export const getAvailableListings = async (searchParams) => {
  const {
    locationValue,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
  } = searchParams;

  // Convert the search startDate and endDate to Firestore Timestamps
  const startTimestamp = Timestamp.fromDate(new Date(startDate));
  const endTimestamp = Timestamp.fromDate(new Date(endDate));

  console.log("Converted startTimestamp:", startTimestamp);
  console.log("Converted endTimestamp:", endTimestamp);

  try {
    // Step 1: Query reservations
    const reservationsQuery = query(
      collection(firebaseFirestore, "reservations"),
      where("startDate", "<=", endTimestamp),
      where("endDate", ">=", startTimestamp)
    );

    const reservationSnapshot = await getDocs(reservationsQuery);
    const overlappingReservations = reservationSnapshot.docs.map((doc) =>
      doc.data()
    );
    const reservedListingIds = overlappingReservations.map(
      (reservation) => reservation.listingId
    );

    console.log("Reserved listing IDs:", reservedListingIds);

    // Step 2: Query listings
    const listingsQueryConstraints = [];

    if (locationValue) {
      listingsQueryConstraints.push(
        where("locationValue", "==", locationValue)
      );
    }

    const guestCountNum = Number(guestCount);
    if (!isNaN(guestCountNum)) {
      listingsQueryConstraints.push(where("guestCount", ">=", guestCountNum));
    }

    const roomCountNum = Number(roomCount);
    if (!isNaN(roomCountNum)) {
      listingsQueryConstraints.push(where("roomCount", ">=", roomCountNum));
    }

    const bathroomCountNum = Number(bathroomCount);
    if (!isNaN(bathroomCountNum)) {
      listingsQueryConstraints.push(
        where("bathroomCount", ">=", bathroomCountNum)
      );
    }

    let listingsQuery = query(
      collection(firebaseFirestore, "listings"),
      ...listingsQueryConstraints
    );
    const listingsSnapshot = await getDocs(listingsQuery);

    console.log(
      "Listings snapshot:",
      listingsSnapshot.docs.map((doc) => doc.data())
    );

    const availableListings = listingsSnapshot.docs
      .filter((doc) => !reservedListingIds.includes(doc.id))
      .map((doc) => ({ id: doc.id, ...doc.data() }));

    console.log("Available listings:", availableListings);

    return availableListings;
  } catch (error) {
    console.error("Error fetching available listings:", error);
    throw error;
  }
};
