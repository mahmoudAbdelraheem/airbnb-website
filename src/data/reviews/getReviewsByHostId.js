import { collection, query, where, getDocs } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

export const getReviewsByHostId = async (hostId) => {
  try {
    const q = query(
      collection(firebaseFirestore, "reviews"),
      where("hostId", "==", hostId)
    );

    const querySnapshot = await getDocs(q);

    const reviews = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      let createdAt = data.createdAt;

      if (createdAt && typeof createdAt === "string") {
        createdAt = new Date(createdAt).toISOString().split("T")[0];
      } else {
        createdAt = "Unknown";
      }

      return {
        id: doc.id,
        ...data,
        createdAt,
      };
    });

    return { success: true, reviews };
  } catch (error) {
    console.error("Error getting reviews by hostId: ", error);
    throw error;
  }
};
