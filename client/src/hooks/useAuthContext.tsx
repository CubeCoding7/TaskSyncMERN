import { AuthContext, AuthState, AuthAction } from "../context/AuthContext";
import { useContext } from "react";

interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context as AuthContextType;
};
