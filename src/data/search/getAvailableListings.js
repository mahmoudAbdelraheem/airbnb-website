import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
  doc, // Keep this import for fetching individual category documents
  getDoc,
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

    // Step 3: Filter available listings and fetch category data
    const availableListings = await Promise.all(
      listingsSnapshot.docs
        .filter((listingDoc) => !reservedListingIds.includes(listingDoc.id))
        .map(async (listingDoc) => {
          const listingData = { id: listingDoc.id, ...listingDoc.data() };

          // Fetch category data if categoryId exists
          if (listingData.categoryId) {
            const categoryRef = doc(
              firebaseFirestore,
              "categories",
              listingData.categoryId
            );
            const categorySnapshot = await getDoc(categoryRef);
            listingData.category = categorySnapshot.exists()
              ? categorySnapshot.data()
              : null;
          } else {
            listingData.category = null;
          }

          return listingData;
        })
    );

    return availableListings;
  } catch (error) {
    console.error("Error fetching available listings:", error);
    throw error;
  }
};
