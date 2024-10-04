import { getDocs, collection, query, where } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

export default async function getReservationByListingId(listingId) {
  try {
    if (!listingId) {
      throw new Error("listingId is required to fetch reservations.");
    }

    const reservationsRef = collection(firebaseFirestore, "reservations");

    const queryResult = query(
      reservationsRef,
      where("listingId", "==", listingId)
    );

    // Execute the query
    const querySnapshot = await getDocs(queryResult);

    // Map through documents and format the data
    const reservations = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      // en-CA format is "YYYY-MM-DD"
      const startDate = data.startDate.toDate().toLocaleDateString("en-CA");
      const endDate = data.endDate.toDate().toLocaleDateString("en-CA");

      return {
        id: doc.id,
        ...data,
        startDate,
        endDate,
      };
    });

    return reservations;
  } catch (err) {
    console.log("Error fetching reservations:", err);
    return [];
  }
}
