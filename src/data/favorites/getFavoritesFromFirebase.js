import { doc, getDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";
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

        // Step 3: Fetch all favorite listings along with their categories
        if (favoritesIds.length > 0) {
          const favoriteListings = await Promise.all(
            favoritesIds.map(async (listingId) => {
              const listingDocRef = doc(
                firebaseFirestore,
                "listings",
                listingId
              );
              const listingDoc = await getDoc(listingDocRef);

              if (listingDoc.exists()) {
                const listingData = listingDoc.data();

                // Fetch the category data based on categoryId
                if (listingData.categoryId) {
                  const categoryRef = doc(
                    firebaseFirestore,
                    "categories",
                    listingData.categoryId
                  );
                  const categoryDoc = await getDoc(categoryRef);

                  if (categoryDoc.exists()) {
                    listingData.category = categoryDoc.data();
                  } else {
                    console.log(
                      `No category found for categoryId: ${listingData.categoryId}`
                    );
                    listingData.category = null;
                  }
                } else {
                  console.log("No categoryId found in listing.");
                  listingData.category = null;
                }

                return listingData;
              } else {
                return null; // Handle case where listing doesn't exist
              }
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
