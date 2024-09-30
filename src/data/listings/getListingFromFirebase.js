import { firebaseFirestore } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export const getListingFromFirebase = async () => {
  try {
    const listingsRef = collection(firebaseFirestore, "listings");
    const listingsSnapshot = await getDocs(listingsRef);
    const listingsList = listingsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return listingsList;
  } catch (error) {
    console.error("Error fetching listings: ", error);
    return [];
  }
};
