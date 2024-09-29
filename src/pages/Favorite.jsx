import { useEffect, useState } from "react";
import getFavirteListings from "../data/listings/getFavorite";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "../components/FavoritesClient";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../data/firebaseConfig";
import ToasterProvider from "../providers/ToasterProvider";
import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import Navbar from "../components/navbar/Navbar";

const Favorite = () => {
  const [favList, setFavList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const fetchFav = async () => {
    const fav = await getFavirteListings();
    console.log(fav);
    setFavList(fav);
    // console.log(fav);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      // Set the current user when auth state changes
      setCurrentUser(user);
      console.log("current user data from home", user);
      setLoading(false);
    });
    fetchFav();
    return () => unsubscribe();
  }, []);
  return (
    <>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Navbar user={currentUser} />
      {favList.length == 0 ? (
        <div className="flex justify-center items-center h-screen">
          <EmptyState
            title="No Favorites Found"
            subtitle="Looks like you have no favorite listings."
          />
        </div>
      ) : (
        <div className="py-[100px] ">
          <FavoritesClient listings={favList} currentUser={currentUser} />
        </div>
      )}
    </>
  );
};

export default Favorite;
