import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

// Define types for the function parameters and the return values
interface SignupResponse {
  id: string;
  email: string;
  token: string;
  error?: string; // Optional error field in case of unsuccessful response
}

export const useSignup = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json: SignupResponse = await response.json();

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

  return { signup, isLoading, error };
};
