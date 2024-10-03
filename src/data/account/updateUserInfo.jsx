import { firebaseFirestore } from "../firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const updateUserInfo = async (userID, updatedData) => {
  try {
    const userDocRef = doc(firebaseFirestore, "users", userID);

    await setDoc(userDocRef, updatedData, { merge: true });
  } catch (error) {
    console.error("Error updating user data:", error);
    throw new Error("Failed to update user data");
  }
};

export default updateUserInfo;
