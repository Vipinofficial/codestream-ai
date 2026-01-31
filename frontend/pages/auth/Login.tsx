import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole, User } from "../../types";
import {
  Shield,
  GraduationCap,
  Briefcase,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { useAuth } from "@/context/useAuth";
import { authApi } from "@/services/api/userApi";

interface UserCredentials {
  email: string;
  password: string;
  role: UserRole;
}
interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

const Login: React.FC<LoginProps> = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { loginSuccess} =  useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { role: UserRole.CANDIDATE, title: "Candidate", icon: GraduationCap },
    { role: UserRole.RECRUITER, title: "Recruiter", icon: Briefcase },
    { role: UserRole.ADMIN, title: "Admin", icon: Shield },
  ];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please enter email and password", "error");
      return;
    }

    if (!selectedRole) {
      showToast("Please select a role", "error");
      return;
    }

    setIsLoading(true);

    try {
      const res = await authApi.login({
        email,
        password,
        role: selectedRole,
      } as UserCredentials);

      localStorage.setItem("cs_token", res.token);
      console.log("res",res)
      loginSuccess(res.user);
      navigate("/", { replace: true });
      showToast("Welcome back 👋", "success");
      
    } catch (err: any) {
      showToast(
        err?.response?.data?.message || "Invalid credentials",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-24 -right-24 opacity-20">
        <Sparkles size={200} className="text-indigo-500" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-10 text-center">
          <h3 className="text-3xl font-black text-white mb-2">Welcome Back</h3>
          <p className="text-slate-500 font-medium">
            Sign in to continue to CodeStreamAI
          </p>
        </div>

        <form onSubmit={handleLoginSubmit} className="space-y-6">
          {/* ROLE SELECT */}
          <div className="grid grid-cols-3 gap-3">
            {roles.map((item) => (
              <button
                key={item.role}
                type="button"
                onClick={() => setSelectedRole(item.role)}
                className={`group p-4 rounded-2xl border transition-all flex flex-col items-center justify-center gap-2 ${
                  selectedRole === item.role
                    ? "bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20"
                    : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
                }`}
              >
                <item.icon size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">
                  {item.title}
                </span>
              </button>
            ))}
          </div>

          {/* EMAIL */}
          <div className="relative group">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
          </div>

          {/* PASSWORD */}
          <div className="relative group">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="relative w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98]"
          >
            {isLoading ? "Signing In…" : "Sign In"}
          </button>

          {/* LINKS */}
          <div className="flex justify-between text-xs font-bold pt-4">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-slate-600 hover:text-indigo-400 transition-colors"
            >
              Forgot Password?
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-slate-600 hover:text-indigo-400 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
