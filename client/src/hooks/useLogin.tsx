import { useState } from "react";
import { ApiErrorType } from "../models/apiError";

interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (name: string, password: string) => {
    localStorage.removeItem("token");
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      `${process.env.REACT_APP_SERVER_URL}/api/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      const err = json as ApiErrorType;
      setError(err.detail);
      setIsLoading(false);
    } else {
      const res = json as LoginResponse;
      localStorage.setItem("token", res.token);
      setIsLoading(false);
      setError(null);
    }
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  return { login, isLoading, error, getToken };
};
