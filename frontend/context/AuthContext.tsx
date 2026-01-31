import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "@/types";
import { authApi } from "@/services/api/userApi";

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  loginSuccess: (user: User) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

/* ---------------------------------- */
/* PROVIDER                           */
/* ---------------------------------- */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("cs_token");
    localStorage.removeItem("cs_template");
    localStorage.removeItem("cs_theme");
    setCurrentUser(null);
  };

  const loginSuccess = (user: User) => {
    setCurrentUser(user);
  };

  const refreshUser = async () => {
    try {
      const user = await authApi.getCurrentUser();
      console.log("user",user)
      setCurrentUser(user);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("cs_token");
    if (!token) {
      setLoading(false);
      return;
    }

    refreshUser().finally(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        loginSuccess,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

