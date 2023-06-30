import React from "react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

function DatePick() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <div>
      {/* <DatePicker
        selected={selectedDate}
        onSelect={(date) => setSelectedDate(date)}
        dateFormat="yyyy/mm/dd"
        showYearDropdown
        scrollableMonthYearDropdown
      /> */}
      <DatePicker selected={selectedDate} onChange={(date) => setSelectedDate(date)} />
    </div>
  );
}

export default DatePick;
