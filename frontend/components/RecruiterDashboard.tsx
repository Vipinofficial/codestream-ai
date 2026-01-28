
import React, { useState, useRef, useEffect } from 'react';
import { 
  Users, FileCheck, ShieldAlert, Award, Search, Sparkles, Wand2, Plus, 
  Clock, Video, Code, Monitor, Radio, Activity, MoreVertical, X, 
  BrainCircuit, ShieldCheck, CheckCircle2, Zap, AlertTriangle, Shield, UserCheck, History, Play, Pause, ChevronLeft, ChevronRight, MessageSquare,
  PenTool, Brain, Save, Settings, Info, Timer, Briefcase, ChevronDown, ListChecks, Lock, Eye, Share2, Trash2, Sliders, Target, FileText,
  Database, Layout, Fingerprint, Percent, Dna, Rocket, AlertCircle, RefreshCw, Terminal
} from 'lucide-react';
import { generateChallengeFromJD, generateMCQs } from '../services/geminiService';
import { Challenge, ChallengeType, MCQ, CodeSnapshot } from '../types';
import ExportButton from './ExportButton';

interface RecruiterDashboardProps {
  onAddChallenge?: (challenge: Challenge) => void;
}

const MOCK_RESULTS = [
  { id: '1', name: 'John Doe', score: 92, status: 'Clear', integrity: '100%', date: '2024-05-15', email: 'john@example.com', active: true, feedback: "Exceptional mastery of data structures." },
  { id: '2', name: 'Sarah Chen', score: 88, status: 'Clear', integrity: '98%', date: '2024-05-14', email: 'sarah.c@tech.co', active: true, feedback: "Solid coding fundamentals." },
  { id: '3', name: 'Mike Ross', score: 45, status: 'Flagged', integrity: '42%', date: '2024-05-14', email: 'mross@suits.com', active: false, feedback: "Suspicious activity detected." },
];

const RecruiterDashboard: React.FC<RecruiterDashboardProps> = ({ onAddChallenge }) => {
  const [activeTab, setActiveTab] = useState<'submissions' | 'live' | 'forge' | 'generator'>('submissions');
  const [reviewCandidate, setReviewCandidate] = useState<any>(null);
  
  // Advanced Forge State
  const [forgeStep, setForgeStep] = useState(1);
  const [isForging, setIsForging] = useState(false);
  const [aiGenCount, setAiGenCount] = useState(5);
  const [forgeData, setForgeData] = useState<Challenge>({
    id: '',
    title: '',
    type: ChallengeType.THEORY,
    difficulty: 'Medium',
    category: 'Backend',
    description: '',
    jobRole: 'Software Engineer',
    experienceLevel: 'Mid',
    timeLimit: 30,
    mcqs: [],
    config: {
      negativeMarking: false,
      randomizeQuestions: true,
      randomizeOptions: true,
      passingScore: 70,
      marksPerQuestion: 1,
      difficultyDistribution: { easy: 30, medium: 50, hard: 20 },
      antiCheat: {
        tabSwitchDetection: true,
        copyPasteRestriction: true,
        proctoringRequired: true,
        webcamVerification: true,
        timePerQuestion: 0
      }
    }
  });

  const [customMCQ, setCustomMCQ] = useState<MCQ>({
    id: '', question: '', options: ['', '', '', ''], correctAnswer: 0, difficulty: 'Medium', skillTag: ''
  });

  const steps = [
    { id: 1, label: 'Mission Overview', icon: FileText, desc: 'Core Dossier' },
    { id: 2, label: 'Game Rules', icon: Sliders, desc: 'Logic Matrix' },
    { id: 3, label: 'Intelligence Bank', icon: Database, desc: 'Node Retrieval' },
    { id: 4, label: 'Neural Design', icon: Plus, desc: 'Custom Units' },
    { id: 5, label: 'Evaluation', icon: Target, desc: 'Judgment Logic' },
    { id: 6, label: 'Trust Layer', icon: Lock, desc: 'Security protocols' },
    { id: 7, label: 'Simulation', icon: Eye, desc: 'Quality Control' },
    { id: 8, label: 'Launch', icon: Rocket, desc: 'Link Deployment' },
  ];

  const handleAddMCQ = () => {
    if (!customMCQ.question) return;
    setForgeData(prev => ({
      ...prev,
      mcqs: [...(prev.mcqs || []), { ...customMCQ, id: `q-${Date.now()}` }]
    }));
    setCustomMCQ({ id: '', question: '', options: ['', '', '', ''], correctAnswer: 0, difficulty: 'Medium', skillTag: '' });
  };

  const handleAIForgeQuestions = async (count: number = 5) => {
    setIsForging(true);
    try {
      const generated = await generateMCQs(forgeData.jobRole!, forgeData.experienceLevel!, forgeData.category, count);
      setForgeData(prev => ({ ...prev, mcqs: [...(prev.mcqs || []), ...generated] }));
    } catch (e) { 
      console.error(e); 
    } finally { 
      setIsForging(false); 
    }
  };

  const validateStep = (step: number) => {
    if (step === 1 && !forgeData.title) return false;
    if (step === 3 && (forgeData.mcqs?.length || 0) < 1) return false;
    return true;
  };

  const removeMCQ = (id: string) => {
    setForgeData(prev => ({
      ...prev,
      mcqs: prev.mcqs?.filter(q => q.id !== id)
    }));
  };

  const renderForgeStep = () => {
    switch (forgeStep) {
      case 1: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-600/20 text-white"><FileText size={32} /></div>
            <div>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Mission Dossier</h3>
               <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">Step 01: Core Identification</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2 col-span-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Test Designation</label>
               <input 
                 type="text" value={forgeData.title} onChange={e => setForgeData({...forgeData, title: e.target.value})}
                 placeholder="e.g., Senior Systems Architect - Phase II"
                 className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl py-4 px-6 text-sm font-medium focus:border-indigo-500 outline-none transition-all"
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Job Role</label>
               <input 
                 type="text" value={forgeData.jobRole} onChange={e => setForgeData({...forgeData, jobRole: e.target.value})}
                 className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl py-4 px-6 text-sm font-medium focus:border-indigo-500 outline-none transition-all"
               />
            </div>
            <div className="space-y-2">
               <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Clearance Level</label>
               <select 
                 value={forgeData.experienceLevel} onChange={e => setForgeData({...forgeData, experienceLevel: e.target.value})}
                 className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl py-4 px-6 text-sm font-medium focus:border-indigo-500 outline-none transition-all appearance-none"
               >
                 <option>Fresher</option><option>Mid</option><option>Senior</option><option>Lead</option><option>Elite</option>
               </select>
            </div>
          </div>
          <div className="space-y-2">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Mission Objective (Description)</label>
             <textarea 
               value={forgeData.description} onChange={e => setForgeData({...forgeData, description: e.target.value})}
               rows={4} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl py-4 px-6 text-sm font-medium focus:border-indigo-500 outline-none transition-all resize-none"
               placeholder="Describe the technical expectations for the candidate..."
             />
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
           <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-600/20 text-white"><Sliders size={32} /></div>
            <div>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">The Logic Matrix</h3>
               <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">Step 02: Rule Configuration</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem] space-y-6">
                <h4 className="text-xs font-black uppercase text-indigo-500 tracking-widest">Difficulty Distribution</h4>
                {['easy', 'medium', 'hard'].map(level => (
                  <div key={level} className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase text-slate-500">
                      <span>{level} Nodes</span>
                      <span>{(forgeData.config?.difficultyDistribution as any)[level]}%</span>
                    </div>
                    <input 
                      type="range" min="0" max="100" 
                      value={(forgeData.config?.difficultyDistribution as any)[level]} 
                      onChange={e => {
                        const val = parseInt(e.target.value);
                        setForgeData({
                          ...forgeData, 
                          config: {
                            ...forgeData.config, 
                            difficultyDistribution: { ...forgeData.config?.difficultyDistribution!, [level]: val }
                          }
                        });
                      }}
                      className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600" 
                    />
                  </div>
                ))}
                <div className="pt-4 flex items-center gap-2">
                   <div className={`p-1.5 rounded-full ${(Object.values(forgeData.config?.difficultyDistribution!) as number[]).reduce((a,b)=>a+b,0) === 100 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'}`}>
                      <Info size={12} />
                   </div>
                   <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">Total weight must equal 100%</span>
                </div>
             </div>
             <div className="space-y-4">
                {[
                  { id: 'negativeMarking', label: 'Negative Marking', icon: Target, desc: 'Incorrect answers deduct points' },
                  { id: 'randomizeQuestions', label: 'Shuffle Units', icon: Zap, desc: 'Randomize question order' },
                  { id: 'randomizeOptions', label: 'Shuffle Options', icon: ListChecks, desc: 'Randomize A-D options' },
                ].map(item => (
                  <div key={item.id} className="flex items-center justify-between p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-3xl group hover:border-indigo-500 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all"><item.icon size={18}/></div>
                        <div>
                           <p className="text-xs font-black uppercase text-slate-800 dark:text-slate-100">{item.label}</p>
                           <p className="text-[9px] font-medium text-slate-500">{item.desc}</p>
                        </div>
                     </div>
                     <button 
                       onClick={() => setForgeData({...forgeData, config: {...forgeData.config, [item.id]: !(forgeData.config as any)[item.id]}})}
                       className={`w-12 h-6 rounded-full p-1 transition-all ${(forgeData.config as any)[item.id] ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}
                     >
                        <div className={`w-4 h-4 bg-white rounded-full transition-all ${(forgeData.config as any)[item.id] ? 'translate-x-6' : 'translate-x-0'}`} />
                     </button>
                  </div>
                ))}
             </div>
          </div>
        </div>
      );
      case 3: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-600/20 text-white"><Database size={32} /></div>
            <div>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Intelligence Bank</h3>
               <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">Step 03: Knowledge Retrieval</p>
            </div>
          </div>
          <div className="p-12 border-2 border-dashed border-slate-200 dark:border-white/5 rounded-[3.5rem] text-center space-y-8">
             <div className="max-w-md mx-auto space-y-4">
                <Brain size={64} className="mx-auto text-indigo-500 animate-pulse" />
                <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">AI Neural Search</h4>
                <p className="text-sm font-medium text-slate-500 leading-relaxed italic">Synthesizing role requirements... Platform Bank contains 12,000+ technical units aligned with "{forgeData.jobRole}".</p>
             </div>
             <div className="flex justify-center gap-4">
                <button 
                  onClick={() => handleAIForgeQuestions(5)} disabled={isForging}
                  className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                   {isForging ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
                   {isForging ? 'Synthesizing...' : 'Populate with AI Suggestion'}
                </button>
             </div>
          </div>
          <div className="space-y-4">
             <div className="flex justify-between items-center px-4">
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Active Units: {forgeData.mcqs?.length || 0}</span>
                <button onClick={() => setForgeData({...forgeData, mcqs: []})} className="text-[9px] font-black uppercase text-red-500 hover:underline">Flush Buffer</button>
             </div>
             <div className="grid grid-cols-1 gap-3">
                {forgeData.mcqs?.map((q, i) => (
                  <div key={q.id} className="p-6 bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/5 rounded-2xl flex items-start gap-4 group">
                     <span className="w-8 h-8 bg-indigo-600/10 text-indigo-500 rounded-lg flex items-center justify-center text-[10px] font-black shrink-0">{i+1}</span>
                     <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-4">{q.question}</p>
                        <div className="grid grid-cols-2 gap-2">
                           {q.options.map((opt, idx) => (
                             <div key={idx} className={`p-2 rounded-lg text-[9px] font-black uppercase border ${idx === q.correctAnswer ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-slate-50 dark:bg-white/5 border-transparent text-slate-500'}`}>
                                {opt}
                             </div>
                           ))}
                        </div>
                     </div>
                     <button onClick={() => removeMCQ(q.id)} className="p-2 opacity-0 group-hover:opacity-100 text-slate-400 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                  </div>
                ))}
             </div>
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-12 animate-in fade-in slide-in-from-right-4">
           <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-600/20 text-white"><Plus size={32} /></div>
            <div>
               <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Neural Design</h3>
               <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">Step 04: Advanced Unit Forge</p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <PenTool size={16} className="text-indigo-500" />
                <h4 className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 tracking-widest">Manual Node Entry</h4>
              </div>
              <div className="space-y-4 bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 p-8 rounded-[2.5rem]">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest ml-1">Question Statement</label>
                  <textarea 
                    value={customMCQ.question} onChange={e => setCustomMCQ({...customMCQ, question: e.target.value})}
                    rows={3} className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl py-3 px-4 text-xs font-medium focus:border-indigo-500 outline-none transition-all resize-none"
                    placeholder="Enter technical question logic..."
                  />
                </div>
                <div className="grid grid-cols-1 gap-3">
                   {customMCQ.options.map((opt, i) => (
                     <div key={i} className="flex items-center gap-3">
                       <button 
                         onClick={() => setCustomMCQ({...customMCQ, correctAnswer: i})}
                         className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-black transition-all ${customMCQ.correctAnswer === i ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 text-slate-500 hover:text-indigo-400'}`}
                       >
                         {String.fromCharCode(65 + i)}
                       </button>
                       <input 
                         type="text" value={opt} onChange={e => {
                           const newOpts = [...customMCQ.options];
                           newOpts[i] = e.target.value;
                           setCustomMCQ({...customMCQ, options: newOpts});
                         }}
                         placeholder={`Option ${String.fromCharCode(65 + i)}`}
                         className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-xl py-2.5 px-4 text-xs font-medium focus:border-indigo-500 outline-none transition-all"
                       />
                     </div>
                   ))}
                </div>
                <button 
                  onClick={handleAddMCQ}
                  disabled={!customMCQ.question || customMCQ.options.some(o => !o)}
                  className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-600/20 hover:bg-indigo-500 active:scale-95 disabled:opacity-30 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <Save size={14} /> Commit to Protocol
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-indigo-500" />
                <h4 className="text-xs font-black uppercase text-slate-800 dark:text-slate-200 tracking-widest">AI Intelligence Synthesis</h4>
              </div>
              <div className="bg-indigo-600/5 border border-indigo-600/10 p-10 rounded-[2.5rem] flex flex-col justify-center items-center text-center space-y-6">
                <div className="p-4 bg-indigo-600 rounded-2xl text-white shadow-xl">
                  <BrainCircuit size={32} />
                </div>
                <div className="space-y-2">
                  <h5 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Bulk Node Generation</h5>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-xs">
                    Synthesize multiple MCQs instantly tailored to <span className="text-indigo-500 font-bold">{forgeData.jobRole}</span> and <span className="text-indigo-500 font-bold">{forgeData.category}</span> requirements.
                  </p>
                </div>
                
                <div className="w-full max-w-[200px] space-y-2">
                  <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 mb-1">
                    <span>Node Count</span>
                    <span>{aiGenCount} Questions</span>
                  </div>
                  <input 
                    type="range" min="1" max="15" value={aiGenCount} 
                    onChange={e => setAiGenCount(parseInt(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none accent-indigo-600 cursor-pointer"
                  />
                </div>

                <button 
                  onClick={() => handleAIForgeQuestions(aiGenCount)}
                  disabled={isForging}
                  className="w-full py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-600/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isForging ? <RefreshCw className="animate-spin" size={18} /> : <Wand2 size={18} />}
                  {isForging ? 'Synthesizing...' : `Generate ${aiGenCount} Logic Units`}
                </button>
              </div>
              
              <div className="bg-slate-50 dark:bg-white/[0.01] border border-slate-200 dark:border-white/5 p-6 rounded-3xl">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <ListChecks size={16} className="text-emerald-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Verification Queue</span>
                   </div>
                   <span className="text-xs font-black text-indigo-500">{forgeData.mcqs?.length} Nodes Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      case 7: return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-indigo-600 rounded-3xl shadow-xl shadow-indigo-600/20 text-white"><Eye size={32} /></div>
                <div>
                   <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Mission Simulation</h3>
                   <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">Step 07: Quality Verification</p>
                </div>
              </div>
           </div>
           <div className="bg-slate-900 rounded-[3rem] p-12 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10"><Terminal size={120} className="text-indigo-500" /></div>
              <div className="relative z-10 max-w-2xl mx-auto space-y-10">
                 <div className="space-y-4 text-center">
                    <h4 className="text-4xl font-black text-white tracking-tighter">{forgeData.title}</h4>
                    <div className="flex items-center justify-center gap-6">
                       <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest"><Timer size={14} className="text-indigo-500" /> {forgeData.timeLimit} Minutes</div>
                       <div className="flex items-center gap-2 text-slate-400 font-bold uppercase text-[10px] tracking-widest"><ListChecks size={14} className="text-indigo-500" /> {forgeData.mcqs?.length} Units</div>
                    </div>
                 </div>
                 <div className="p-8 bg-white/5 border border-white/10 rounded-3xl text-slate-400 text-sm italic leading-relaxed">
                    "{forgeData.description}"
                 </div>
                 <button className="w-full py-6 bg-indigo-600 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:scale-[1.02] transition-all">Start Simulation</button>
              </div>
           </div>
        </div>
      );
      case 8: return (
        <div className="flex flex-col items-center justify-center text-center space-y-8 py-20 animate-in zoom-in-95 duration-500">
           <div className="w-32 h-32 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-emerald-600/30 animate-bounce">
              <Rocket size={64} />
           </div>
           <div className="space-y-2">
              <h3 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Ready for Launch</h3>
              <p className="text-slate-500 font-medium text-lg">Mission Node "{forgeData.title}" is verified and synchronized.</p>
           </div>
           <div className="flex gap-4">
              <button onClick={() => setActiveTab('submissions')} className="px-12 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-slate-50 dark:hover:bg-white/5 transition-all">Save as Draft</button>
              <button 
                onClick={() => {
                  onAddChallenge?.({...forgeData, id: `c-${Date.now()}`});
                  setActiveTab('submissions');
                }}
                className="px-16 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all"
              >Deploy Mission Node</button>
           </div>
        </div>
      );
      default: return (
        <div className="h-96 flex flex-col items-center justify-center text-slate-500 italic uppercase font-black text-xs tracking-widest opacity-20 space-y-4">
           <div className="p-4 bg-slate-900 rounded-2xl">
             <Terminal size={48} />
           </div>
           <p>Module Step {forgeStep} Under Configuration</p>
        </div>
      );
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-[1600px] mx-auto animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8 mb-12">
        <div className="space-y-2">
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">Mission Control</h2>
          <p className="text-slate-500 text-xl font-medium">Tactical intelligence for elite assessment engineering.</p>
        </div>
        
        <div className="flex bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-[2rem] shadow-xl shrink-0">
          {[
            { id: 'submissions', label: 'Pipeline', icon: Users },
            { id: 'live', label: 'Live Intel', icon: Radio },
            { id: 'forge', label: 'Test Creator', icon: PenTool },
            { id: 'generator', label: 'JD Synth', icon: Sparkles }
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => {
                 setActiveTab(tab.id as any);
                 if (tab.id !== 'forge') setForgeStep(1);
              }}
              className={`flex items-center gap-3 px-8 py-4 text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] transition-all outline-none ${
                activeTab === tab.id 
                  ? 'bg-indigo-600 text-white shadow-xl' 
                  : 'text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <tab.icon size={16} /> {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'forge' && (
        <div className="mb-10 animate-in fade-in slide-in-from-left-4 duration-500">
           <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-slate-100 dark:bg-white/5 p-4 rounded-2xl border border-slate-200 dark:border-white/5 w-fit shadow-sm">
              <button onClick={() => setActiveTab('submissions')} className="hover:text-indigo-500 transition-colors">Command</button>
              <ChevronRight size={12} className="text-slate-700" />
              <button onClick={() => setForgeStep(1)} className="hover:text-indigo-500 transition-colors text-indigo-500">Intelligence Forge</button>
              <ChevronRight size={12} className="text-slate-700" />
              <span className="text-slate-300 dark:text-white">{steps.find(s => s.id === forgeStep)?.label}</span>
           </div>
        </div>
      )}

      {activeTab === 'forge' ? (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 animate-in slide-in-from-bottom-8 duration-700">
           <aside className="xl:col-span-3 space-y-6">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 p-8 rounded-[3rem] shadow-2xl">
                 <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 mb-8">Mission Status</h4>
                 <div className="space-y-2">
                    {steps.map(step => (
                      <button 
                        key={step.id}
                        disabled={step.id > forgeStep && !validateStep(forgeStep)}
                        onClick={() => setForgeStep(step.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                          forgeStep === step.id ? 'bg-indigo-600/10 text-indigo-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                        }`}
                      >
                         <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                            forgeStep === step.id ? 'bg-indigo-600 text-white' : 
                            step.id < forgeStep ? 'bg-emerald-500 text-white' : 'bg-slate-100 dark:bg-white/5'
                         }`}>
                            {step.id < forgeStep ? <CheckCircle2 size={16} /> : <step.icon size={16} />}
                         </div>
                         <div className="text-left">
                            <p className="text-[10px] font-black uppercase tracking-widest leading-none">{step.label}</p>
                            <p className="text-[8px] font-bold text-slate-500 mt-1">{step.desc}</p>
                         </div>
                      </button>
                    ))}
                 </div>
              </div>

              <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
                 <Dna className="absolute -bottom-6 -right-6 text-white/10 w-32 h-32 rotate-12 transition-transform group-hover:scale-110" />
                 <h4 className="text-sm font-black uppercase tracking-widest mb-2">Neural Synergy</h4>
                 <p className="text-indigo-100 text-[10px] font-medium leading-relaxed mb-6">AI calculates a 84% reliability score for this current test configuration.</p>
                 <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-4/5 shadow-[0_0_8px_#fff]" />
                 </div>
              </div>
           </aside>

           <main className="xl:col-span-9 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-[4rem] p-12 lg:p-16 shadow-3xl min-h-[700px] flex flex-col relative">
              <div className="flex-1">
                 {renderForgeStep()}
              </div>

              <div className="mt-16 pt-10 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                 <button 
                   onClick={() => setForgeStep(s => Math.max(1, s - 1))}
                   disabled={forgeStep === 1}
                   className="flex items-center gap-3 px-8 py-4 text-slate-500 font-black uppercase tracking-widest text-[10px] hover:text-slate-900 dark:hover:text-white transition-all disabled:opacity-0"
                 >
                    <ChevronLeft size={16} /> Previous Link
                 </button>
                 {forgeStep < 8 && (
                   <button 
                     onClick={() => setForgeStep(s => s + 1)}
                     disabled={!validateStep(forgeStep)}
                     className="flex items-center gap-3 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-30"
                   >
                      Continue Protocol <ChevronRight size={16} />
                   </button>
                 )}
              </div>
           </main>
        </div>
      ) : (
        <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {[
                { icon: Users, label: 'Candidate Pulse', value: '142', color: 'indigo', detail: '+12 this week' },
                { icon: FileCheck, label: 'Quality Pass', value: '89', color: 'green', detail: '82% avg score' },
                { icon: AlertTriangle, label: 'Integrity Flags', value: '12', color: 'red', detail: '3 high priority' },
                { icon: Zap, label: 'AI Synth Active', value: 'Live', color: 'yellow', detail: 'Node: US-EAST' },
              ].map((stat, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-10 rounded-[3rem] group hover:border-indigo-500/30 transition-all shadow-sm">
                  <div className={`p-4 rounded-2xl w-fit mb-6 bg-${stat.color}-500/10 text-${stat.color}-500 transition-transform`}>
                    <stat.icon size={32} />
                  </div>
                  <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</p>
                    <p className="text-xs font-bold text-slate-400">{stat.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[3.5rem] overflow-hidden shadow-2xl backdrop-blur-3xl">
              <div className="p-10 border-b border-slate-200 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">Active Pipeline</h3>
                <div className="flex items-center gap-4">
                  <ExportButton data={MOCK_RESULTS} type="teacher" label="Aggregate Stats" />
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Search candidates..." className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl py-3.5 pl-12 pr-6 text-xs text-slate-500 outline-none min-w-[300px]" />
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                      <th className="px-10 py-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Identity</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">AI Rating</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">Security</th>
                      <th className="px-10 py-6 text-[10px] font-black text-slate-600 uppercase tracking-[0.3em] text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800/50">
                    {MOCK_RESULTS.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/20 transition-all group">
                        <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-black text-lg">{res.name.charAt(0)}</div>
                            <div>
                              <p className="font-black text-slate-900 dark:text-white text-lg tracking-tight">{res.name}</p>
                              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{res.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-10 py-8 text-xl font-black font-mono">{res.score}%</td>
                        <td className="px-10 py-8">
                          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                            res.status === 'Clear' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                          }`}>
                            {res.status === 'Clear' ? <ShieldCheck size={12} /> : <AlertTriangle size={12} />}
                            {res.status}
                          </div>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button 
                            onClick={() => setReviewCandidate(res)}
                            className="px-8 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all"
                          >Analyze</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
        </div>
      )}

      {reviewCandidate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-12 bg-slate-950/95 backdrop-blur-3xl animate-in fade-in">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 w-full max-w-6xl h-[90vh] rounded-[4rem] shadow-2xl flex flex-col relative overflow-hidden">
              <button onClick={() => setReviewCandidate(null)} className="absolute top-8 right-8 p-4 text-slate-400 hover:text-red-500"><X size={32}/></button>
              <div className="p-12 border-b border-slate-100 dark:border-white/5">
                 <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">Candidate Intel Dossier</h3>
                 <p className="text-slate-500 font-medium uppercase tracking-[0.4em] text-[10px] mt-1">{reviewCandidate.name} / {reviewCandidate.email}</p>
              </div>
              <div className="flex-1 overflow-y-auto p-12 space-y-12 custom-scrollbar">
                 <div className="grid grid-cols-3 gap-8">
                    <div className="p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2.5rem] text-center">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Final Logic Score</p>
                       <p className="text-6xl font-black text-indigo-500 tracking-tighter">{reviewCandidate.score}%</p>
                    </div>
                    <div className="p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2.5rem] text-center">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Integrity Signal</p>
                       <p className="text-6xl font-black text-emerald-500 tracking-tighter">{reviewCandidate.integrity}</p>
                    </div>
                    <div className="p-8 bg-slate-50 dark:bg-white/[0.02] border border-slate-100 dark:border-white/5 rounded-[2.5rem] text-center">
                       <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-2">Identity Match</p>
                       <p className="text-6xl font-black text-indigo-500 tracking-tighter">94%</p>
                    </div>
                 </div>
                 <div className="space-y-6">
                    <h4 className="text-lg font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
                       <Sparkles size={20} className="text-indigo-500" /> AI Performance Summary
                    </h4>
                    <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium italic">"{reviewCandidate.feedback}"</p>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default RecruiterDashboard;
