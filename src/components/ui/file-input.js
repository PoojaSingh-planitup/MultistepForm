import React from "react";

export const FileInput = ({ onChange, className }) => {
  return (
    <input
      type="file"
      onChange={onChange}
      className={`block w-full text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
    />
  );
};
