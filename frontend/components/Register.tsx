import React, { useState } from 'react';
import { UserRole, AppView } from '../types';
import { api } from '../services/api';
import { Shield, GraduationCap, Briefcase, Code2, ArrowRight, Mail, Lock, Sparkles, User as UserIcon } from 'lucide-react';

interface RegisterProps {
  onRegister: (user: any) => void;
  onNavigate: (view: AppView) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>(UserRole.CANDIDATE);
  const [error, setError] = useState<string | null>(null);

  const roles = [
    {
      role: UserRole.CANDIDATE,
      title: 'Candidate',
      icon: GraduationCap,
    },
    {
      role: UserRole.RECRUITER,
      title: 'Recruiter',
      icon: Briefcase,
    },
    {
      role: UserRole.ADMIN,
      title: 'Admin',
      icon: Shield,
    }
  ];

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const { user } = await api.register(name, email, password, selectedRole);
      onRegister(user);
    } catch (err) {
      setError('Registration failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform duration-700">
          <Sparkles size={120} className="text-indigo-500" />
        </div>

        <div className="relative z-10">
          <div className="mb-10 text-center">
            <h3 className="text-3xl font-black text-white mb-2">Create Account</h3>
            <p className="text-slate-500 font-medium">Join CodeStreamAI</p>
          </div>

          <form onSubmit={handleRegisterSubmit} className="space-y-6">
            <div className="relative group">
              <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input 
                type="text" 
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Full Name" 
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all"
              />
            </div>
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
            
            <div className="grid grid-cols-3 gap-3">
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

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98]"
            >
              Sign Up
            </button>

            <div className="text-center text-xs font-bold pt-4">
              <button 
                type="button" 
                onClick={() => onNavigate(AppView.DASHBOARD)}
                className="text-slate-600 hover:text-indigo-400 transition-colors"
              >
                Already have an account? Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
