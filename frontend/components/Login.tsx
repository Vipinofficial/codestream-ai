
import React, { useState } from 'react';
import { UserRole, User, AppView } from '../types';
import { Shield, GraduationCap, Briefcase, Code2, ArrowRight, Mail, Lock, Sparkles } from 'lucide-react';
import { api } from '../services/api';

interface LoginProps {
  onLogin: (user: User) => void;
  onNavigate: (view: AppView) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [error, setError] = useState<string | null>(null);

  const roles = [
    {
      role: UserRole.STUDENT,
      title: 'Candidate',
      icon: GraduationCap,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      role: UserRole.TEACHER,
      title: 'Recruiter',
      icon: Briefcase,
      color: 'text-indigo-400',
      bgColor: 'bg-indigo-500/10'
    },
    {
      role: UserRole.ADMIN,
      title: 'Admin',
      icon: Shield,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10'
    }
  ];

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { user } = await api.login(email, password);
      onLogin(user);
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center animate-in fade-in duration-700">
        {/* Left Side: Branding */}
        <div className="space-y-10">
          <div className="flex items-center gap-4">
            <div className="bg-indigo-600 p-3.5 rounded-[1.25rem] shadow-2xl shadow-indigo-600/30">
              <Code2 size={42} className="text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-white tracking-tighter">CodeStream<span className="text-indigo-500">AI</span></h1>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-[0.3em]">Hiring Intelligence</p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-6xl font-black text-white leading-[1.1] tracking-tight">
              Validate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600">Talent</span> with AI precision.
            </h2>
            <p className="text-slate-400 text-xl font-medium leading-relaxed max-w-md">
              The world's most advanced technical assessment platform with real-time AI proctoring and code analysis.
            </p>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-950 bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-400">
                  {String.fromCharCode(64+i)}
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-sm font-bold">Trusted by 500+ Engineering Teams</p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
            <Sparkles size={120} className="text-indigo-500" />
          </div>

          <div className="relative z-10">
            <div className="mb-10">
              <h3 className="text-3xl font-black text-white mb-2">Login</h3>
              <p className="text-slate-500 font-medium">Select your role and enter credentials.</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-6">
              <div className="grid grid-cols-3 gap-3 mb-8">
                {roles.map((item) => (
                  <button
                    key={item.role}
                    type="button"
                    onClick={() => setSelectedRole(item.role)}
                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${
                      selectedRole === item.role 
                        ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-600/20' 
                        : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                    }`}
                  >
                    <item.icon size={20} className="mb-2" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{item.title}</span>
                  </button>
                ))}
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <div className="space-y-4">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Email Address" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Password" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98]"
              >
                Sign In
              </button>

              <div className="flex items-center justify-between text-xs font-bold pt-4">
                <button 
                  type="button" 
                  onClick={() => onNavigate(AppView.FORGOT_PASSWORD)}
                  className="text-slate-600 hover:text-indigo-400 transition-colors"
                >
                  Forgot Password?
                </button>
                <button 
                  type="button" 
                  onClick={() => onNavigate(AppView.REGISTER)}
                  className="text-slate-600 hover:text-indigo-400 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
