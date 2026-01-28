
import React, { useState } from 'react';
import { Mail, ArrowLeft, ShieldAlert, CheckCircle2, RefreshCw, Zap } from 'lucide-react';

interface ForgotPasswordProps {
  onBack: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onBack }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus('sending');
    // Simulate API call for password reset
    setTimeout(() => {
      setStatus('sent');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-slate-900/40 border border-slate-800/50 rounded-[3rem] p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-500">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <ShieldAlert size={120} className="text-indigo-500" />
        </div>

        <div className="relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-500 mb-8 transition-colors"
          >
            <ArrowLeft size={14} /> Back to Login
          </button>

          <div className="mb-10">
            <h3 className="text-3xl font-black text-white mb-2">Neural Recovery</h3>
            <p className="text-slate-500 font-medium">Synchronize identity link via encrypted email packet.</p>
          </div>

          {status === 'sent' ? (
            <div className="space-y-8 animate-in fade-in duration-700">
              <div className="p-8 bg-emerald-500/10 border border-emerald-500/20 rounded-[2rem] text-center">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <h4 className="text-xl font-black text-white mb-2">Packet Transmitted</h4>
                <p className="text-sm text-slate-400 font-medium">Recovery link sent to: <br /><span className="text-indigo-400">{email}</span></p>
              </div>
              <button 
                onClick={onBack}
                className="w-full py-4 bg-slate-800 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-700 transition-all"
              >
                Acknowledge & Return
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Identity Vector (Email)</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-500 transition-colors" size={18} />
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter registered email" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
              </div>

              <button 
                type="submit"
                disabled={status === 'sending' || !email}
                className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-2xl shadow-indigo-600/20 active:scale-[0.98] flex items-center justify-center gap-3"
              >
                {status === 'sending' ? (
                  <>
                    <RefreshCw className="animate-spin" size={16} />
                    Processing Recovery...
                  </>
                ) : (
                  <>
                    <Zap size={16} />
                    Initialize Link Reset
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
