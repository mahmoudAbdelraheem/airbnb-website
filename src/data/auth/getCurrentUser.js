import { firebaseAuth, firebaseFirestore } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
const getCurrentUser = async () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(
      firebaseAuth,
      async (user) => {
        if (user) {
          try {
            // Reference to the Firestore user's document
            const userDocRef = doc(firebaseFirestore, "users", user.uid);
            const userDocSnapshot = await getDoc(userDocRef);

            // Check if user data exists in Firestore
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              // Merge Firestore data (favorites) with Auth user data
              const mergedUserData = {
                ...user,
                // Add favorites list or empty array if not found
                favoritesIds: userData.favoritesIds || [],
              };
              resolve(mergedUserData);
            } else {
              // No Firestore user data found, return just auth user data
              resolve(user);
            }
          } catch (error) {
            console.error("Error fetching Firestore data: ", error);
            reject(error);
          }
        } else {
          resolve(null);
        }
      },
      reject
    );
  });
};

export default getCurrentUser;
