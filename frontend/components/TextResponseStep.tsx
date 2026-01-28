
import React, { useState } from 'react';
import { Challenge } from '../types';
import { FileText, Send, CheckCircle2, History, Type } from 'lucide-react';

interface TextResponseStepProps {
  challenge: Challenge;
  onComplete: () => void;
}

const TextResponseStep: React.FC<TextResponseStepProps> = ({ challenge, onComplete }) => {
  const [response, setResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => onComplete(), 1000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#020617] p-12 animate-in fade-in duration-700">
      <div className="max-w-4xl w-full flex flex-col gap-10">
         <div className="space-y-4">
            <div className="flex items-center gap-3">
               <div className="p-3 bg-indigo-600/10 rounded-2xl border border-indigo-500/20 text-indigo-500">
                  <FileText size={24} />
               </div>
               <div>
                  <h2 className="text-3xl font-black text-white tracking-tighter">Text Dossier Submission</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Written Logic Verification Protocol</p>
               </div>
            </div>
            <div className="p-8 bg-white/5 border border-white/5 rounded-[2.5rem] text-slate-300 text-lg leading-relaxed font-medium">
               {challenge.description}
            </div>
         </div>

         <div className="relative group">
            <div className="absolute top-4 left-4 flex items-center gap-2 opacity-50 group-focus-within:opacity-100 transition-opacity">
               <Type size={14} className="text-indigo-400" />
               <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Rich Text Buffer</span>
            </div>
            <textarea 
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              placeholder="Draft your response here..."
              className="w-full min-h-[400px] bg-white/[0.02] border border-white/10 rounded-[3rem] p-12 pt-16 text-slate-300 font-medium leading-relaxed resize-none focus:outline-none focus:border-indigo-600 transition-all custom-scrollbar placeholder:text-slate-800"
            />
            <div className="absolute bottom-8 right-12 flex items-center gap-6">
               <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{response.split(/\s+/).filter(Boolean).length} Words</span>
               <button 
                 onClick={handleSubmit}
                 disabled={isSubmitting || response.length < 20}
                 className="px-10 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 disabled:opacity-30 transition-all flex items-center gap-3"
               >
                 {isSubmitting ? 'Transmitting...' : 'Seal Submission'} <Send size={14} />
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default TextResponseStep;
