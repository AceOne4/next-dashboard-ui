// Spinner.js
import React from "react";

// Large spinner
function Spinner() {
  return (
    <div className="w-12 h-12 border-4 border-t-4 border-t-white border-gray-500 rounded-full animate-spin"></div>
  );
}

export default Spinner;

// Mini spinner
export function SpinnerMini() {
  return (
    <div className="w-6 h-6 border-4 border-t-4 border-t-white border-gray-500 rounded-full animate-spin"></div>
  );
}
