
import React, { useState } from 'react';
import { Challenge } from '../types';
import { 
  FileCode, FileJson, Folder, ChevronRight, ChevronDown, 
  Terminal, Play, Github, Save, Settings, Search, LayoutList, Layers, Activity
} from 'lucide-react';

interface ProjectWorkspaceProps {
  challenge: Challenge;
}

const ProjectWorkspace: React.FC<ProjectWorkspaceProps> = ({ challenge }) => {
  const [activeFile, setActiveFile] = useState('App.tsx');
  const [isFolderOpen, setIsFolderOpen] = useState(true);

  // Simulated file structure based on challenge metadata or defaults
  const files = challenge.files || {
    'App.tsx': 'import React from "react";\n\nexport default function App() {\n  return <h1>Project Loaded</h1>;\n}',
    'utils.ts': 'export const helper = () => true;',
    'styles.css': 'body { background: #000; color: #fff; }',
    'package.json': '{\n  "name": "take-home-project",\n  "version": "1.0.0"\n}'
  };

  return (
    <div className="flex h-full w-full bg-[#020617] overflow-hidden">
      {/* File Tree Sidebar */}
      <aside className="w-72 bg-[#0D1117] border-r border-white/5 flex flex-col shrink-0">
         <div className="h-12 border-b border-white/5 flex items-center px-6">
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500">Explorer.sys</span>
         </div>
         
         <div className="flex-1 p-4">
            <div 
              onClick={() => setIsFolderOpen(!isFolderOpen)}
              className="flex items-center gap-2 p-2 hover:bg-white/5 rounded-lg cursor-pointer group"
            >
               {isFolderOpen ? <ChevronDown size={14} className="text-slate-500" /> : <ChevronRight size={14} className="text-slate-500" />}
               <Folder size={16} className="text-indigo-400" />
               <span className="text-xs font-black uppercase tracking-widest text-slate-300">src</span>
            </div>

            {isFolderOpen && (
              <div className="ml-6 mt-2 space-y-1">
                 {Object.keys(files).map((file) => (
                   <button
                     key={file}
                     onClick={() => setActiveFile(file)}
                     className={`w-full flex items-center gap-3 p-2 rounded-lg text-xs font-medium transition-all ${
                       activeFile === file ? 'bg-indigo-600/10 text-indigo-400' : 'text-slate-500 hover:text-slate-300 hover:bg-white/5'
                     }`}
                   >
                     {file.endsWith('.tsx') ? <FileCode size={14} /> : file.endsWith('.json') ? <FileJson size={14} /> : <FileCode size={14} />}
                     {file}
                   </button>
                 ))}
              </div>
            )}
         </div>

         <div className="p-6 bg-white/[0.02] border-t border-white/5">
            <div className="flex items-center gap-3 mb-4">
               <Github size={16} className="text-slate-400" />
               <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Source Connected</span>
            </div>
            <button className="w-full py-2 bg-indigo-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">
               Commit & Push
            </button>
         </div>
      </aside>

      {/* Workspace Editor */}
      <main className="flex-1 flex flex-col min-w-0">
         <div className="h-12 bg-[#0D1117] border-b border-white/5 flex items-center px-4 gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600/10 border border-indigo-600/20 rounded-lg">
               <FileCode size={12} className="text-indigo-400" />
               <span className="text-xs font-black tracking-tight text-white">{activeFile}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
               <button className="p-2 text-slate-500 hover:text-white transition-colors">
                  <Save size={16} />
               </button>
               <button className="p-2 text-slate-500 hover:text-white transition-colors">
                  <Settings size={16} />
               </button>
               <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20 active:scale-95 transition-all">
                  <Play size={12} fill="currentColor" /> Preview App
               </button>
            </div>
         </div>

         <div className="flex-1 bg-[#010409] p-8 overflow-hidden font-mono text-sm leading-relaxed text-slate-400 select-all focus:outline-none whitespace-pre-wrap">
            {files[activeFile]}
         </div>

         {/* Projects Ticker */}
         <div className="h-10 bg-[#0D1117] border-t border-white/5 flex items-center px-8 gap-8 overflow-hidden">
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
               {/* Added missing 'Activity' icon from lucide-react */}
               <Activity size={10} className="text-indigo-500" /> Compilation Active
            </div>
            <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.4em] text-slate-500">
               <Terminal size={10} className="text-amber-500" /> Dev Server: Port 3000
            </div>
         </div>
      </main>
    </div>
  );
};

export default ProjectWorkspace;
