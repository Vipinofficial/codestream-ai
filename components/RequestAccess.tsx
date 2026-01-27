
import React, { useState } from 'react';
// Added missing RefreshCw import
import { UserPlus, ArrowLeft, Building2, Briefcase, Mail, Send, CheckCircle2, Globe, Sparkles, RefreshCw } from 'lucide-react';

interface RequestAccessProps {
  onBack: () => void;
}

const RequestAccess: React.FC<RequestAccessProps> = ({ onBack }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: 'Engineering Lead'
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'complete'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setTimeout(() => {
      setStatus('complete');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-2xl w-full bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-16 backdrop-blur-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute -top-12 -right-12 p-8 opacity-10 rotate-12">
          <UserPlus size={240} className="text-indigo-500" />
        </div>

        <div className="relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-500 mb-12 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Login
          </button>

          {status === 'complete' ? (
            <div className="text-center space-y-10 animate-in fade-in scale-95 duration-700">
              <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-600/40 animate-bounce">
                <CheckCircle2 size={48} className="text-white" />
              </div>
              <div className="space-y-4">
                <h3 className="text-5xl font-black text-white tracking-tighter">Application Logged</h3>
                <p className="text-slate-400 text-lg font-medium leading-relaxed max-sm mx-auto">
                  Node connection request for <span className="text-indigo-400">{formData.company}</span> is pending neural verification.
                </p>
              </div>
              <button 
                onClick={onBack}
                className="px-12 py-5 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-all shadow-xl active:scale-95"
              >
                Return to Command
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-4xl font-black text-white tracking-tighter mb-4">Request Command Access</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Join elite engineering teams using AI-driven assessment protocols.
                  </p>
                </div>
                
                <div className="space-y-4">
                  {[
                    { icon: Globe, text: "Global Node Scalability" },
                    { icon: Sparkles, text: "Gemini 3 Pro Integration" },
                    { icon: CheckCircle2, text: "99.9% Uptime SLA" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-slate-400">
                      <item.icon size={16} className="text-indigo-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input 
                      required
                      value={formData.company}
                      onChange={e => setFormData({...formData, company: e.target.value})}
                      placeholder="Organization Name" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                  
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <select 
                      value={formData.role}
                      onChange={e => setFormData({...formData, role: e.target.value})}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-400 focus:text-slate-200 outline-none focus:border-indigo-500 transition-all appearance-none"
                    >
                      <option>Engineering Lead</option>
                      <option>Technical Recruiter</option>
                      <option>VP of Engineering</option>
                      <option>System Administrator</option>
                    </select>
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
                    <input 
                      type="email"
                      required
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      placeholder="Professional Email" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
                >
                  {status === 'submitting' ? <RefreshCw className="animate-spin" size={16} /> : <Send size={16} />}
                  {status === 'submitting' ? 'Transmitting Request...' : 'Apply for Access'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestAccess;
