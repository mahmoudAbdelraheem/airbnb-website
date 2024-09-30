// import { collection, addDoc } from "firebase/firestore";
// import { firebaseAuth, firebaseFirestore } from "../firebaseConfig";

// const listings = [
//   {
//     id: "listing_001",
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
//   {
//     id: "listing_002",
//     title: "Beachfront Villa in Alexandria",
//     description:
//       "A luxury villa with a private beach and breathtaking sea views.",
//     location: "Alexandria, Egypt",
//     category: "Villa",
//     imageSrc: [
//       "https://a0.muscache.com/im/pictures/miso/Hosting-34379374/original/346b3a1f-b9f6-411c-a499-a745dd1128f9.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-34379374/original/5318d683-f68d-4f08-8eac-80e11fe01663.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-34379374/original/ef5ae5f9-dcbd-4c70-b497-1221d07c90c2.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-34379374/original/36d7d0da-d363-493b-a957-9663b0d332c8.jpeg",
//     ],
//     price: 200,
//     roomCount: 5,
//     bathroomCount: 3,
//     guestCount: 8,
//     createdAt: new Date().toISOString(),
//     userId: "user_002",
//   },
//   {
//     id: "listing_003",
//     title: "Cozy Studio in Giza",
//     description:
//       "A comfortable studio apartment near the Pyramids, perfect for solo travelers.",
//     location: "Giza, Egypt",
//     category: "Studio",
//     imageSrc: [
//       "https://a0.muscache.com/im/pictures/miso/Hosting-48540750/original/e18cbd23-79de-417c-920c-073e0eb401ed.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-48540750/original/276c2bd3-b21e-4aad-b514-cd97f0e74150.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-48540750/original/ad68b77a-c309-4aef-87c5-d3964281cf29.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-48540750/original/1990f9db-9d46-4bc2-acc2-f006548f8d00.jpeg",
//       "https://a0.muscache.com/im/pictures/ddcbad28-6fc3-4f26-a22a-2f0cdcbe6342.jpg",
//     ],
//     price: 80,
//     roomCount: 1,
//     bathroomCount: 1,
//     guestCount: 2,
//     createdAt: new Date().toISOString(),
//     userId: "user_003",
//   },
//   {
//     id: "listing_004",
//     title: "Desert Oasis Camp in Siwa",
//     description:
//       "A unique camping experience in the desert, surrounded by stunning dunes.",
//     location: "Siwa, Egypt",
//     category: "Camp",
//     imageSrc: [
//       "https://a0.muscache.com/im/pictures/miso/Hosting-929944720214995582/original/ff7fd29a-f26b-4949-865f-dbec1b9e566b.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-929944720214995582/original/c1e926e1-52cd-4a00-9891-1f47afa28e04.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-929944720214995582/original/33141d7c-1228-42a3-878d-8ab7fe92e1df.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-929944720214995582/original/91d232b7-c985-4dad-9eae-f5e66fc106b1.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-929944720214995582/original/a39843af-976e-4f41-9d23-f3a201a75f20.jpeg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-929944720214995582/original/63dd03e0-aaf3-4db2-9c6d-5ce34996c5fa.jpeg",
//     ],
//     price: 50,
//     roomCount: 10,
//     bathroomCount: 5,
//     guestCount: 20,
//     createdAt: new Date().toISOString(),
//     userId: "user_004",
//   },
//   {
//     id: "listing_005",
//     title: "Nile View Penthouse in Luxor",
//     description:
//       "A beautiful penthouse overlooking the Nile River with luxury amenities.",
//     location: "Luxor, Egypt",
//     category: "Penthouse",
//     imageSrc: [
//       "https://a0.muscache.com/im/pictures/airflow/Hosting-43932614/original/41ef1d8b-8fa3-4d7c-ae00-64ddf2c2542f.jpg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-43932614/original/7196cabf-3f9c-4f64-90a1-6f5f3a646d50.png",
//       "https://a0.muscache.com/im/pictures/airflow/Hosting-43932614/original/b8fa304c-67e1-4051-bdaa-ef672e4ce7fb.jpg",
//       "https://a0.muscache.com/im/pictures/miso/Hosting-43932614/original/4e932a9b-7452-4781-8ec6-76c9f0e3a89e.png",
//     ],
//     price: 150,
//     roomCount: 4,
//     bathroomCount: 2,
//     guestCount: 6,
//     createdAt: new Date().toISOString(),
//     userId: "user_005",
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
//       await addDoc(listingsRef, {
//         ...listing,
//         userId: userId, // Add current user's ID to each listing
//       });
//     }

//     console.log("Listings added successfully!");
//   } catch (error) {
//     console.error("Error adding listings: ", error);
//   }
// };
