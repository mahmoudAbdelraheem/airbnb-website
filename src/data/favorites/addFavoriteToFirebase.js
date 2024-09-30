import { firebaseFirestore } from "../firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function Post(listingId, currentUser) {
  try {
    const userRef = doc(firebaseFirestore, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const current = userDoc.data();
      let favoriteIds = [...(current.favoritesIds || [])];
      favoriteIds.push(listingId);

      await updateDoc(userRef, { favoritesIds: favoriteIds });
      return { success: true, message: "Favorite added successfully." };
    } else {
      return { success: false, message: "User not found." };
    }
  } catch (error) {
    console.error("Error adding favorite:", error);
    return { success: false, message: error.message };
  }
}

export async function Delete(listingId, currentUser) {
  try {
    const userRef = doc(firebaseFirestore, "users", currentUser.uid);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const current = userDoc.data();
      let favoriteIds = [...(current.favoritesIds || [])];
      favoriteIds = favoriteIds.filter((id) => id !== listingId);

      await updateDoc(userRef, { favoritesIds: favoriteIds });
      return { success: true, message: "Favorite removed successfully." };
    } else {
      return { success: false, message: "User not found." };
    }
  } catch (error) {
    console.error("Error removing favorite:", error);
    return { success: false, message: error.message };
  }
}
