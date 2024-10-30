import Container from "../Container";
import CategoryBox from "./CategoryBox";
import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getCategoriesFromFirebase from "../../data/categories/getCategoriesFromFirebase";

export default function Categories() {
  const [params] = useSearchParams();
  const category = params.get("category");
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const isMainPage = location.pathname === "/";

  // Fetch categories from Firebase and map icon names to components
  const fetchCategories = async () => {
    setLoading(true);
    const categories = await getCategoriesFromFirebase();

    // Map the icon string to the actual icon component
    const updatedCategories = categories.map((category) => ({
      ...category,
    }));

    setCategories(updatedCategories);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (!isMainPage) {
    return null;
  }

  if (loading) {
    return <></>;
  }

  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((item) => (
          <CategoryBox
            id={item.id}
            key={item.label}
            label={item.label}
            labelAr={item.labelAr}
            selected={category === item.label}
            imageUrl={item.image}
          />
        ))}
      </div>
    </Container>
  );
}
