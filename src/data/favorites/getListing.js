// Import Firebase Firestore
import { doc, getDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

// Function to get a single listing by its ID from Firestore
export async function getListingById(id) {
  try {
    const listingRef = doc(firebaseFirestore, "listings", id); // Reference to a single document in the 'homes' collection
    const listingSnap = await getDoc(listingRef);
    if (listingSnap.exists()) {
      return { id: listingSnap.id, ...listingSnap.data() }; // Return the document data
    } else {
      throw new Error("Listing not found");
    }
  } catch (error) {
    throw new Error("Error fetching listing: " + error.message);
  }
}
