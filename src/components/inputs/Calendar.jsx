import { DateRange } from "react-date-range";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { enGB, ar } from "date-fns/locale";

const CalendarWrapper = styled.div`
  .rdrMonthAndYearPickers select {
    background: none;
  }
`;
const languages = {
  en: enGB,
  ar: ar,
};
const Calendar = ({ value, onChange, disabledDates }) => {
  const { i18n } = useTranslation();

  return (
    <CalendarWrapper>
      <DateRange
        rangeColors={["#262626"]}
        ranges={[value]}
        direction="vertical"
        showDateDisplay={false}
        onChange={onChange}
        disabledDates={disabledDates}
        minDate={new Date()} // This will disable dates before today
        locale={languages[i18n.language] || enGB}
      />
    </CalendarWrapper>
  );
};

export default Calendar;
