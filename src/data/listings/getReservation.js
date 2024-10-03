import axios from "axios";

export default async function getReservation() {
  try {
    const res = await axios.get("http://localhost:3000/reservations");
    return res.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}
