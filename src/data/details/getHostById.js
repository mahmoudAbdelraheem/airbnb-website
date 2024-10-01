import { doc, getDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";

const getHostById = async (userId) => {
  try {
    const userRef = doc(firebaseFirestore, "users", userId);
    const userDoc = await getDoc(userRef);
    console.log(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        id: userDoc.id,
        name: userData.name,
        image: userData.image,
      };
    } else {
      console.log("No such user found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user: ", error);
  }
};

export default getHostById;
