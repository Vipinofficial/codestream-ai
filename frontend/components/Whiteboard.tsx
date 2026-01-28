
import React, { useState, useRef, useEffect } from 'react';
import { Challenge } from '../types';
import { 
  Square, Circle, MousePointer2, Type, Eraser, 
  Download, Share2, Plus, ArrowRight, Layers, Database, 
  Server, Globe, Cpu, Cloud, Lock
} from 'lucide-react';

interface WhiteboardProps {
  challenge: Challenge;
}

const Whiteboard: React.FC<WhiteboardProps> = ({ challenge }) => {
  const [selectedTool, setSelectedTool] = useState<'select' | 'shape' | 'text' | 'line'>('select');
  const [elements, setElements] = useState<any[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);

  const tools = [
    { id: 'select', icon: MousePointer2, label: 'Navigate' },
    { id: 'shape', icon: Square, label: 'Node' },
    { id: 'line', icon: ArrowRight, label: 'Trace' },
    { id: 'text', icon: Type, label: 'Protocol' },
  ];

  const components = [
    { id: 'lb', icon: Server, label: 'Load Balancer' },
    { id: 'db', icon: Database, label: 'Database' },
    { id: 'cache', icon: Cpu, label: 'Redis Cache' },
    { id: 'api', icon: Globe, label: 'API Gateway' },
    { id: 'auth', icon: Lock, label: 'Auth Node' },
  ];

  return (
    <div className="flex h-full w-full bg-[#010409] relative overflow-hidden select-none">
      {/* Blueprint Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle, #6366f1 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} 
      />

      {/* Vertical Tool Rail */}
      <aside className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-10">
        <div className="bg-[#0D1117] border border-white/5 p-2 rounded-2xl shadow-2xl">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => setSelectedTool(tool.id as any)}
              className={`p-4 rounded-xl transition-all relative group mb-2 last:mb-0 ${
                selectedTool === tool.id ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-white/5'
              }`}
            >
              <tool.icon size={20} />
              <div className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest rounded opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
                {tool.label}
              </div>
            </button>
          ))}
        </div>
      </aside>

      {/* Component Library Dock */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-[#0D1117]/80 backdrop-blur-xl border border-white/5 px-6 py-3 rounded-[2rem] flex items-center gap-6 shadow-2xl z-10">
         <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-500 mr-2">Components</span>
         <div className="h-6 w-[1px] bg-white/10" />
         {components.map((comp) => (
           <button key={comp.id} className="flex items-center gap-3 px-3 py-1.5 hover:bg-white/5 rounded-xl transition-all group">
             <comp.icon size={16} className="text-slate-400 group-hover:text-indigo-400" />
             <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300">{comp.label}</span>
           </button>
         ))}
      </div>

      {/* Canvas Area */}
      <div 
        ref={canvasRef}
        className="flex-1 cursor-crosshair relative flex items-center justify-center"
      >
         <div className="text-center space-y-4 opacity-20 pointer-events-none">
            <Layers size={64} className="mx-auto text-indigo-500" />
            <p className="text-xs font-black uppercase tracking-[0.5em] text-white">Tactical Architect Link Established</p>
         </div>
         
         {/* Sample Architecture Node */}
         <div className="absolute top-1/3 left-1/4 p-6 bg-[#0D1117] border border-indigo-500/50 rounded-2xl shadow-2xl animate-in zoom-in-95 duration-700">
            <div className="flex items-center gap-4 mb-4">
              <Server size={20} className="text-indigo-500" />
              <span className="text-xs font-black text-white uppercase tracking-widest">Main Cluster</span>
            </div>
            <div className="space-y-2">
               <div className="h-1 w-full bg-indigo-500/20 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-2/3 shadow-[0_0_8px_#6366f1]" />
               </div>
               <p className="text-[8px] font-black text-slate-500 uppercase">Load: 64%</p>
            </div>
         </div>
      </div>

      {/* Telemetry HUD */}
      <div className="absolute bottom-6 right-6 p-6 bg-[#0D1117]/50 backdrop-blur-md border border-white/5 rounded-3xl min-w-[240px]">
         <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">System Metrics</span>
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
         </div>
         <div className="space-y-3">
            {[
              { label: 'Latency', val: '24ms' },
              { label: 'Packet Integrity', val: '99.9%' },
              { label: 'Neural Buffer', val: 'Clear' }
            ].map((m, i) => (
              <div key={i} className="flex justify-between border-b border-white/5 pb-2">
                 <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{m.label}</span>
                 <span className="text-[10px] font-black text-slate-300 font-mono">{m.val}</span>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default Whiteboard;
