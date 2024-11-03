import { addDoc, collection, Timestamp } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

export const createNewReservation = async ({
  totalPrice,
  dateRange, // this is an object containing start and end dates
  listingId,
  userId,
  authorId,
}) => {
  try {
    const reservationsRef = collection(firebaseFirestore, "reservations");

    // Create a new document in the "reservations" collection
    await addDoc(reservationsRef, {
      totalPrice,
      startDate: Timestamp.fromDate(new Date(dateRange.startDate)), // Ensure startDate is a Timestamp
      endDate: Timestamp.fromDate(new Date(dateRange.endDate)), // Ensure endDate is a Timestamp
      listingId,
      userId,
      authorId,
      createdAt: Timestamp.fromDate(new Date()), // Store as Firestore Timestamp
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: error.toString() };
  }
};
