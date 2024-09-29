// import getCurrentUser from "../auth/getCurrentUser";
import axios from "axios";

export async function Post(listingId, currentUser) {
  console.log(currentUser);
  const res = await axios.get(`http://localhost:3000/users/${currentUser.uid}`);
  const current = res.data;

  let favoriteId = [...(current.favoritesIds || [])];
  favoriteId.push(listingId);
  // console.log(favoriteId);
  const user = await axios.put(
    `http://localhost:3000/users/${currentUser.uid}`,
    { favoritesIds: favoriteId }
  );
  return user;
}
export async function Delete(listingId, currentUser) {
  // const currentUser = await getCurrentUser();
  const res = await axios.get(`http://localhost:3000/users/${currentUser.uid}`);
  const current = res.data;

  let favoriteId = [...(current.favoritesIds || [])];
  favoriteId = favoriteId.filter((id) => id !== listingId);

  const user = await axios.put(
    `http://localhost:3000/users/${currentUser.uid}`,
    { favoritesIds: favoriteId }
  );
  return user;
}
