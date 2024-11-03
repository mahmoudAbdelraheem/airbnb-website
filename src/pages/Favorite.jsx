import { useEffect, useState } from "react";
// import getFavirteListings from "../data/favorites/getFavorite";
import getFavoriteListingsFromFirebase from "../data/favorites/getFavoritesFromFirebase";
import EmptyState from "../components/EmptyState";
import FavoritesClient from "../components/FavoritesClient";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../data/firebaseConfig";
import ToasterProvider from "../providers/ToasterProvider";
import RegisterModal from "../components/modals/RegisterModal";
import LoginModal from "../components/modals/LoginModal";
import SimpleNavbar from "../components/navbar/SimpleNavbar";
import Footer from "../components/Footer";
import RentModal from "../components/modals/RentModal";

const Favorite = () => {
  const [favList, setFavList] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    const fav = await getFavoriteListingsFromFirebase();
    console.log("favorites data list", fav);
    setFavList(fav);
  };
  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
    });
    fetchFavorites();
    setLoading(false);
    return () => unsubscribe();
  }, []);
  return (
    <>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <RentModal />
      <SimpleNavbar user={currentUser} />

      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <EmptyState
            title="Loading..."
            subtitle="Please wait while we load your favorite listings."
          />
        </div>
      ) : null}

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
      <Footer />
    </>
  );
};

export default Favorite;
