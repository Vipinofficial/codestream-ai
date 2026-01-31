import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import AuthLayout from "./layouts/AuthLayouts";
import ProtectedLayout from "./layouts/ProtectedLayouts";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AppRoutes from "./routes/AppRoutes";
import { useAuth } from "./context/useAuth";


export default function App() {
  const { currentUser, loading, logout } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Routes>
      {/* ---------- AUTH ROUTES ---------- */}
      <Route
        element={currentUser ? <Navigate to="/" replace /> : <AuthLayout />}
      >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* ---------- PROTECTED ROUTES ---------- */}
      <Route
        element={
          <ProtectedLayout
            currentUser={currentUser}
            theme={theme}
            toggleTheme={() =>
              setTheme((t) => (t === "dark" ? "light" : "dark"))
            }
            onLogout={logout}
          />
        }
      >
        <Route path="/*" element={<AppRoutes />} />
      </Route>

      {/* ---------- FALLBACK ---------- */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
