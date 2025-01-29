import React from "react";

export const Calendar = ({ selected, onSelect, className }) => {
  return (
    <input
      type="date"
      value={selected}
      onChange={(e) => onSelect(e.target.value)}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};
