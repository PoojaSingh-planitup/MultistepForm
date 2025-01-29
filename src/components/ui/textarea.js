import React from "react";

export const Textarea = ({ name, value, onChange, placeholder, className }) => {
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      rows="4"
    ></textarea>
  );
};
