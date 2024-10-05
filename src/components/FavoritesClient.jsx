import Container from "./Container";
import Heading from "./Heading";
import ListingsCard from "../components/listings/ListingsCard";
import { useTranslation } from "react-i18next";

const FavoritesClient = ({ listings, currentUser }) => {
  const { t } = useTranslation();

  return (
    <Container>
      <Heading title={t("Favorites")} subtitle={t("pFavorites")} />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => (
          <ListingsCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesClient;
