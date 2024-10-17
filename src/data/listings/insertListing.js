import { collection, addDoc, updateDoc } from "firebase/firestore";
import { firebaseFirestore } from "../firebaseConfig";
export const insertListing = async (listing) => {
  try {
    const listingsRef = collection(firebaseFirestore, "listings");

    const docRef = await addDoc(listingsRef, {
      ...listing,
      price: Number(listing.price),
      createdAt: new Date().toISOString(),
      approved: false,
    });

    // Update the listing with the Firestore-generated document ID
    await updateDoc(docRef, {
      id: docRef.id,
    });

    console.log(`Listing added with ID: ${docRef.id}`);
    return "Your Listing is created successfuly.";
  } catch (error) {
    console.error("something went wrong please try again!", error);
    return "something went wrong please try again!";
  }
};
