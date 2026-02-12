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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("cs_user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("cs_token");
    localStorage.removeItem("cs_template");
    localStorage.removeItem("cs_theme");
    localStorage.removeItem("cs_user"); // remove user
    setCurrentUser(null);
  };

  const loginSuccess = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem("cs_user", JSON.stringify(user)); // save user
  };

  const refreshUser = async () => {
    try {
      const user = await authApi.getCurrentUser();
      setCurrentUser(user);
      localStorage.setItem("cs_user", JSON.stringify(user)); // update storage
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

    // If user already in localStorage, no need to block UI
    if (currentUser) {
      setLoading(false);
      refreshUser(); // background refresh
    } else {
      refreshUser().finally(() => setLoading(false));
    }
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