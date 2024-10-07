import { useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../data/firebaseConfig";

import LoginModal from "../components/modals/LoginModal";
import RegisterModal from "../components/modals/RegisterModal";
import Navbar from "../components/navbar/Navbar";
import ToasterProvider from "../providers/ToasterProvider";
import Container from "../components/Container";
import EmptyState from "../components/EmptyState";
import ListingsCard from "../components/listings/ListingsCard";
import { getListingFromFirebase } from "../data/listings/getListingFromFirebase";
import Loading from "../components/Loading";
import Footer from "../components/Footer";
import Map from "../components/Map";
// import getListings from "../data/listings/getListing";
// import { insertListings } from "../data/listings/insertListing";

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const fetchData = async () => {
    // const res = await getListings();
    const listingData = await getListingFromFirebase();
    console.log("listing data from firebase", listingData);

    // await insertListings(); // Insert listings into the database just for test
    setListings(listingData);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
      console.log("current user data from home", user);
      setLoading(false);
    });

    fetchData();

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <Loading />;
  }
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
        <div className="py-[120px] ">
          <Container>
            <div className="pt-24  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
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
      {/*//! test map components */}
      <Container>
        {/* <Map center={[26.8206, 30.8025]} /> get error */}
        <Map />
      </Container>
      <Footer />

      <div className="h-[100px]"></div>
    </>
  );
}

export default Home;
