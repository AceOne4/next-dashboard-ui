import { FieldError } from "react-hook-form";

type InputFieldProps = {
  label: string;
  type?: string;
  register: any;
  name: string;
  defaultValue?: string;
  error?: FieldError | (FieldError | undefined)[] | undefined;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
};

const InputField = ({
  label,
  type = "text",
  register,
  name,
  defaultValue,
  error,
  inputProps,
}: InputFieldProps) => {
  let errorMessage = "";

  if (Array.isArray(error)) {
    // Handle array of errors
    const firstError = error.find((e) => e !== undefined);
    errorMessage = firstError ? firstError.message || "" : "";
  } else if (error) {
    // Handle single field error
    errorMessage = error.message || "";
  }
  return (
    <div className="flex flex-col gap-2 w-full md:w-1/4">
      <label className="text-xs text-gray-500">{label}</label>
      <input
        type={type}
        {...register(name)}
        className="ring-[1.5px] ring-gray-300 p-2 rounded-md text-sm w-full"
        {...inputProps}
        defaultValue={defaultValue}
      />
      {errorMessage && (
        <p className="text-xs text-red-400">{errorMessage.toString()}</p>
      )}
    </div>
  );
};

export default InputField;
