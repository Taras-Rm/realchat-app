import { useState } from "react";
import { ApiErrorType } from "../models/apiError";

interface LoginResponse {
  token: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (name: string, password: string) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:3001/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, password }),
    });

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

  return { login, isLoading, error };
};
