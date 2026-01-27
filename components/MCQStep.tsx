
import React, { useState, useEffect } from 'react';
import { MCQ } from '../types';
import { HelpCircle, CheckCircle2, ArrowRight, Brain, Zap, Clock, ShieldCheck } from 'lucide-react';

interface MCQStepProps {
  questions: MCQ[];
  onComplete: (answers: Record<string, number>) => void;
}

const MCQStep: React.FC<MCQStepProps> = ({ questions, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentQ = questions[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning || !currentQ) return;
      const num = parseInt(e.key);
      if (num >= 1 && num <= 4 && currentQ.options[num - 1]) {
        handleOptionSelect(num - 1);
      }
      if (e.key === 'Enter' && answers[currentQ.id] !== undefined) {
        handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, answers, isTransitioning, currentQ]);

  const handleOptionSelect = (idx: number) => {
    if (!currentQ) return;
    setAnswers(prev => ({
      ...prev,
      [currentQ.id]: idx
    }));
  };

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setIsTransitioning(false);
      } else {
        onComplete(answers);
      }
    }, 400);
  };

  if (!currentQ) return (
    <div className="flex flex-col items-center justify-center h-64 text-slate-500">
      <Brain className="animate-pulse mb-4" size={48} />
      <p className="font-black uppercase tracking-widest text-xs">Initializing Nodes...</p>
    </div>
  );

  return (
    <div 
      className={`w-full max-w-5xl mx-auto py-8 lg:py-16 px-4 sm:px-6 lg:px-12 transition-all duration-500 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
      role="region"
      aria-label={`Question ${currentIndex + 1} of ${questions.length}`}
    >
      <div className="mb-8 lg:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Brain size={12} aria-hidden="true" /> Theory Sprint
          </div>
          <h2 className="text-3xl lg:text-5xl font-black tracking-tighter text-slate-900 dark:text-white">Knowledge Validation</h2>
        </div>
        <div className="flex flex-col items-end gap-2" aria-hidden="true">
          <span className="text-[10px] font-black uppercase text-slate-500">Node {currentIndex + 1} / {questions.length}</span>
          <div className="w-40 lg:w-48 h-1.5 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
            <div 
              className="h-full bg-indigo-600 transition-all duration-700" 
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-8 lg:p-12 shadow-xl">
            <div className="flex gap-4 lg:gap-6 mb-8">
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center shrink-0" aria-hidden="true">
                <Zap size={20} />
              </div>
              <p id="mcq-question" className="text-lg lg:text-2xl font-medium leading-relaxed text-slate-800 dark:text-slate-200">
                {currentQ.question}
              </p>
            </div>

            <div 
              role="radiogroup" 
              aria-labelledby="mcq-question"
              className="space-y-3"
            >
              {currentQ.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  role="radio"
                  aria-checked={answers[currentQ.id] === idx}
                  className={`w-full text-left p-4 lg:p-6 rounded-2xl border-2 transition-all flex items-center justify-between group focus-visible:ring-4 focus-visible:ring-indigo-500 focus-visible:outline-none ${
                    answers[currentQ.id] === idx 
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-indigo-500/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border transition-all ${
                      answers[currentQ.id] === idx ? 'bg-white/20 border-white/30 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-bold text-sm lg:text-base">{option}</span>
                  </div>
                  {answers[currentQ.id] === idx && <CheckCircle2 size={20} className="text-white animate-in zoom-in-50" />}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck size={12} aria-hidden="true" /> AI Telemetry Active
              </span>
              <button
                onClick={handleNext}
                disabled={answers[currentQ.id] === undefined || isTransitioning}
                aria-label={currentIndex === questions.length - 1 ? "Submit assessment" : "Go to next question"}
                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase text-[10px] shadow-lg disabled:bg-slate-200 dark:disabled:bg-slate-800 disabled:text-slate-400 dark:disabled:text-slate-600 active:scale-95 transition-all focus-visible:ring-4 focus-visible:ring-indigo-500 focus-visible:outline-none"
              >
                {currentIndex === questions.length - 1 ? 'Analyze Result' : 'Next Signal'}
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 hidden lg:block">
           <div className="p-8 bg-indigo-600/5 border border-indigo-500/10 rounded-[2.5rem]">
              <h4 className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-4">Focus Context</h4>
              <p className="text-xs text-slate-500 leading-relaxed">Intelligence analysis monitors response time and pattern stability to ensure logic consistency.</p>
           </div>
           <div className="p-8 bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] flex items-center gap-4">
              <ShieldCheck className="text-indigo-600" size={24} aria-hidden="true" />
              <div>
                <p className="text-xs font-black uppercase text-slate-800 dark:text-slate-200">Secure Handshake</p>
                <p className="text-[9px] text-slate-500 uppercase">Protocol: SSL/TLS</p>
              </div>
           </div>
        </div>
      </div>
      
      {/* Screen Reader Status Announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        Question {currentIndex + 1} of {questions.length} loaded. 
        {answers[currentQ.id] !== undefined ? `You have selected option ${String.fromCharCode(65 + answers[currentQ.id])}` : 'No option selected.'}
      </div>
    </div>
  );
};

export default MCQStep;
