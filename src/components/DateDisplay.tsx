import React from "react";

interface DateDisplayProps {
  date: string | Date;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  const d = new Date(date);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");

  const formatted = `${yyyy}-${mm}-${dd}, ${hh}:${min}`;

  return <span className="text-[#62748E]">{formatted}</span>;
};

export default DateDisplay;
