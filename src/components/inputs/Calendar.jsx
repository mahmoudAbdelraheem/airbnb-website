import { DateRange } from "react-date-range";

const Calendar = ({ value, onChange, disabledDates }) => {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      direction="vertical"
      showDateDisplay={false}
      onChange={onChange}
      disabledDates={disabledDates}
      minDdate={new Date()}
    />
  );
};

export default Calendar;
