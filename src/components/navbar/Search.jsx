import { BiSearch } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import useSearchModal from "../../hooks/useSearchModal";
import { useNavigate, useSearchParams } from "react-router-dom";
import useCountries from "../../hooks/useCountries";
import { useMemo } from "react";
import { differenceInDays } from "date-fns";
function Search() {
  const navigator = useNavigate();
  const { t } = useTranslation();
  const searchModal = useSearchModal();
  const [params, setSearchParams] = useSearchParams();
  const { getByValue } = useCountries();
  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");
  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue)?.label;
    }
    return t("anywhere");
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      let diff = differenceInDays(end, start);
      if (diff == 0) {
        diff = 1;
      }
      return `${diff} ${t("Days")}`;
    }
    return t("anyweek");
  }, [startDate, endDate]);
  const guestLabel = useMemo(() => {
    if (guestCount) {
      return `${guestCount} ${t("Guests")}`;
    }
    return t("addguests");
  }, [guestCount]);

  return (
    <div
      onClick={() => {
        navigator("/");
        searchModal.onOpen();
      }}
      className="
            border-[1px]
            w-full
            md:w-auto
            py-2
            rounded-full
            shadow-sm
            hover:shadow-md
            transition
            cursor-pointer
         "
    >
      <div
        className="
                flex
                flex-row
                items-center
                justify-between
            "
      >
        <div
          className="
            text-sm
            font-semibold
            px-6
        "
        >
          {locationLabel}
        </div>
        <div
          className="
        hidden
        sm:block
        text-sm
        font-semibold
        px-6
        border-x-[1px]
        flex-1
        text-center
        "
        >
          {durationLabel}
        </div>

        <div
          className="
        text-sm
        pl-6
        pr-2
        text-gray-600
        flex
        flex-row
        items-center
        gap-3
        "
        >
          <div className="hidden sm:block">{guestLabel}</div>
          <div
            className="
                p-2
                bg-rose-500
                rounded-full
                text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
