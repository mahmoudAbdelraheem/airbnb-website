import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import { useTranslation } from "react-i18next";
import useRentModal from "../../hooks/useRentModal";
import Heading from "../Heading";
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
import getCategoriesFromFirebase from "../../data/categories/getCategoriesFromFirebase";
import CategoryInput from "../inputs/CategoryInput";
import { useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Map from "../Map";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import getCurrentUser from "../../data/auth/getCurrentUser";
// import uploadImagesToStorageAndGetUrls from "../../data/listings/uploadImagesToStorageAndGetUrls";
// import { m } from "framer-motion";

export default function RentModal() {
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
  const { t } = useTranslation();
  const rentModal = useRentModal();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const data = await getCurrentUser();
      setCurrentUser(data);
    };
    fetchCurrentUser();
  }, []);

  const STEPS = {
    CATEGORY: 0,
    LOCATION: 1,
    INFO: 2,
    IMAGES: 3,
    DESCRIPTION: 4,
    PRICE: 5,
  };
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      imagesSrc: [],
      price: 1,
      title: "",
      description: "",
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imagesSrc = watch("imagesSrc");
  const setCustomValue = (id, value) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

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

  // const handleUpload = async () => {
  //   setLoading(true);
  //   const imageFirebaseUrl = await uploadImagesToStorageAndGetUrls(
  //     images,
  //     currentUser.uid
  //   );

  //   console.log("image Firebase Urls after upload", imageFirebaseUrl);

  //   setLoading(false);
  // };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <>
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a category"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[50vh] overflow-y-auto">
          {categories.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={category === item.label}
                label={item.label}
                icon={item.icon}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title="Where is your place located?"
            subtitle="Help guests find you!"
          />
          <CountrySelect
            value={location}
            onChange={(value) => setCustomValue("location", value)}
          />
          <Map center={location?.latlng} />
        </div>
      </>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title={"Share some basics about your place"}
            subtitle={"What amenities do you have?"}
          />
          <Counter
            title={"Guests"}
            subtitle={"How many guests do you allow?"}
            value={guestCount}
            onChange={(value) => setCustomValue("guestCount", value)}
          />
          <hr />
          <Counter
            title={"Rooms"}
            subtitle={"How many rooms do you have?"}
            value={roomCount}
            onChange={(value) => setCustomValue("roomCount", value)}
          />
          <hr />
          <Counter
            title={"Bathrooms"}
            subtitle={"How many bathrooms do you have?"}
            value={bathroomCount}
            onChange={(value) => setCustomValue("bathroomCount", value)}
          />
        </div>
      </>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <>
        <div className="flex flex-col gap-8">
          <Heading
            title={"Add a photo of your place"}
            subtitle={"Show guests what your place looks like!"}
          />
          <ImageUpload
            images={images}
            setImages={setImages}
            uid={currentUser.uid}
            disabled={loading}
            onChange={(value) => {
              console.log("onchnage images value is =", value);
              return setCustomValue("imagesSrc", value);
            }}
          />
        </div>
      </>
    );
  }

  return (
    <Modal
      title={t("airyourhome")}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={onNext}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
}
