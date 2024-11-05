import React from "react";

interface ErrorMessageProps {
  errors: string | string[];
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ errors }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Oops! Something went wrong:</strong>
      <ul className="list-disc list-inside mt-2">
        {typeof errors === "string" ? (
          <li>{errors}</li>
        ) : (
          errors.map((error, index) => <li key={index}>{error}</li>)
        )}
      </ul>
    </div>
  );
};

export default ErrorMessage;
