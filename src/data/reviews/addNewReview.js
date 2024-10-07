import { collection, addDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

export const addNewReview = async (reviewData) => {
  try {
    // First, add the review to Firestore
    await addDoc(collection(firebaseFirestore, "reviews"), {
      ...reviewData,
    });

    return { success: true, message: "Review added successfully" };
  } catch (error) {
    console.error("Error adding review: ", error);
    throw error;
  }
};
