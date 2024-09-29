import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../data/firebaseConfig";

import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import Navbar from "../components/navbar/Navbar";
import ToasterProvider from "../providers/ToasterProvider";
import Logo from "../components/navbar/Logo";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import getListings from "../data/listings/getListing";
import ListingsCard from "../components/listings/ListingsCard";

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const fetchData = async () => {
    const res = await getListings();
    setListings(res.data);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      // Set the current user when auth state changes
      setCurrentUser(user);
      console.log("current user data from home", user);
      setLoading(false);
    });

    fetchData();

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        className="
      h-screen
      w-screen
      flex 
      items-center 
      justify-center
      "
      >
        <Logo />
      </div>
    );
  }
  console.log(listings);
  return (
    <>
      <ToasterProvider />
      <RegisterModal />
      <LoginModal />
      <Navbar user={currentUser} />
      {listings.length == 0 ? (
        <div className="flex justify-center items-center h-screen">
          <EmptyState showReset={true} />
        </div>
      ) : (
        <div className="py-[100px] ">
          <Container>
            <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {listings &&
                listings.map((listing) => (
                  <ListingsCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                  />
                ))}
            </div>
          </Container>
        </div>
      )}
    </>
  );
}

export default Home;
