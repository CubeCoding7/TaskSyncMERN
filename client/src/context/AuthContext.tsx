import React, { createContext, useReducer, ReactNode, useEffect } from "react";
import { authReducer } from "../reducers/authReducer";

// Define the User interface
export interface User {
  id: string;
  email: string;
}

// Define the AuthState interface
export interface AuthState {
  user: User | null;
}

// Define the AuthAction type and export it
export type AuthAction = { type: "LOGIN"; payload: User } | { type: "LOGOUT" };

// Create the AuthContext with state and dispatch
export const AuthContext = createContext<
  | {
      state: AuthState;
      dispatch: React.Dispatch<AuthAction>;
    }
  | undefined
>(undefined);

// Define the AuthContextProviderProps interface
interface AuthContextProviderProps {
  children: ReactNode;
}

// Define the AuthContextProvider component
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      const parsedUser: User = JSON.parse(user);
      dispatch({ type: "LOGIN", payload: parsedUser } as AuthAction);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
