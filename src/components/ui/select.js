import React, { useState } from "react";

// Select component
export const Select = ({ children, onValueChange, className }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value) => {
    setSelectedValue(value);
    onValueChange(value);
    setOpen(false); // Close dropdown when a value is selected
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        {React.Children.map(children, (child) =>
          React.cloneElement(child, {
            setOpen,
            selectedValue,
            onValueChange: handleValueChange,
          })
        )}
      </div>
    </div>
  );
};

// SelectItem component
export const SelectItem = ({ value, children, onValueChange }) => {
  return (
    <div
      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
      onClick={() => onValueChange(value)}
    >
      {children}
    </div>
  );
};

// SelectTrigger component
export const SelectTrigger = ({ setOpen, selectedValue }) => {
  return (
    <div
      className="cursor-pointer border border-gray-300 p-2 rounded-lg w-full text-left"
      onClick={() => setOpen((prev) => !prev)}
    >
      {selectedValue || "Select an option"}
    </div>
  );
};

// SelectValue component
export const SelectValue = ({ placeholder }) => {
  return <span className="text-gray-500">{placeholder}</span>;
};

// SelectContent component
export const SelectContent = ({ children, open }) => {
  if (!open) return null;
  return (
    <div className="absolute w-full mt-1 border border-gray-300 bg-white rounded-lg shadow-lg z-10">
      {children}
    </div>
  );
};
