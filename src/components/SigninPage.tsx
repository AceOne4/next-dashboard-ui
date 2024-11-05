"use client";
import { login } from "@/lib/actionServer";
import Image from "next/image";
import { useFormState } from "react-dom";
import ErrorMessage from "./UI/ErrorMessages";
import Button from "./UI/Button";

const SignIn = () => {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Image
            src="/logo.png"
            alt="Logo"
            className="h-16"
            width={60}
            height={60}
          />
        </div>
        <h3 className="text-md font-bold  mb-6 text-center text-gray-900">
          ACE School Login
        </h3>

        {/* Sign In Form */}
        <form action={formAction}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              name="email"
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          {/* Role Field (Required) */}
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="role">
              Role (Required)
            </label>
            <select
              id="role"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              name="role"
            >
              <option value="">Select your role</option>
              <option value="admin">Admin</option>
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
              <option value="parent">Parent</option>
            </select>
          </div>

          {/* Sign In Button */}
          <div className="mb-4">
            <Button name="Login" LoadingName="Logining..." />
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </div>
          {state?.error && <ErrorMessage errors={state.error} />}
        </form>
      </div>
    </div>
  );
};

export default SignIn;
