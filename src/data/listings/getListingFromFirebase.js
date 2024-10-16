import { firebaseFirestore } from "../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

export const getListingFromFirebase = async () => {
  try {
    const listingsRef = collection(firebaseFirestore, "listings");

    // Create a query to filter listings where 'approved' is true
    const approvedListingsQuery = query(
      listingsRef,
      where("approved", "==", true)
    );

    const listingsSnapshot = await getDocs(approvedListingsQuery);

    const approvedListings = listingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return approvedListings;
  } catch (error) {
    console.error("Error fetching approved listings: ", error);
    return [];
  }
};
