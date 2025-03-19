import {
  useLoginMutation,
  useRefreshTokenMutation,
} from "@/redux/features/auth/authAPi";
import { useAppDispatch } from "@/redux/hooks";
import { ApiError } from "@/utility/apiError";
import React, { useState } from "react";
import { Link, Navigate } from "react-router";

type TLoginResponseType = {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
  };
};

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [login, { data: loginResponse, isLoading, isError }] =
    useLoginMutation();
  const dispatch = useAppDispatch();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      // Add your registration logic here
      (await login(formData).unwrap()) as TLoginResponseType;

      const response = loginResponse as TLoginResponseType;
      <Navigate to="/home" replace />;
    } catch (err) {
      const error = err as ApiError; // Type assertion
      if (error.status === 401) {
        setError("Invalid credentials provided");
      } else if (error.status === 404) {
        setError("User doesn't exist");
      }
    }
  };

  const [refreshToken, { data }] = useRefreshTokenMutation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-600 mb-6">Please sign in to continue</p>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <button
          onClick={() => refreshToken(undefined)}
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none transition-colors"
        >
          Refresh Token
        </button>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between mb-2">
            <p className="italic text-gray-500">Don't have any account?</p>
            <Link to="/register" className="underline focus:outline-none">
              Create one
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
