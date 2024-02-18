import React, { useState } from "react";
import { DtCalendar } from "react-calendar-datetime-picker";

const Calender = () => {
  const [date, setDate] = useState(null);
  return <DtCalendar  local="fa" onChange={setDate} />;
};
export default Calender;
