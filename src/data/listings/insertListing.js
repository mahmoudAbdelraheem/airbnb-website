// import { collection, addDoc, updateDoc } from "firebase/firestore";
// import { firebaseAuth, firebaseFirestore } from "../firebaseConfig";

// const listings = [
//   {
//     title: "Luxury Apartment in Cairo",
//     description:
//       "A spacious and modern apartment in the heart of Cairo with stunning views of the Nile.",
//     location: "Cairo, Egypt",
//     category: "Apartment",
//     imageSrc: [
//       "https://a0.muscache.com/im/pictures/miso/Hosting-52128141/original/2f885a34-191b-4b95-9797-799cd514d721.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-52128141/original/4ca3d85f-3692-4f75-8c67-7d9839dc44f3.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-52128141/original/6ff873c9-7dc7-4137-8456-b1c5a776a669.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-52128141/original/9e858bde-c259-474d-9944-2b95b57c3d85.jpeg",
//       "https://a0.muscache.com/im/pictures/9638bc07-c6ba-425f-b4c6-540af08c807c.jpg",
//     ],
//     price: 120,
//     roomCount: 3,
//     bathroomCount: 2,
//     guestCount: 5,
//     createdAt: new Date().toISOString(),
//     userId: "user_001",
//   },
//   // Other listings...
// ];

// export const insertListings = async () => {
//   try {
//     const listingsRef = collection(firebaseFirestore, "listings");
//     const currentUser = firebaseAuth.currentUser;

//     if (!currentUser) {
//       console.error("No user is logged in.");
//       return;
//     }

//     const userId = currentUser.uid;

//     for (const listing of listings) {
//       // Add the listing without an ID (let Firestore generate it)
//       const docRef = await addDoc(listingsRef, {
//         ...listing,
//         userId: userId, // Add current user's ID to each listing
//       });

//       // Update the listing with the Firestore-generated document ID
//       await updateDoc(docRef, {
//         id: docRef.id, // Set the 'id' field to the Firestore document ID
//       });

//       console.log(`Listing added with ID: ${docRef.id}`);
//     }

//     console.log("Listings added successfully!");
//   } catch (error) {
//     console.error("Error adding listings: ", error);
//   }
// };
