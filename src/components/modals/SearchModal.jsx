import { useNavigate, useSearchParams } from "react-router-dom";
import useSearchModal from "../../hooks/useSearchModal";
import Modal from "./Modal";
import {
  useCallback,
  useMemo,
  useState,
  Suspense,
  useEffect,
  useRef,
} from "react";
import qs from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import CountrySelect from "../inputs/CountrySelect";
import L from "leaflet";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";
import { useTranslation } from "react-i18next";

const SearchModal = () => {
  const searchModal = useSearchModal();
  const nav = useNavigate();
  const [params] = useSearchParams();
  const { t } = useTranslation();

  const STEPS = {
    LOCATION: 0,
    DATE: 1,
    INFO: 2,
  };

  const [step, setStep] = useState(STEPS.LOCATION);
  const [location, setLocation] = useState();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    const mapInstance = mapInstanceRef.current;

    if (mapInstance) {
      mapInstance.remove();
    }

    if (mapRef.current && location?.latlng) {
      const map = L.map(mapRef.current, {
        center: location.latlng,
        zoom: 5,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [location]); // Add location to dependency array

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};
    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    nav(url);
  }, [
    step,
    searchModal,
    location,
    nav,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange,
    onNext,
    params,
  ]);

  const actionLabel = useMemo(() => {
    return step === STEPS.INFO ? t("Search") : t("Next");
  }, [step, t]);

  const secondaryActionLabel = useMemo(() => {
    return step === STEPS.LOCATION ? undefined : t("Back");
  }, [step, t]);

  const bodyContent = useMemo(() => {
    if (step === STEPS.DATE) {
      return (
        <div className="flex flex-col gap-8">
          <Heading title={t("mq2")} subtitle={t("mqp2")} />
          <Calendar
            value={dateRange}
            onChange={(value) => setDateRange(value.selection)}
          />
        </div>
      );
    }

    if (step === STEPS.INFO) {
      return (
        <div className="flex flex-col gap-8">
          <Heading title={t("mq3")} subtitle={t("mqp3")} />
          <Counter
            title={t("Guests")}
            subtitle={t("Gq")}
            value={guestCount}
            onChange={(value) => setGuestCount(value)}
          />
          <Counter
            title={t("Rooms")}
            subtitle={t("Rq")}
            value={roomCount}
            onChange={(value) => setRoomCount(value)}
          />
          <Counter
            title={t("Bathrooms")}
            subtitle={t("Bq")}
            value={bathroomCount}
            onChange={(value) => setBathroomCount(value)}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col gap-8">
        <Heading title={t("mq1")} subtitle={t("mqp1")} />
        <CountrySelect
          value={location}
          onChange={(value) => setLocation(value)}
        />
        <hr />
        <Suspense fallback={<div>Loading map...</div>}>
          <div ref={mapRef} style={{ height: "250px" }}></div>
        </Suspense>
      </div>
    );
  }, [step, location, guestCount, roomCount, bathroomCount, dateRange, t]);

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title={t("Filters")}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
