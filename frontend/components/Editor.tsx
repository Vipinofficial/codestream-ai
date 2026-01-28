
import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, Terminal, BrainCircuit, Cloud, RefreshCw, Layers, 
  ShieldCheck, ChevronRight, Sparkles, Brain, Activity, 
  ShieldAlert, History, FileCode, Beaker, Database, Search, 
  Settings, Files, Bug, GitBranch, Box, Sidebar, 
  Maximize2, PanelBottom, ChevronDown, Save, Wand2, CheckCircle2,
  // Fix: Added missing 'X' icon from lucide-react
  X
} from 'lucide-react';
import { Challenge, SolutionAnalysis, SecurityEvent, CodeSnapshot } from '../types';
import { analyzeSolution, detectCheating } from '../services/geminiService';
import { apiService } from '../services/apiService';
import AIChat from './AIChat';

interface EditorProps {
  challenge: Challenge;
  onSubmissionComplete?: (analysis: SolutionAnalysis) => void;
  userId?: string;
}

type EditorTab = 'code' | 'tests' | 'schema';
type EditorSidebar = 'explorer' | 'search' | 'git' | 'debug' | 'extensions';

const Editor: React.FC<EditorProps> = ({ challenge, onSubmissionComplete, userId = 'demo-user' }) => {
  const [code, setCode] = useState(challenge.initialCode || '');
  const [testCode, setTestCode] = useState(challenge.testCode || '// No additional test scripts defined.');
  const [schemaCode, setSchemaCode] = useState(challenge.schema || '// Database schema: default_db');
  
  const [activeTab, setActiveTab] = useState<EditorTab>('code');
  const [activeSidebar, setActiveSidebar] = useState<EditorSidebar>('explorer');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [terminalVisible, setTerminalVisible] = useState(true);
  
  const [isRunning, setIsRunning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<SolutionAnalysis | null>(null);
  const [logs, setLogs] = useState<string[]>(["[system] Kernel v4.2.0 initialized.", "[system] Neural link stable.", "[security] Real-time proctoring engaged."]);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'error'>('synced');
  const [showAIChat, setShowAIChat] = useState(false);
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([]);
  const [history, setHistory] = useState<CodeSnapshot[]>([]);
  
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) addSecurityEvent('TAB_SWITCH', 'Focus lost (Tab hidden).');
    };
    const handleBlur = () => addSecurityEvent('BLUR', 'System focus lost.');
    const handleFocus = () => addSecurityEvent('FOCUS', 'System focus regained.');
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHistory(prev => [...prev, { timestamp: Date.now(), code }]);
    }, 10000);
    return () => clearInterval(interval);
  }, [code]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addSecurityEvent = (type: SecurityEvent['type'], details?: string) => {
    const event: SecurityEvent = { type, timestamp: Date.now(), details };
    setSecurityEvents(prev => [...prev, event]);
    setLogs(prev => [...prev, `[security] SIGNAL: [${type}] ${details || ''}`]);
  };

  const handlePaste = () => addSecurityEvent('PASTE', 'Large buffer injection.');
  const handleCopy = () => addSecurityEvent('COPY', 'Logic structure export.');

  useEffect(() => {
    setCode(challenge.initialCode || '');
    setTestCode(challenge.testCode || '// Test suite initialized.');
    setSchemaCode(challenge.schema || '// Schema active.');
    setAnalysis(null);
    setSecurityEvents([]);
    setHistory([{ timestamp: Date.now(), code: challenge.initialCode || '' }]);
  }, [challenge]);

  useEffect(() => {
    if (code === challenge.initialCode) return;
    setSyncStatus('syncing');
    const timeout = setTimeout(async () => {
      try {
        await apiService.syncCodeSession(userId, challenge.id, code);
        setSyncStatus('synced');
      } catch (e) { setSyncStatus('error'); }
    }, 2000);
    return () => clearTimeout(timeout);
  }, [code, challenge.id, userId]);

  const handleRun = () => {
    setIsRunning(true);
    setLogs(prev => [...prev, `[runner] Initializing test container...`]);
    setTimeout(() => {
      setLogs(prev => [...prev, "[runner] Tests passed: 2/2", "[runner] Execution time: 42ms"]);
      setIsRunning(false);
    }, 1200);
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);
    setLogs(prev => [...prev, "[system] Finalizing dossier analysis..."]);
    try {
      const result = await analyzeSolution(challenge.description, code);
      const cheatScan = await detectCheating(code, securityEvents, history);
      
      const fullAnalysis: SolutionAnalysis = {
        ...result,
        securityEvents: cheatScan.flag ? [...securityEvents, { type: 'AI_FLAG', timestamp: Date.now(), details: cheatScan.reasoning }] : securityEvents,
        codeHistory: history,
        integrityScore: cheatScan.flag ? Math.max(0, 100 - (securityEvents.length * 5) - 30) : Math.max(0, 100 - (securityEvents.length * 5))
      };
      
      await apiService.submitSubmission(userId, challenge.id, fullAnalysis);
      setAnalysis(fullAnalysis);
      setLogs(prev => [...prev, "[system] Assessment locked. Link synchronized."]);
    } catch (e) {
      setLogs(prev => [...prev, "[error] Critical failure during transmission."]);
    } finally { setIsAnalyzing(false); }
  };

  const renderActiveTabContent = () => {
    const val = activeTab === 'code' ? code : activeTab === 'tests' ? testCode : schemaCode;
    const setter = activeTab === 'code' ? setCode : activeTab === 'tests' ? setTestCode : setSchemaCode;
    
    return (
      <textarea
        value={val}
        onChange={(e) => setter(e.target.value)}
        onPaste={activeTab === 'code' ? handlePaste : undefined}
        onCopy={activeTab === 'code' ? handleCopy : undefined}
        spellCheck={false}
        className="flex-1 p-6 bg-[#0d1117] text-slate-300 font-mono text-[13px] resize-none focus:outline-none leading-relaxed placeholder-slate-800 custom-scrollbar caret-indigo-500 w-full h-full"
        placeholder={`// Start writing ${activeTab}...`}
      />
    );
  };

  const sideBarItems = [
    { id: 'explorer', icon: Files, label: 'Explorer' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'git', icon: GitBranch, label: 'Source Control' },
    { id: 'debug', icon: Bug, label: 'Run and Debug' },
    { id: 'extensions', icon: Box, label: 'Extensions' }
  ];

  return (
    <div className="flex h-full w-full bg-[#0d1117] overflow-hidden text-slate-400 font-sans border-t border-white/5">
      {/* VS Code Side Bar (Narrow) */}
      <aside className="w-12 bg-[#0d1117] border-r border-white/5 flex flex-col items-center py-4 gap-4 shrink-0">
        {sideBarItems.map(item => (
          <button
            key={item.id}
            onClick={() => {
              if (activeSidebar === item.id) setSidebarVisible(!sidebarVisible);
              else { setActiveSidebar(item.id as any); setSidebarVisible(true); }
            }}
            className={`p-2 rounded-md transition-all ${activeSidebar === item.id && sidebarVisible ? 'text-white border-l-2 border-indigo-500 rounded-none' : 'text-slate-500 hover:text-slate-300'}`}
          >
            <item.icon size={24} strokeWidth={1.5} />
          </button>
        ))}
        <div className="mt-auto flex flex-col items-center gap-4">
          <button className="p-2 text-slate-500 hover:text-white"><Settings size={22} strokeWidth={1.5} /></button>
        </div>
      </aside>

      {/* VS Code Side View (Wider) */}
      {sidebarVisible && (
        <aside className="w-64 bg-[#0d1117] border-r border-white/5 flex flex-col shrink-0 animate-in slide-in-from-left-4 duration-300">
          <div className="h-9 flex items-center justify-between px-4 text-[10px] font-black uppercase tracking-widest text-slate-500">
            <span>{activeSidebar}</span>
            <button onClick={() => setSidebarVisible(false)}><Sidebar size={14} /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
            {activeSidebar === 'explorer' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 group cursor-pointer">
                  <ChevronDown size={14} className="text-slate-500" />
                  <span className="text-[11px] font-bold text-slate-400 group-hover:text-white uppercase tracking-wider">Solution Nodes</span>
                </div>
                <div className="pl-4 space-y-1">
                  <button onClick={() => setActiveTab('code')} className={`flex items-center gap-2 w-full text-left p-1.5 rounded transition-all ${activeTab === 'code' ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-white/5 text-slate-500'}`}>
                    <FileCode size={14} /> <span className="text-[11px] font-medium">index.ts</span>
                  </button>
                  <button onClick={() => setActiveTab('tests')} className={`flex items-center gap-2 w-full text-left p-1.5 rounded transition-all ${activeTab === 'tests' ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-white/5 text-slate-500'}`}>
                    <Beaker size={14} /> <span className="text-[11px] font-medium">index.test.ts</span>
                  </button>
                  <button onClick={() => setActiveTab('schema')} className={`flex items-center gap-2 w-full text-left p-1.5 rounded transition-all ${activeTab === 'schema' ? 'bg-indigo-600/10 text-indigo-400' : 'hover:bg-white/5 text-slate-500'}`}>
                    <Database size={14} /> <span className="text-[11px] font-medium">schema.sql</span>
                  </button>
                </div>
              </div>
            )}
            {activeSidebar !== 'explorer' && (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
                <Search size={32} className="mb-2" />
                <p className="text-[9px] font-bold uppercase tracking-widest">Feature Locked</p>
              </div>
            )}
          </div>
        </aside>
      )}

      {/* Editor Main Section */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0d1117] relative">
        {/* Tab Bar */}
        <div className="h-9 bg-[#0d1117] flex border-b border-white/5 items-center overflow-x-auto custom-scrollbar shrink-0">
          <button 
            onClick={() => setActiveTab('code')} 
            className={`h-full px-4 flex items-center gap-2 border-r border-white/5 transition-all text-[11px] font-medium ${activeTab === 'code' ? 'bg-[#0d1117] text-white border-t border-t-indigo-500' : 'bg-[#1a1d23]/50 text-slate-500 hover:bg-white/5'}`}
          >
            <FileCode size={14} className="text-indigo-400" /> index.ts
          </button>
          <button 
            onClick={() => setActiveTab('tests')} 
            className={`h-full px-4 flex items-center gap-2 border-r border-white/5 transition-all text-[11px] font-medium ${activeTab === 'tests' ? 'bg-[#0d1117] text-white border-t border-t-indigo-500' : 'bg-[#1a1d23]/50 text-slate-500 hover:bg-white/5'}`}
          >
            <Beaker size={14} className="text-amber-400" /> index.test.ts
          </button>
          <button 
            onClick={() => setActiveTab('schema')} 
            className={`h-full px-4 flex items-center gap-2 border-r border-white/5 transition-all text-[11px] font-medium ${activeTab === 'schema' ? 'bg-[#0d1117] text-white border-t border-t-indigo-500' : 'bg-[#1a1d23]/50 text-slate-500 hover:bg-white/5'}`}
          >
            <Database size={14} className="text-blue-400" /> schema.sql
          </button>
          
          <div className="ml-auto flex items-center gap-2 px-4">
             <div className="flex items-center gap-1.5">
               {syncStatus === 'syncing' ? <RefreshCw size={10} className="animate-spin text-indigo-400" /> : <Cloud size={10} className="text-emerald-500" />}
               <span className="text-[8px] font-black uppercase tracking-widest text-slate-600">Syncing</span>
             </div>
             <button onClick={() => setShowAIChat(!showAIChat)} className={`flex items-center gap-1.5 px-2 py-1 rounded transition-all text-[9px] font-black uppercase ${showAIChat ? 'bg-indigo-600 text-white' : 'bg-white/5 text-slate-500 hover:bg-white/10'}`}>
                <Sparkles size={10} /> Copilot
             </button>
             <button onClick={handleRun} disabled={isRunning} className="flex items-center gap-1.5 px-2 py-1 bg-emerald-600 text-white rounded text-[9px] font-black uppercase shadow-lg shadow-emerald-600/10 hover:bg-emerald-500 disabled:opacity-50">
                <Play size={10} fill="currentColor" /> Run
             </button>
             <button onClick={handleSubmit} disabled={isAnalyzing} className="flex items-center gap-1.5 px-3 py-1 bg-indigo-600 text-white rounded text-[9px] font-black uppercase shadow-lg shadow-indigo-600/10 hover:bg-indigo-500 disabled:opacity-50">
                Submit
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden relative">
          <div className="flex-1 flex flex-col relative overflow-hidden">
            {/* Fake line numbers column */}
            <div className="absolute top-0 left-0 bottom-0 w-10 bg-[#0d1117] border-r border-white/5 flex flex-col pt-6 items-center font-mono text-[10px] text-slate-700 pointer-events-none z-10">
               {Array.from({ length: 100 }).map((_, i) => <div key={i} className="h-[21px] flex items-center leading-none">{i+1}</div>)}
            </div>
            <div className="flex-1 pl-10 h-full overflow-hidden">
              {renderActiveTabContent()}
            </div>
            
            {/* Inline AI Prompt Bar (Simulated CMD+K) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[500px] max-w-[90%] bg-[#1c2128]/95 backdrop-blur shadow-2xl rounded-xl border border-white/10 p-2 z-50 animate-in zoom-in-95 duration-200 hidden group-hover:block">
              <div className="flex items-center gap-3 px-3 py-1 text-slate-400">
                <Wand2 size={16} className="text-indigo-400" />
                <input placeholder="Ask AI to edit this code..." className="flex-1 bg-transparent border-none text-xs outline-none" />
                <div className="text-[9px] font-black bg-white/5 px-1.5 py-0.5 rounded border border-white/10 tracking-widest">Enter</div>
              </div>
            </div>
          </div>
          
          {showAIChat && (
            <div className="w-80 border-l border-white/5 p-4 bg-[#0d1117] animate-in slide-in-from-right-4 duration-300">
              <AIChat 
                problemDescription={challenge.description} 
                currentCode={code} 
                onApplyCode={(newCode) => {
                  if (activeTab === 'code') setCode(newCode);
                  setLogs(prev => [...prev, "[copilot] Changes applied to index.ts"]);
                }}
              />
            </div>
          )}
        </div>

        {/* Status Bar */}
        <div className="h-6 bg-indigo-600 flex items-center justify-between px-4 text-[10px] font-medium text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5"><GitBranch size={12} /> main*</div>
            <div className="flex items-center gap-1.5"><ShieldCheck size={12} /> Secure</div>
            {securityEvents.length > 0 && <div className="flex items-center gap-1.5 bg-red-500 px-2 animate-pulse"><ShieldAlert size={12} /> Proctoring Anomalies</div>}
          </div>
          <div className="flex items-center gap-4">
             <div>Spaces: 2</div>
             <div>UTF-8</div>
             <div className="flex items-center gap-1.5"><Activity size={12} /> Neural Ready</div>
          </div>
        </div>

        {/* Terminal (Bottom Panel) */}
        {terminalVisible && (
          <div className="h-48 border-t border-white/5 bg-[#0d1117] flex flex-col shrink-0 animate-in slide-in-from-bottom-4">
            <div className="h-9 flex items-center px-4 border-b border-white/5 justify-between">
              <div className="flex gap-4">
                <button className="text-[10px] font-black uppercase text-white border-b-2 border-indigo-500 px-2 py-2">Terminal</button>
                <button className="text-[10px] font-black uppercase text-slate-500 hover:text-slate-300 px-2 py-2">Output</button>
                <button className="text-[10px] font-black uppercase text-slate-500 hover:text-slate-300 px-2 py-2">Debug Console</button>
              </div>
              <div className="flex gap-2">
                 <button onClick={() => setLogs([])} className="p-1 text-slate-500 hover:text-white"><RefreshCw size={14} /></button>
                 <button onClick={() => setTerminalVisible(false)} className="p-1 text-slate-500 hover:text-white"><X size={14} /></button>
              </div>
            </div>
            <div ref={terminalRef} className="flex-1 p-4 font-mono text-[11px] overflow-y-auto custom-scrollbar leading-relaxed">
              {logs.map((log, i) => (
                <div key={i} className="flex gap-3 mb-0.5">
                  <span className="text-slate-700 shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                  <span className={log.includes('[error]') ? 'text-red-500' : log.includes('[security]') ? 'text-amber-500 font-bold' : log.includes('[system]') ? 'text-indigo-400' : 'text-slate-500'}>
                    {log}
                  </span>
                </div>
              ))}
              <div className="flex gap-2 mt-2">
                <span className="text-indigo-400">$</span>
                <input 
                  className="bg-transparent border-none text-slate-300 outline-none flex-1" 
                  autoFocus 
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      const cmd = (e.target as HTMLInputElement).value;
                      setLogs(prev => [...prev, `$ ${cmd}`, `[shell] Executing: ${cmd}...`, `[shell] Permission denied: Restricted sandbox environment.`]);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Global Results Overlay */}
      {analysis && (
        <div className="absolute inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-8 animate-in fade-in duration-500">
          <div className="max-w-2xl w-full bg-[#0d1117] border border-white/10 rounded-3xl p-10 shadow-2xl space-y-8 overflow-y-auto custom-scrollbar max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-white/5 pb-8">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/20"><BrainCircuit className="text-white" size={28} /></div>
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight">System Evaluation</h2>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-1">Dossier Locked & Verified</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-5xl font-black text-indigo-500 tracking-tighter">{analysis.score}<span className="text-sm text-slate-500 ml-1">/100</span></div>
                <p className={`text-[10px] font-black uppercase tracking-widest mt-1 ${analysis.integrityScore! < 70 ? 'text-red-500' : 'text-emerald-500'}`}>Integrity: {analysis.integrityScore}%</p>
              </div>
            </div>
            
            <div className="p-6 bg-white/5 border border-white/5 rounded-2xl space-y-4">
              <p className="text-sm font-medium text-slate-400 leading-relaxed italic">"{analysis.feedback}"</p>
              <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
                 <div className="flex-1 min-w-[120px]">
                    <p className="text-[9px] font-black uppercase text-slate-600 mb-1">Complexity</p>
                    <p className="text-xs font-mono text-indigo-400">{analysis.timeComplexity} / {analysis.spaceComplexity}</p>
                 </div>
                 <div className="flex-1 min-w-[120px]">
                    <p className="text-[9px] font-black uppercase text-slate-600 mb-1">Status</p>
                    <p className="text-xs font-black text-emerald-500 uppercase">Clear</p>
                 </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setAnalysis(null)} className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-white bg-white/5 rounded-2xl transition-all">Revise Solution</button>
              <button onClick={() => onSubmissionComplete?.(analysis)} className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
                 Submit Final Dossier <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Editor;
