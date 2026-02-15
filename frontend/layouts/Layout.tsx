import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { User, UserRole } from "../types";
import {
  LayoutDashboard,
  Search,
  Moon,
  Sun,
  Menu,
  X,
  ChevronRight,
  Activity,
  Zap,
  ShieldCheck,
  Globe,
  Terminal,
  LogOut,
  FileQuestionMark,
  TestTubeDiagonalIcon,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  currentUser: User | null;
  theme: "light" | "dark";
  toggleTheme: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  currentUser,
  theme,
  toggleTheme,
  onLogout,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [latency, setLatency] = useState(18);

  /* ---------------- LATENCY MOCK ---------------- */
  useEffect(() => {
    const i = setInterval(
      () => setLatency(Math.floor(Math.random() * 10) + 15),
      4000
    );
    return () => clearInterval(i);
  }, []);

  /* ---------------- THEME SYNC ---------------- */
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("cs_theme", theme);
  }, [theme]);

  /* ---------------- NAV CONFIG ---------------- */
  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      to: "/",
      roles: [UserRole.ADMIN, UserRole.RECRUITER, UserRole.CANDIDATE],
    },
    {
      label: "Questions",
      icon: FileQuestionMark,
      to: "/question_build",
      roles: [UserRole.ADMIN, UserRole.RECRUITER],
    },
    {
      label: "Test Manager",
      icon: TestTubeDiagonalIcon,
      to: "/test_manager",
      roles: [UserRole.ADMIN, UserRole.RECRUITER],
    },
  ];

  /* ---------------- TITLE MAP ---------------- */
  const titleMap: Record<string, string> = {
    "/": "Dashboard",
    "/question_build": "Question Builder",
    "/test_manager": "Test Manager",
    "/settings": "System Settings",
    "/profile": "Profile",
  };

  const pageTitle =
    Object.entries(titleMap).find(([k]) =>
      location.pathname.startsWith(k)
    )?.[1] ?? "Console";

  return (
    <div className="flex h-screen bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100">

      {/* ================= SIDEBAR ================= */}
      <aside className="hidden lg:flex w-20 flex-col items-center py-8 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#020617] shrink-0 z-50">

        {/* Logo */}
        <div
          className="mb-12 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-xl shadow-indigo-600/40">
            <Zap size={22} className="text-white" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-6">
          {navItems.map(
            (item) =>
              currentUser &&
              item.roles.includes(currentUser.role) && (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `p-3.5 rounded-2xl transition-all duration-200 relative group
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20 scale-105"
                        : "text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/5 hover:scale-105"
                    }`
                  }
                >
                  <item.icon size={22} />

                  {/* Tooltip */}
                  <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                    {item.label}
                  </div>
                </NavLink>
              )
          )}
        </nav>

        {/* Bottom Controls */}
        <div className="flex flex-col gap-6 mt-auto">
          <button
            onClick={toggleTheme}
            className="p-3.5 text-slate-400 hover:text-indigo-500 transition-all"
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {currentUser && (
            <button onClick={() => navigate("/profile")}>
              <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10">
                <span className="text-xs font-black text-indigo-500">
                  {currentUser?.name?.charAt(0)}
                </span>
              </div>
            </button>
          )}
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* ---------- HEADER ---------- */}
        <header className="h-20 flex items-center justify-between px-8 bg-white/40 dark:bg-[#020617]/40 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">

          {/* Left */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden"
            >
              <Menu size={24} />
            </button>

            <div>
              <div className="flex items-center gap-2 mb-1 text-[9px] font-black uppercase tracking-widest">
                <span className="text-slate-400">Root</span>
                <ChevronRight size={10} />
                <span className="text-indigo-500">{pageTitle}</span>
              </div>
              <span className="text-2xl font-black tracking-tighter">
                {pageTitle}
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-6">

            {/* Search */}
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <Search size={14} />
              <input
                placeholder="Search..."
                className="bg-transparent text-sm outline-none w-40 placeholder:text-slate-400"
              />
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all duration-200"
            >
              <LogOut size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                Logout
              </span>
            </button>
          </div>
        </header>

        {/* ---------- STATUS BAR ---------- */}
        <div className="h-8 bg-slate-100 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5 flex items-center px-8 text-[8px] font-black uppercase tracking-widest text-slate-500 gap-8">
          <span className="flex items-center gap-2">
            <Activity size={10} className="text-indigo-500" />
            Latency {latency}ms
          </span>
          <span className="flex items-center gap-2">
            <Globe size={10} className="text-emerald-500" />
            US-EAST
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={10} />
            Secure
          </span>
          {currentUser && (
            <span className="flex items-center gap-2">
              <Terminal size={10} />
              {currentUser.role}
            </span>
          )}
        </div>

        {/* ---------- CONTENT ---------- */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl">
          <div className="w-72 h-full bg-[#020617] border-r border-white/10 p-8 flex flex-col">

            <div className="flex justify-between mb-8">
              <Zap className="text-indigo-500" />
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navItems.map(
                (item) =>
                  currentUser &&
                  item.roles.includes(currentUser.role) && (
                    <button
                      key={item.to}
                      onClick={() => {
                        navigate(item.to);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                        location.pathname === item.to
                          ? "bg-indigo-600 text-white"
                          : "bg-white/5 text-slate-300 hover:bg-white/10"
                      }`}
                    >
                      <item.icon size={18} />
                      {item.label}
                    </button>
                  )
              )}
            </nav>

            <button
              onClick={onLogout}
              className="mt-auto flex items-center gap-4 p-4 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Layout;