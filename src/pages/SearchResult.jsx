import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAvailableListings } from "../data/search/getAvailableListings";
import getCurrentUser from "../data/auth/getCurrentUser";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import ListingsCard from "../components/listings/ListingsCard";
import Container from "../components/Container";
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";
import SearchModal from "../components/modals/SearchModal";
import RentModal from "../components/modals/RentModal";

function SearchResult() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const [searchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  const fetchData = async () => {
    setLoading(true);
    const userData = await getCurrentUser();
    setCurrentUser(userData);
    if (Object.keys(queryParams).length > 0) {
      const searchResult = await getAvailableListings(queryParams);
      setListings(searchResult);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
      <SearchModal />
      <RentModal />

      <Navbar user={currentUser} />
      {listings.length === 0 ? (
        <div className="flex justify-center items-center h-screen">
          <EmptyState showReset={true} />
        </div>
      ) : (
        <div className="py-[120px] ">
          <Container>
            <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 gap-8">
              {listings.map((listing) => (
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

export default SearchResult;
