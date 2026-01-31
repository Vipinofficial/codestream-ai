import { Code2 } from "lucide-react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3.5 rounded-2xl shadow-2xl shadow-indigo-600/30">
              <Code2 size={42} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter">
                CodeStream<span className="text-indigo-500">AI</span>
              </h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                Hiring Intelligence
              </p>
            </div>
          </div>

          <h2 className="text-6xl font-black text-white leading-tight">
            Validate{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-indigo-600 bg-clip-text text-transparent">
              Talent
            </span>{" "}
            with AI precision.
          </h2>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
