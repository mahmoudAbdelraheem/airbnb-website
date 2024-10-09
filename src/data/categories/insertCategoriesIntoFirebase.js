// import { collection, addDoc } from "firebase/firestore";
// import { firebaseFirestore } from "../firebaseConfig";
// const categories = [
//   {
//     label: "Beach",
//     icon: "TbBeach",
//     description: "This property is close to the beach!",
//   },
//   {
//     label: "Windmills",
//     icon: "GiWindmill",
//     description: "This property has windmills!",
//   },
//   {
//     label: "Modern",
//     icon: "MdOutlineVilla",
//     description: "This property is modern!",
//   },
//   {
//     label: "Country",
//     icon: "TbMountain",
//     description: "This property is in the countryside!",
//   },
//   {
//     label: "Pools",
//     icon: "TbPool",
//     description: "This property has a pool!",
//   },
//   {
//     label: "Islands",
//     icon: "GiIsland",
//     description: "This property is on an island!",
//   },
//   {
//     label: "Lake",
//     icon: "GiBoatFishing",
//     description: "This property is close to a lake!",
//   },
//   {
//     label: "Skiing",
//     icon: "FaSkiing",
//     description: "This property has skiing activities!",
//   },
//   {
//     label: "Castles",
//     icon: "GiCastle",
//     description: "This property in a castle!",
//   },
//   {
//     label: "Camping",
//     icon: "GiForestCamp",
//     description: "This property has camping activities!",
//   },
//   {
//     label: "Arctic",
//     icon: "BsSnow",
//     description: "This property is close to snow!",
//   },
//   {
//     label: "Cave",
//     icon: "GiCaveEntrance",
//     description: "This property is close to a cave!",
//   },
//   {
//     label: "Desert",
//     icon: "GiCactus",
//     description: "This property is in the desert!",
//   },
//   {
//     label: "Barns",
//     icon: "GiBarn",
//     description: "This property is in a barn!",
//   },
//   {
//     label: "Lux",
//     icon: "IoDiamond",
//     description: "This property is luxurious!",
//   },
// ];

// // Function to upload the categories to Firestore
// const insertCategoriesIntoFirebase = async () => {
//   const categoriesCollectionRef = collection(firebaseFirestore, "categories");

//   try {
//     categories.forEach(async (category) => {
//       await addDoc(categoriesCollectionRef, category);
//     });
//     console.log("Categories uploaded successfully!");
//   } catch (error) {
//     console.error("Error uploading categories: ", error);
//   }
// };

// export default insertCategoriesIntoFirebase;
