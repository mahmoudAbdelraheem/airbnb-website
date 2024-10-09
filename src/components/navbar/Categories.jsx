import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiWindmill,
} from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import Container from "../Container";
import CategoryBox from "./CategoryBox";
import { useLocation, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import getCategoriesFromFirebase from "../../data/categories/getCategoriesFromFirebase";

// Mapping of icon names to the actual icon components
const iconMap = {
  TbBeach: TbBeach,
  GiWindmill: GiWindmill,
  MdOutlineVilla: MdOutlineVilla,
  TbMountain: TbMountain,
  TbPool: TbPool,
  GiIsland: GiIsland,
  GiBoatFishing: GiBoatFishing,
  FaSkiing: FaSkiing,
  GiCastle: GiCastle,
  GiForestCamp: GiForestCamp,
  BsSnow: BsSnow,
  GiCaveEntrance: GiCaveEntrance,
  GiCactus: GiCactus,
  GiBarn: GiBarn,
  IoDiamond: IoDiamond,
};

export default function Categories() {
  const [params] = useSearchParams();
  const category = params.get("category");
  const location = useLocation();
  const { t } = useTranslation();
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
      icon: iconMap[category.icon], // Map the icon name to the component
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
            key={item.label}
            label={t(item.label)}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
}
