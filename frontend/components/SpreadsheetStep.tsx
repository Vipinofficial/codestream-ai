
import React, { useState } from 'react';
import { Challenge } from '../types';
import { Table, CheckCircle2, Download, Filter, FunctionSquare, ArrowRight, Table2 } from 'lucide-react';

interface SpreadsheetStepProps {
  challenge: Challenge;
  onComplete: () => void;
}

const SpreadsheetStep: React.FC<SpreadsheetStepProps> = ({ challenge, onComplete }) => {
  const [data, setData] = useState(challenge.spreadsheetData || []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCellChange = (row: number, col: number, value: string) => {
    const newData = [...data];
    newData[row] = [...newData[row]];
    newData[row][col] = value;
    setData(newData);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => onComplete(), 1500);
  };

  return (
    <div className="h-full flex flex-col bg-[#020617] animate-in fade-in duration-700">
      <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-[#0D1117]">
         <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-indigo-500">
               <FunctionSquare size={16} />
               <span className="text-[10px] font-black uppercase tracking-widest">Spreadsheet Node v2.1</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="flex gap-4">
               <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">Format</button>
               <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">Analyze</button>
               <button className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white transition-all">Compute</button>
            </div>
         </div>
         <button 
           onClick={handleSubmit} 
           disabled={isSubmitting}
           className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
         >
           {isSubmitting ? 'Computing...' : 'Finalize Ledger'} <ArrowRight size={14} />
         </button>
      </div>

      <div className="flex-1 overflow-auto p-12 custom-scrollbar">
         <div className="bg-[#0D1117] border border-white/5 rounded-3xl shadow-2xl overflow-hidden min-w-[800px]">
            <table className="w-full border-collapse">
               <thead>
                  <tr className="bg-white/5">
                     <th className="w-12 border-b border-r border-white/5 py-4 text-[10px] font-black text-slate-600 uppercase">#</th>
                     {Array.from({ length: data[0]?.length || 0 }).map((_, i) => (
                       <th key={i} className="border-b border-r border-white/5 py-4 text-[10px] font-black text-slate-600 uppercase tracking-widest">
                          {String.fromCharCode(65 + i)}
                       </th>
                     ))}
                  </tr>
               </thead>
               <tbody>
                  {data.map((row, rIdx) => (
                    <tr key={rIdx} className="border-b border-white/5">
                       <td className="bg-white/5 text-center py-4 text-[10px] font-black text-slate-600 border-r border-white/5">{rIdx + 1}</td>
                       {row.map((cell, cIdx) => (
                         <td key={cIdx} className="border-r border-white/5 p-0">
                            <input 
                              type="text" 
                              value={cell}
                              onChange={(e) => handleCellChange(rIdx, cIdx, e.target.value)}
                              className="w-full bg-transparent p-4 text-xs font-medium text-slate-300 focus:bg-indigo-600/10 focus:outline-none transition-all placeholder:text-slate-700"
                              placeholder="NULL"
                            />
                         </td>
                       ))}
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      <div className="h-10 bg-[#0D1117] border-t border-white/5 flex items-center px-8 justify-between text-[9px] font-black uppercase tracking-widest text-slate-600">
         <div className="flex gap-6">
            <span>Cell: A1</span>
            <span>UTF-8 Engine</span>
         </div>
         <div className="flex items-center gap-2">
            <CheckCircle2 size={12} className="text-emerald-500" />
            Logic Integrity Verified
         </div>
      </div>
    </div>
  );
};

export default SpreadsheetStep;
