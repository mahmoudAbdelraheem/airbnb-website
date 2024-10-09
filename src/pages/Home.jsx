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

import SearchModal from "../components/modals/SearchModal";
import Footer from "../components/Footer";
import { useLocation, useSearchParams } from "react-router-dom";
import { getAvailableListings } from "../data/search/getAvailableListings";

function Home() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [searchParams] = useSearchParams();
  // The below so we can read the URL in the homepage
  const [filteredItems, setFilteredItems] = useState([]);
  const queryParams = Object.fromEntries([...searchParams]);
  const location = useLocation();

  const fetchData = async () => {
    // Fetch search results if there are query parameters
    if (Object.keys(queryParams).length > 0) {
      const searchResult = await getAvailableListings(queryParams);
      console.log("listing data from search", searchResult);
      setListings(searchResult);
    } else {
      const listingData = await getListingFromFirebase();
      console.log("listing data from firebase", listingData);
      setListings(listingData);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    if (!loading) {
      fetchData();
    }

    return () => unsubscribe();
  }, [loading]); // Add loading to dependencies

  useEffect(() => {
    if (queryParams.category) {
      const filtered = listings.filter(
        (listing) => listing.category === queryParams.category
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(listings);
    }
  }, [queryParams, listings]);

  if (loading) {
    return (
      <>
        <Navbar user={currentUser} />
        <Loading />
      </>
    );
  }

  return (
    <>
      <ToasterProvider />
      <SearchModal />
      <RegisterModal />
      <LoginModal />
      <Navbar user={currentUser} />
      {listings.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <EmptyState showReset={true} />
        </div>
      ) : (
        <div className="py-[120px] ">
          <Container>
            <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
              {filteredItems.map((listing) => (
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
      <Footer />
    </>
  );
}

export default Home;
