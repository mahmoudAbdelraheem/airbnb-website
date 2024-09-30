import axios from "axios";
import getCurrentUser from "../auth/getCurrentUser";

export default async function getFavirteListings() {
  try {
    const currentUser = await getCurrentUser();
    if (currentUser) {
      // Fetch favorite listings for the current user
      const res = await axios.get(
        `http://localhost:3000/users/${currentUser.uid}`
      );
      const current = res.data;
      let result = [];
      const fetchFavorites = async () => {
        // Use Promise.all to wait for all async requests
        result = await Promise.all(
          current.favoritesIds.map(async (elem) => {
            const res = await axios.get(`http://localhost:3000/homes/${elem}`);
            return res.data; // Push the data directly into the array
          })
        );

        // Now result contains all the fetched products
        // console.log(result);
        return result;
      };

      return fetchFavorites();
    } else {
      console.error("User not logged in");
    }
  } catch (error) {
    console.error("Error fetching user", error);
  }
}
