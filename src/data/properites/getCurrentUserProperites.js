import { getDocs, collection, query, where } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

const getCurrentUserProperties = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId is required to fetch properties.");
    }

    const listingsRef = collection(firebaseFirestore, "listings");

    const queryResult = query(listingsRef, where("userId", "==", userId));

    // Execute the query
    const querySnapshot = await getDocs(queryResult);

    // Extract data from each document in the snapshot
    const properties = querySnapshot.docs.map((doc) => doc.data());

    return properties;
  } catch (err) {
    console.log("Error fetching properties:", err);
    return [];
  }
};

export default getCurrentUserProperties;
