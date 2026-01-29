
import React, { useState, useEffect } from 'react';
import { AppView, User, UserRole, Challenge } from '../types';
import { 
  LayoutDashboard, Code2, Briefcase, FileStack, Settings, 
  Search, Moon, Sun, Menu, X, ChevronRight, Activity, 
  Zap, Bell, ShieldCheck, UserCircle, Globe, Terminal, LogOut, Home, ArrowLeft,
  FileQuestionMark
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeView: AppView;
  setView: (view: AppView) => void;
  currentUser: User;
  selectedChallenge?: Challenge | null;
  isSessionActive?: boolean;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, activeView, setView, currentUser, selectedChallenge, 
  isSessionActive, theme, toggleTheme, onLogout
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [latency, setLatency] = useState(18);

  useEffect(() => {
    const interval = setInterval(() => setLatency(Math.floor(Math.random() * 10) + 15), 4000);
    return () => clearInterval(interval);
  }, []);

  if (isSessionActive && activeView === AppView.CHALLENGE) {
    return <main className="h-screen-safe w-full flex flex-col bg-[#020617]">{children}</main>;
  }

  const navItems = [
    { id: AppView.DASHBOARD, label: 'Nodes', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.RECRUITER, UserRole.CANDIDATE] },
    { id: AppView.TEMPLATES, label: 'Library', icon: FileStack, roles: [UserRole.ADMIN, UserRole.RECRUITER] },
    { id: AppView.ADMIN, label: 'Command', icon: Briefcase, roles: [UserRole.ADMIN, UserRole.RECRUITER] },
    { id: AppView.QUESTIONS, label: 'Questions', icon: FileQuestionMark, roles: [UserRole.ADMIN, UserRole.RECRUITER] },
    { id: AppView.SYSTEM_SETTINGS, label: 'Systems', icon: Settings, roles: [UserRole.ADMIN] },
  ];

  return (
    <div className="flex h-screen-safe w-full overflow-hidden bg-slate-50 dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans">
      <aside className="hidden lg:flex w-20 flex-col items-center py-8 border-r border-slate-200 dark:border-white/5 bg-white dark:bg-[#020617] shrink-0 z-50">
        <div className="mb-12 group cursor-pointer" onClick={() => setView(AppView.DASHBOARD)}>
          <div className="bg-indigo-600 p-3 rounded-2xl shadow-2xl shadow-indigo-600/40 group-hover:scale-110 transition-transform duration-500">
            <Zap size={22} className="text-white" />
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-6">
          {navItems.map((item) => item.roles.includes(currentUser.role) && (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`p-3.5 rounded-2xl transition-all relative group ${
                activeView === item.id 
                  ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-600/20' 
                  : 'text-slate-400 hover:text-indigo-500 hover:bg-indigo-500/5'
              }`}
            >
              <item.icon size={22} />
              <div className="absolute left-full ml-4 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap shadow-2xl z-[100]">
                {item.label}
              </div>
            </button>
          ))}
        </nav>

        <div className="flex flex-col gap-6 mt-auto">
          <button onClick={toggleTheme} className="p-3.5 text-slate-400 hover:text-indigo-500 transition-colors">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button 
            onClick={() => setView(AppView.PROFILE)} 
            className={`p-1.5 rounded-2xl transition-all border ${activeView === AppView.PROFILE ? 'border-indigo-600' : 'border-transparent'}`}
          >
            <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/5 flex items-center justify-center border border-slate-200 dark:border-white/10 overflow-hidden hover:border-indigo-500/50 transition-all">
              <span className="text-xs font-black text-indigo-500">{currentUser.name.charAt(0)}</span>
            </div>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col relative overflow-hidden">
        <header className="h-20 flex items-center justify-between px-8 lg:px-12 shrink-0 z-40 bg-white/40 dark:bg-[#020617]/40 backdrop-blur-xl border-b border-slate-200 dark:border-white/5">
          <div className="flex items-center gap-6">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 text-slate-500">
              <Menu size={24} />
            </button>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                 <button onClick={() => setView(AppView.DASHBOARD)} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-indigo-500 transition-colors">Root</button>
                 <ChevronRight size={10} className="text-slate-600" />
                 <span className="text-[9px] font-black uppercase tracking-widest text-indigo-500">
                    {activeView === AppView.ADMIN ? 'Command' : activeView === AppView.DASHBOARD ? 'Nodes' : activeView.replace(/_/g, ' ')}
                 </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-black tracking-tighter">
                  {activeView === AppView.ADMIN ? 'Recruiter Command' : 
                   activeView === AppView.DASHBOARD ? 'Mission Grid' : 
                   activeView.replace(/_/g, ' ')}
                </span>
                {selectedChallenge && activeView === AppView.CHALLENGE && (
                  <div className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="text-sm font-medium text-slate-500 italic">{selectedChallenge.title}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl group transition-all hover:border-indigo-500/30">
              <Search size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />
              <input type="text" placeholder="Search Data..." className="bg-transparent border-none text-[10px] font-black uppercase tracking-widest outline-none w-32 focus:w-48 transition-all placeholder:text-slate-500" />
            </div>
            <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/5" />
            <button 
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/20 text-red-500 rounded-xl transition-all group"
            >
              <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform" />
              <span className="text-[10px] font-black uppercase tracking-widest">Logout</span>
            </button>
          </div>
        </header>

        <div className="h-8 bg-slate-100 dark:bg-white/[0.02] border-b border-slate-200 dark:border-white/5 flex items-center px-8 overflow-hidden">
          <div className="flex items-center gap-8 animate-[marquee_30s_linear_infinite] whitespace-nowrap">
            <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
              <Activity size={10} className="text-indigo-500" /> Latency: {latency}ms
            </span>
            <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
              <Globe size={10} className="text-emerald-500" /> Active Ops: US-EAST
            </span>
            <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
              <ShieldCheck size={10} className="text-indigo-500" /> Neural Link: Secure
            </span>
            <span className="flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
              <Terminal size={10} className="text-amber-500" /> User Role: {currentUser.role}
            </span>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto custom-scrollbar bg-white dark:bg-[#020617]">
          {children}
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-300">
          <div className="w-72 h-full bg-[#020617] border-r border-white/10 p-8 flex flex-col animate-in slide-in-from-left duration-500">
            <div className="flex items-center justify-between mb-12">
              <Zap size={24} className="text-indigo-500" />
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-400">
                <X size={24} />
              </button>
            </div>
            <nav className="flex-1 flex flex-col gap-4">
              {navItems.map((item) => item.roles.includes(currentUser.role) && (
                <button
                  key={item.id}
                  onClick={() => { setView(item.id); setIsMobileMenuOpen(false); }}
                  className={`flex items-center gap-4 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    activeView === item.id ? 'bg-indigo-600 text-white' : 'text-slate-500 bg-white/5'
                  }`}
                >
                  <item.icon size={18} /> {item.label}
                </button>
              ))}
            </nav>
            <button onClick={onLogout} className="mt-auto flex items-center gap-4 p-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 bg-red-500/5 border border-red-500/10">
               <LogOut size={18} /> Logout Session
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default Layout;
