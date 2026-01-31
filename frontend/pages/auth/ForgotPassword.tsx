import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  ArrowLeft,
  ShieldAlert,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { useToast } from "@/context/ToastContext";
// import { api } from "@/services/api"; // hook when backend is ready

type Status = "idle" | "sending" | "sent";

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      showToast("Please enter your registered email", "error");
      return;
    }

    setStatus("sending");

    try {
      // await api.forgotPassword(email);
      await new Promise((r) => setTimeout(r, 1500)); // mock

      setStatus("sent");
      showToast("Recovery email sent successfully", "success");
    } catch (err: any) {
      setStatus("idle");
      showToast(
        err?.response?.data?.message || "Failed to send recovery email",
        "error"
      );
    }
  };

  return (
    <div className="relative bg-slate-900/40 border border-slate-800/60 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-24 -right-24 opacity-20">
        <ShieldAlert size={200} className="text-indigo-500" />
      </div>

      <div className="relative z-10">
        {/* Back */}
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-400 mb-8 transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Login
        </button>

        {/* Header */}
        <div className="mb-10">
          <h3 className="text-3xl font-black text-white mb-2">
            Reset Password
          </h3>
          <p className="text-slate-500 font-medium">
            We’ll send a secure recovery link to your email.
          </p>
        </div>

        {status === "sent" ? (
          <div className="space-y-8 animate-in fade-in duration-700">
            <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] text-center">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                <CheckCircle2 size={32} className="text-white" />
              </div>
              <h4 className="text-xl font-black text-white mb-2">
                Email Sent
              </h4>
              <p className="text-sm text-slate-400 font-medium">
                Recovery instructions sent to
                <br />
                <span className="text-indigo-400">{email}</span>
              </p>
            </div>

            <button
              onClick={() => navigate("/login")}
              className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
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

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {status === "sending" ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Sending…
                </>
              ) : (
                "Send Recovery Link"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
