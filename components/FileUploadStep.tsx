import React, { useState } from 'react';
import { Challenge } from '../types';
// Fixed: Added missing RefreshCw import from lucide-react
import { Upload, File, X, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';

interface FileUploadStepProps {
  challenge: Challenge;
  onComplete: () => void;
}

const FileUploadStep: React.FC<FileUploadStepProps> = ({ challenge, onComplete }) => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    setStatus('uploading');
    setTimeout(() => {
      setStatus('done');
      setTimeout(() => onComplete(), 1000);
    }, 2000);
  };

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#020617] p-12 animate-in fade-in duration-700">
      <div className="max-w-2xl w-full space-y-12 text-center">
         <div className="space-y-4">
            <div className="w-20 h-20 bg-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl shadow-indigo-600/20">
               <Upload size={32} className="text-white" />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter">Payload Transmission</h2>
            <p className="text-slate-500 font-medium text-lg leading-relaxed max-w-md mx-auto">
               Securely upload your artifact for system verification. {challenge.allowedTypes && `Allowed formats: ${challenge.allowedTypes.join(', ')}`}
            </p>
         </div>

         {!file ? (
           <label className="block w-full cursor-pointer group">
              <div className="w-full py-24 bg-white/[0.02] border-2 border-dashed border-white/10 rounded-[4rem] group-hover:border-indigo-500/50 group-hover:bg-indigo-600/5 transition-all flex flex-col items-center gap-6">
                 <div className="p-6 bg-slate-900 rounded-3xl text-slate-600 group-hover:text-indigo-400 group-hover:scale-110 transition-all">
                    <File size={40} />
                 </div>
                 <div className="space-y-1">
                    <p className="text-sm font-black text-slate-300 uppercase tracking-widest">Select Signal Source</p>
                    <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">or drag and drop files here</p>
                 </div>
              </div>
              <input type="file" className="hidden" onChange={handleFileChange} accept={challenge.allowedTypes?.join(',')} />
           </label>
         ) : (
           <div className="p-8 bg-indigo-600/5 border border-indigo-500/20 rounded-[3rem] animate-in zoom-in-95 duration-500">
              <div className="flex items-center gap-6 mb-10">
                 <div className="p-5 bg-indigo-600 rounded-2xl text-white shadow-xl">
                    <File size={24} />
                 </div>
                 <div className="text-left flex-1 overflow-hidden">
                    <p className="text-lg font-black text-white tracking-tight truncate">{file.name}</p>
                    <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{(file.size / 1024).toFixed(1)} KB Buffer</p>
                 </div>
                 <button onClick={() => setFile(null)} className="p-3 text-slate-500 hover:text-red-500 transition-colors">
                    <X size={20} />
                 </button>
              </div>

              <div className="space-y-6">
                 {status === 'uploading' && (
                    <div className="space-y-3">
                       <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-500">
                          <span>Encrypting Link</span>
                          <span>74%</span>
                       </div>
                       <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div className="h-full bg-indigo-600 w-3/4 animate-[pulse_2s_infinite]" />
                       </div>
                    </div>
                 )}

                 <button 
                   onClick={handleUpload}
                   disabled={status === 'uploading'}
                   className="w-full py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-xs shadow-2xl hover:bg-indigo-500 disabled:opacity-50 transition-all active:scale-95 flex items-center justify-center gap-3"
                 >
                    {status === 'uploading' ? <RefreshCw className="animate-spin" size={16} /> : <Upload size={16} />}
                    {status === 'uploading' ? 'Synchronizing...' : 'Execute Upload'}
                 </button>
              </div>
           </div>
         )}

         <div className="flex items-center justify-center gap-8 text-[9px] font-black text-slate-600 uppercase tracking-[0.3em]">
            <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-indigo-500" /> End-to-End Encrypted</div>
            <div className="flex items-center gap-2"><AlertCircle size={14} className="text-amber-500" /> Max Size: 10MB</div>
         </div>
      </div>
    </div>
  );
};

export default FileUploadStep;