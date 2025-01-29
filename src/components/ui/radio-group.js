import React from "react";

export const RadioGroup = ({ children, className }) => {
  return (
    <div
      role="radiogroup"
      className={`space-y-2 ${className}`}
    >
      {children}
    </div>
  );
};

export const RadioGroupItem = ({ id, value, checked, onChange, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="radio"
        id={id}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-400"
      />
      <label htmlFor={id} className="ml-2 text-gray-700">
        {value}
      </label>
    </div>
  );
};
