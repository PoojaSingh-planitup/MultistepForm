import React from "react";

export const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-md rounded-2xl ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};
