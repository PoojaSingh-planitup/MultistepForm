import React from "react";

export const Button = ({ children, onClick, disabled, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 font-semibold rounded-lg text-white shadow-md ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
      } ${className}`}
    >
      {children}
    </button>
  );
};

