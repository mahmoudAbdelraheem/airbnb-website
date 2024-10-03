import { addDoc, collection } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

export const createNewReservation = async ({
  totalPrice,
  dateRange, // this is an object containing (start and end data)
  listingId,
  userId,
}) => {
  try {
    const reservationsRef = collection(firebaseFirestore, "reservations");

    // Create a new document in the "reservations" collection
    await addDoc(reservationsRef, {
      totalPrice,
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      listingId,
      userId,
      createdAt: new Date().toISOString(),
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: error.toString() };
  }
};
