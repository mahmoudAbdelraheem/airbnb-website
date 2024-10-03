import { getDocs, collection, query, where } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig"; // Adjust this import to match your config

export default async function getReservationByUserId(userId) {
  try {
    if (!userId) {
      throw new Error("userId is required to fetch reservations.");
    }

    const reservationsRef = collection(firebaseFirestore, "reservations");

    // Query Firestore to get reservations where userId matches the provided id
    const queryResult = query(reservationsRef, where("userId", "==", userId));

    // Execute the query
    const querySnapshot = await getDocs(queryResult);

    // Map through documents and format the data
    const reservations = querySnapshot.docs.map((doc) => {
      const data = doc.data();

      // Convert Firestore Timestamps to formatted date strings (e.g., "2024-10-05")
      const startDate = data.startDate.toDate().toISOString().split("T")[0];
      const endDate = data.endDate.toDate().toISOString().split("T")[0];

      return {
        id: doc.id,
        ...data,
        startDate, // formatted startDate
        endDate, // formatted endDate
      };
    });

    return reservations;
  } catch (err) {
    console.log("Error fetching reservations:", err);
    return [];
  }
}
