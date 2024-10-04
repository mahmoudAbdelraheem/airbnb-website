import { doc, deleteDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

export async function deleteReservationById(id) {
  try {
    // Get the document reference for the reservation
    const reservationRef = doc(firebaseFirestore, "reservations", id);

    // Delete the reservation document
    await deleteDoc(reservationRef);
  } catch (error) {
    console.error("Error deleting reservation:", error);
    throw new Error("Failed to delete the reservation");
  }
}
