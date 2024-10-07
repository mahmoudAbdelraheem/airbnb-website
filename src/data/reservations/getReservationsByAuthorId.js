import {
  getDocs,
  collection,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

export default async function getReservationByAuthorId(authorId) {
  try {
    if (!authorId) {
      throw new Error("authorId is required to fetch reservations.");
    }

    const reservationsRef = collection(firebaseFirestore, "reservations");

    // Query Firestore to get reservations where userId matches the provided id
    const queryResult = query(
      reservationsRef,
      where("authorId", "==", authorId)
    );

    // Execute the query
    const querySnapshot = await getDocs(queryResult);

    // Map through documents and format the data, and also fetch listing details
    const reservationsWithListings = await Promise.all(
      querySnapshot.docs.map(async (docSnapshot) => {
        const reservationData = docSnapshot.data();
        const reserverId = reservationData.userId;
        const reserverRef = doc(firebaseFirestore, "users", reserverId);
        const reserverSnapshot = await getDoc(reserverRef);
        const reserverData = reserverSnapshot.exists();
        // Convert Firestore Timestamps to formatted date strings (e.g., "2024-10-05")
        const startDate = reservationData.startDate
          .toDate()
          .toISOString()
          .split("T")[0];
        const endDate = reservationData.endDate
          .toDate()
          .toISOString()
          .split("T")[0];

        // Fetch the listing data based on listingId
        const listingRef = doc(
          firebaseFirestore,
          "listings",
          reservationData.listingId
        );
        const listingSnapshot = await getDoc(listingRef);
        const listingData = listingSnapshot.exists()
          ? listingSnapshot.data()
          : null;

        return {
          id: docSnapshot.id,
          ...reservationData,
          startDate, // formatted startDate
          endDate, // formatted endDate
          listing: listingData, // include listing data
          reserver: reserverData ? reserverSnapshot.data() : null,
        };
      })
    );

    return reservationsWithListings;
  } catch (err) {
    console.log("Error fetching reservations and listings:", err);
    return [];
  }
}
