import React, { createContext, useReducer, ReactNode } from "react";

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

// Define the authReducer
export const authReducer = (
  state: AuthState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

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

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
