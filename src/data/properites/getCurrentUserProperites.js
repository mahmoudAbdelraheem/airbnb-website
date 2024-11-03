import {
  getDocs,
  collection,
  query,
  where,
  getDoc,
  doc,
} from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

const getCurrentUserProperties = async (userId) => {
  try {
    if (!userId) {
      throw new Error("userId is required to fetch properties.");
    }

    const listingsRef = collection(firebaseFirestore, "listings");
    const queryResult = query(listingsRef, where("userId", "==", userId));

    // Execute the query to get properties
    const querySnapshot = await getDocs(queryResult);

    // Check if any properties were found
    if (querySnapshot.empty) {
      return [];
    }

    // Extract data from each document in the snapshot
    const properties = await Promise.all(
      querySnapshot.docs.map(async (docSnapshot) => {
        const propertyData = docSnapshot.data();

        // Fetch category data based on categoryId in property
        if (propertyData.categoryId) {
          // Get reference to the category document
          const categoryRef = doc(
            firebaseFirestore,
            "categories",
            propertyData.categoryId
          );
          const categorySnapshot = await getDoc(categoryRef);

          // Check if category exists
          if (categorySnapshot.exists()) {
            propertyData.category = categorySnapshot.data();
          } else {
            propertyData.category = null;
          }
        } else {
          propertyData.category = null;
        }

        return propertyData;
      })
    );

    return properties;
  } catch (err) {
    console.log("Error fetching properties or categories:", err);
    return [];
  }
};

export default getCurrentUserProperties;
