
import React, { useState } from 'react';
import { User, UserRole } from '../types';
import { 
  User as UserIcon, Mail, MapPin, Sparkles, Save, Shield, 
  Bell, Globe, Key, Trash2, Camera, Wand2, CheckCircle2, LogOut, AlertTriangle
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface ProfileProps {
  user: User;
  onUpdate: (updatedUser: User) => void;
  onLogout?: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate, onLogout }) => {
  const [formData, setFormData] = useState<User>(user);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'done'>('idle');
  const [showDeactivateConfirm, setShowDeactivateConfirm] = useState(false);

  const handleEnhanceBio = async () => {
    setIsEnhancing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const model = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Enhance the following professional bio for a ${user.role} on a technical assessment platform. Current Bio: "${formData.bio}"`,
      });
      setFormData(prev => ({ ...prev, bio: model.text }));
    } catch (e) {
      console.error(e);
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      onUpdate(formData);
      setSaveStatus('done');
      setTimeout(() => setSaveStatus('idle'), 2000);
    }, 1000);
  };

  const handleDeactivate = () => {
    alert("Account deactivated. Logging out.");
    onLogout?.();
  };

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-4xl font-black text-white tracking-tight">Account Settings</h2>
        <div className="flex gap-4">
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
          >
            <LogOut size={16} /> Logout
          </button>
          <button 
            onClick={handleSave}
            disabled={saveStatus !== 'idle'}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
              saveStatus === 'done' ? 'bg-green-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-xl shadow-indigo-600/20'
            }`}
          >
            {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'done' ? <><CheckCircle2 size={16} /> Saved</> : <><Save size={16} /> Save Changes</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="space-y-6">
          <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-10 text-center relative group overflow-hidden">
            <div className="relative w-32 h-32 mx-auto mb-6 group">
              <div className="w-full h-full rounded-[2rem] bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-4xl font-black text-white shadow-2xl overflow-hidden">
                {formData.name.charAt(0)}
              </div>
              <button className="absolute -bottom-2 -right-2 p-3 bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 hover:text-white transition-all shadow-xl opacity-0 group-hover:opacity-100">
                <Camera size={18} />
              </button>
            </div>
            <h3 className="text-2xl font-black text-white mb-1">{formData.name}</h3>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">{formData.role}</p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <section className="bg-slate-900/40 border border-slate-800 rounded-[2.5rem] p-10">
            <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3"><UserIcon className="text-indigo-400" size={20} /> Personal Info</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-5 text-sm text-slate-300 focus:border-indigo-500 transition-all outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Email</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-slate-800 rounded-2xl py-3.5 px-5 text-sm text-slate-300 focus:border-indigo-500 transition-all outline-none" />
              </div>
            </div>
          </section>

          <section className="bg-red-500/5 border border-red-500/10 rounded-[2.5rem] p-10">
            <h3 className="text-xl font-bold text-red-500 mb-6 flex items-center gap-3"><Trash2 size={20} /> Danger Zone</h3>
            {!showDeactivateConfirm ? (
              <div className="flex items-center justify-between">
                <div><p className="font-bold text-slate-200">Deactivate Account</p><p className="text-xs text-slate-500">Permanently remove all data.</p></div>
                <button onClick={() => setShowDeactivateConfirm(true)} className="px-4 py-2 border border-red-500/20 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all">Deactivate</button>
              </div>
            ) : (
              <div className="flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
                <div className="flex items-start gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400">
                  <AlertTriangle size={18} className="shrink-0 mt-0.5" />
                  <p className="text-xs font-bold">Are you sure? This action is irreversible. All your progress and assessment history will be lost.</p>
                </div>
                <div className="flex gap-2">
                   <button onClick={() => setShowDeactivateConfirm(false)} className="flex-1 py-3 bg-slate-800 text-slate-200 rounded-xl text-xs font-bold">Cancel</button>
                   <button onClick={handleDeactivate} className="flex-1 py-3 bg-red-600 text-white rounded-xl text-xs font-bold">Yes, Deactivate</button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
