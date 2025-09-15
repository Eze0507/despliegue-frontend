// src/components/Button.jsx
import React from "react";

const Button = ({ type = "button", variant = "guardar", onClick, disabled = false, children }) => {
  let baseClasses = "font-semibold py-2 px-4 rounded-md transition-all duration-300 focus:outline-none";
  let colorClasses = "";

  switch (variant) {
    case "guardar":
      colorClasses = "bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400";
      type = "submit"; // siempre será submit
      break;
    case "cancelar":
      colorClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100";
      type = "button"; // siempre button
      break;
    default:
      colorClasses = "bg-gray-200 text-gray-800 hover:bg-gray-300";
  }

  return (
    <button type={type} onClick={onClick} className={`${baseClasses} ${colorClasses}`} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
