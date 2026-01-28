
import React, { useState } from 'react';
import { PersonalityQuestion } from '../types';
import { Smile, Heart, Star, ShieldCheck, ArrowRight, Brain } from 'lucide-react';

interface PersonalityStepProps {
  questions: PersonalityQuestion[];
  onComplete: () => void;
}

const PersonalityStep: React.FC<PersonalityStepProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const currentQ = questions[currentIndex];

  const handleScore = (score: number) => {
    setScores(prev => ({ ...prev, [currentQ.id]: score }));
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      } else {
        onComplete();
      }
    }, 400);
  };

  const options = [
    { label: 'Strongly Disagree', score: 1, color: 'hover:bg-red-500/20 text-red-400' },
    { label: 'Disagree', score: 2, color: 'hover:bg-orange-500/20 text-orange-400' },
    { label: 'Neutral', score: 3, color: 'hover:bg-slate-500/20 text-slate-400' },
    { label: 'Agree', score: 4, color: 'hover:bg-emerald-500/20 text-emerald-400' },
    { label: 'Strongly Agree', score: 5, color: 'hover:bg-indigo-500/20 text-indigo-400' },
  ];

  return (
    <div className="h-full flex flex-col items-center justify-center bg-[#020617] p-8 animate-in fade-in duration-700">
      <div className={`max-w-4xl w-full space-y-12 text-center transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
         <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-pink-500/10 text-pink-500 border border-pink-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
               <Smile size={12} /> Personality Profiling
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter">Team Integration Scan</h2>
            <p className="text-slate-500 text-lg font-medium max-w-lg mx-auto leading-relaxed">Respond honestly to help us understand your unique technical synergy patterns.</p>
         </div>

         <div className="bg-white/[0.02] border border-white/10 rounded-[3.5rem] p-16 shadow-2xl space-y-12">
            <div className="space-y-2">
               <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Indicator {currentIndex + 1} / {questions.length}</span>
               <p className="text-3xl font-bold text-slate-100 leading-tight tracking-tight">{currentQ?.text}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
               {options.map((opt) => (
                 <button 
                   key={opt.score}
                   onClick={() => handleScore(opt.score)}
                   className={`flex flex-col items-center gap-4 p-6 rounded-[2rem] border border-white/5 bg-white/[0.02] transition-all hover:scale-105 active:scale-95 group ${opt.color}`}
                 >
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-current group-hover:text-black transition-all">
                       <span className="text-xs font-black">{opt.score}</span>
                    </div>
                    <span className="text-[9px] font-black uppercase tracking-widest leading-tight">{opt.label}</span>
                 </button>
               ))}
            </div>
         </div>

         <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
               <Brain size={14} className="text-indigo-500" /> Neural Consistency Check Active
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-widest">
               <ShieldCheck size={14} className="text-emerald-500" /> Secure Protocol v4
            </div>
         </div>
      </div>
    </div>
  );
};

export default PersonalityStep;
