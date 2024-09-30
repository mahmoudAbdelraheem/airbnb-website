import axios from "axios";

export default async function getListings() {
  try {
    const listings = await axios.get("http://localhost:3000/homes");
    return listings;
  } catch (error) {
    throw new Error(error);
  }
}
