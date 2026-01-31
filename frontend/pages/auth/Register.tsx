import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserRole } from "@/types";
import {
  Shield,
  GraduationCap,
  Briefcase,
  Mail,
  Lock,
  Sparkles,
  User as UserIcon,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
import { authApi } from "@/services/api/userApi";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole>(
    UserRole.CANDIDATE
  );
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    { role: UserRole.CANDIDATE, title: "Candidate", icon: GraduationCap },
    { role: UserRole.RECRUITER, title: "Recruiter", icon: Briefcase },
    { role: UserRole.ADMIN, title: "Admin", icon: Shield },
  ];

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      showToast("All fields are required", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }

    setIsLoading(true);

    try {
      await authApi.register({name, email, password, role:selectedRole});

      showToast("Account created successfully 🎉", "success");
      navigate("/login", { replace: true });
    } catch (err: any) {
      showToast(
        err?.response?.data?.message || "Registration failed",
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
          <h3 className="text-3xl font-black text-white mb-2">
            Create Account
          </h3>
          <p className="text-slate-500 font-medium">
            Join CodeStreamAI in seconds
          </p>
        </div>

        <form onSubmit={handleRegisterSubmit} className="space-y-6">
          {/* NAME */}
          <div className="relative group">
            <UserIcon
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors"
              size={18}
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
            />
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

          {/* ROLE SELECT */}
          <div className="grid grid-cols-3 gap-3 pt-2">
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

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98]"
          >
            {isLoading ? "Creating Account…" : "Sign Up"}
          </button>

          {/* LINK */}
          <div className="text-center text-xs font-bold pt-4">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-slate-600 hover:text-indigo-400 transition-colors"
            >
              Already have an account? Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
