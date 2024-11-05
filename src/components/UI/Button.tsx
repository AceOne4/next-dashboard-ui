"use client";

import { FC } from "react";
import { useFormStatus } from "react-dom";
type TProps = {
  name: string;
  LoadingName: string;
};
// this how to follow the status of teh form we use useformstatsu and it should be on new component
//we cant use it in the same form compnent
const Button: FC<TProps> = ({ name, LoadingName }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? LoadingName : name}
    </button>
  );
};

export default Button;
