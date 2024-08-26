import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Define types for the function parameters and the return values
interface LoginResponse {
  id: string;
  email: string;
  token: string;
  error?: string; // Optional error field in case of unsuccessful response
}

export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json: LoginResponse = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(json.error || "An unknown error occurred");
      } else {
        localStorage.setItem("user", JSON.stringify(json));

        dispatch({ type: "LOGIN", payload: json });

        setIsLoading(false);
      }
    } catch (err) {
      setIsLoading(false);
      setError("Failed to connect to the server");
    }
  };

  return { login, isLoading, error };
};
