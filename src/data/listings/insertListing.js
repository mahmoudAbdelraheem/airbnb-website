import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
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
export const updateListing = async (listingId, listing) => {
  try {
    // Reference to the specific document using its ID
    const listingRef = doc(firebaseFirestore, "listings", listingId);

    // Check if the document exists before updating
    const docSnap = await getDoc(listingRef);
    if (!docSnap.exists()) {
      throw new Error("Listing not found");
    }

    // Prepare the update data
    const updateData = {
      ...listing,
      approved: false,
      price: Number(listing.price),
      updatedAt: new Date().toISOString(),
    };
    // Update the document
    await updateDoc(listingRef, updateData);

    console.log(`Listing updated successfully: ${listingId}`);
    return "Your Listing has been updated successfully.";
  } catch (error) {
    console.error("Error updating listing:", error);
    if (error.message === "Listing not found") {
      return "Listing not found. Please check the listing ID.";
    }
    return "Something went wrong, please try again!";
  }
};
