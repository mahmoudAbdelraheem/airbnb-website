import { doc, deleteDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

export async function deleteListingById(id) {
  try {
    // Get the document reference for the listing
    const listingRef = doc(firebaseFirestore, "listings", id);

    // Delete the listing document
    await deleteDoc(listingRef);
  } catch (error) {
    console.error("Error deleting listing:", error);
    throw new Error("Failed to delete the listing");
  }
}
