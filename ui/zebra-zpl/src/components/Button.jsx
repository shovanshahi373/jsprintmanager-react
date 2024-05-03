import React from "react";

const Button = ({ children, onClick, disabled = false }) => {
  return (
    <div>
      <button
        className={`px-4 py-2 flex gap-2 items-center justify-between text-white rounded-md bg-blue-500 uppercase ${
          disabled ? "disabled:opacity-50" : ""
        }`}
        type="button"
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
