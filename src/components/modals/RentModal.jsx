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
import Input from "../inputs/Input";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { insertListing } from "../../data/listings/insertListing";

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
  const navigate = useNavigate();

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
      imageSrc: [],
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
  const imageSrc = watch("imageSrc");
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

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }
    setLoading(true);
    if (data.category === "" || data.imageSrc.length === 0) {
      toast.error(
        "All data is required! make sure that you select category and upload images"
      );
      setLoading(false);

      return;
    }

    try {
      const listingData = {
        ...data,
        userId: currentUser.uid,
        region: location.region,
        location: location.label,
        mapLocation: location.latlng,
        locationValue: location.value,
      };
      console.log("listing data is = ", listingData);
      const result = await insertListing(listingData);
      toast.success(result);
      toast.success("please wait until approved from admin.");

      reset();
      setStep(STEPS.CATEGORY);
      setImages([]);
      rentModal.onClose();
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setLoading(false);
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

  const handleLocationSelect = (latLng) => {
    location.latlng = [latLng.lat, latLng.lng];
    setCustomValue("location", location);
  };

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
          <Input
            id="locationAr"
            label="Location In Arabic  EX( مصر , القاهرة )"
            disabled={loading}
            register={register}
            errors={errors}
            required
          />

          <Map
            center={location?.latlng}
            onLocationSelect={handleLocationSelect}
            isLocationSelectable
          />
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
              return setCustomValue("imageSrc", value);
            }}
          />
        </div>
      </>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works best!"
        />

        <Input
          id="title"
          label="Title In English"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="titleAr"
          label="Title In Arabic"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <hr />
        <Input
          id="description"
          label="Description In English"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="descriptionAr"
          label="Description In Arabic"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, Set your price"
          subtitle="How much do you charge per night?"
        />
        <Input
          id="price"
          label="Price"
          formatPrice
          type="number"
          disabled={loading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      title={t("airyourhome")}
      isOpen={rentModal.isOpen}
      onClose={rentModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      body={bodyContent}
    />
  );
}
