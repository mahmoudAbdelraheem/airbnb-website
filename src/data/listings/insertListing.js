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
//     mapLocation: { lat: 30.0444, lng: 31.2357 }, // Cairo's latitude and longitude
//   },
//   {
//     title: "Cozy Apartment in Alexandria",
//     description:
//       "A cozy and well-furnished apartment near the sea in Alexandria.",
//     location: "Alexandria, Egypt",
//     category: "Apartment",
//     imageSrc: [
//       "https://example.com/alexandria1.jpg",
//       "https://example.com/alexandria2.jpg",
//     ],
//     price: 100,
//     roomCount: 2,
//     bathroomCount: 1,
//     guestCount: 4,
//     createdAt: new Date().toISOString(),
//     userId: "user_002",
//     mapLocation: { lat: 31.2156, lng: 29.9553 }, // Alexandria's latitude and longitude
//   },
//   {
//     title: "Villa in Giza",
//     description: "A beautiful villa in Giza near the pyramids.",
//     location: "Giza, Egypt",
//     category: "Villa",
//     imageSrc: [
//       "https://example.com/giza1.jpg",
//       "https://example.com/giza2.jpg",
//     ],
//     price: 300,
//     roomCount: 5,
//     bathroomCount: 3,
//     guestCount: 10,
//     createdAt: new Date().toISOString(),
//     userId: "user_003",
//     mapLocation: { lat: 30.0131, lng: 31.2089 }, // Giza's latitude and longitude
//   },
//   {
//     title: "Desert Lodge in Siwa",
//     description: "A peaceful desert lodge in Siwa.",
//     location: "Siwa, Egypt",
//     category: "Lodge",
//     imageSrc: [
//       "https://example.com/siwa1.jpg",
//       "https://example.com/siwa2.jpg",
//     ],
//     price: 150,
//     roomCount: 4,
//     bathroomCount: 2,
//     guestCount: 6,
//     createdAt: new Date().toISOString(),
//     userId: "user_004",
//     mapLocation: { lat: 29.2045, lng: 25.5196 }, // Siwa's latitude and longitude
//   },
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
//         mapLocation: listing.mapLocation, // Include the map location
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
