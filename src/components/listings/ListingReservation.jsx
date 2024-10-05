/* eslint-disable react/prop-types */
import Calendar from "../inputs/Calendar";
import Button from "../Button";
import { useTranslation } from "react-i18next";

const ListingReservation = ({
  price,
  totalPrice,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          {t("$")}
          {price}
        </div>
        <div className="font-light text-neutral-600">{t("night")}</div>
      </div>
      <hr />
      
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label={t("Reserve")} onClick={onSubmit} />
      </div>
      <div className="p-6 flex flex-row items-center justify-between font-semibold text-lg">
        <div>{t("total")}</div>
        <div>
          {t("$")} {totalPrice}
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
