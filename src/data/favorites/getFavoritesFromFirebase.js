import { doc, getDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig"; // Ensure this points to your Firestore instance
import getCurrentUser from "../auth/getCurrentUser";

export default async function getFavoriteListingsFromFirebase() {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      // Step 1: Get the user's document reference
      const userDocRef = doc(firebaseFirestore, "users", currentUser.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        // Step 2: Extract the user's favorites IDs
        const userData = userDoc.data();
        const favoritesIds = userData.favoritesIds || [];

        // Step 3: Fetch all favorite listings
        if (favoritesIds.length > 0) {
          const favoriteListings = await Promise.all(
            favoritesIds.map(async (listingId) => {
              const listingDocRef = doc(
                firebaseFirestore,
                "listings",
                listingId
              );
              const listingDoc = await getDoc(listingDocRef);
              return listingDoc.exists() ? listingDoc.data() : null; // Return the listing data if it exists
            })
          );

          // Step 4: Filter out any null values (in case a listing was deleted or not found)
          return favoriteListings.filter((listing) => listing !== null);
        } else {
          // Return an empty array if there are no favorites
          return [];
        }
      } else {
        console.error("User document does not exist");
        return [];
      }
    } else {
      console.error("User not logged in");
      return [];
    }
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
}
