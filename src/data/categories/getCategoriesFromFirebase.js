import { firebaseFirestore } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const getCategoriesFromFirebase = async () => {
  const categoriesCollectionRef = collection(firebaseFirestore, "categories");

  try {
    const querySnapshot = await getDocs(categoriesCollectionRef);

    const categories = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return categories;
  } catch (error) {
    console.error("Error fetching categories: ", error);
    return [];
  }
};

export default getCategoriesFromFirebase;
