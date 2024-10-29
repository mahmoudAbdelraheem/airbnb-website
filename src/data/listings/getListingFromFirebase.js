import { firebaseFirestore } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  getDoc,
} from "firebase/firestore";

export const getListingFromFirebase = async () => {
  try {
    const listingsRef = collection(firebaseFirestore, "listings");

    // Query to get listings where 'approved' is true
    const approvedListingsQuery = query(
      listingsRef,
      where("approved", "==", true)
    );

    const listingsSnapshot = await getDocs(approvedListingsQuery);

    if (listingsSnapshot.empty) {
      console.warn("No approved listings found.");
      return [];
    }

    const approvedListings = await Promise.all(
      listingsSnapshot.docs.map(async (listingDoc) => {
        const listingData = { id: listingDoc.id, ...listingDoc.data() };

        // Fetch the category data using categoryId
        if (listingData.categoryId) {
          const categoryRef = doc(
            firebaseFirestore,
            "categories",
            listingData.categoryId
          );
          const categorySnapshot = await getDoc(categoryRef);

          // Log category existence check
          if (categorySnapshot.exists()) {
            listingData.category = {
              id: categorySnapshot.id,
              ...categorySnapshot.data(),
            };
          } else {
            console.warn(
              `Category not found for categoryId: ${listingData.categoryId}`
            );
          }
        } else {
          console.warn(`Listing with id ${listingDoc.id} has no categoryId.`);
        }

        return listingData;
      })
    );

    return approvedListings;
  } catch (error) {
    console.error("Error fetching listings with category data: ", error);
    return [];
  }
};
