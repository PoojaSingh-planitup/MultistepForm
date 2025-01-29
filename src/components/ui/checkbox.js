import React from "react";

export const Checkbox = ({ id, checked, onChange, children, className }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 text-blue-500 focus:ring-2 focus:ring-blue-400"
      />
      <label htmlFor={id} className="ml-2 text-gray-700">
        {children}
      </label>
    </div>
  );
};
