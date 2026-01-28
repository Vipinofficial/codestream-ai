
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, X, Brain, Activity, Zap, RefreshCw, Copy, Check, Terminal } from 'lucide-react';
import { getAIHint } from '../services/geminiService';
import { ChatMessage } from '../types';

interface AIChatProps {
  problemDescription: string;
  currentCode: string;
  onApplyCode?: (code: string) => void;
}

const AIChat: React.FC<AIChatProps> = ({ problemDescription, currentCode, onApplyCode }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const hint = await getAIHint(problemDescription, currentCode, messages);
      // Simple regex to find code blocks in AI response for better rendering
      const codeMatch = hint.match(/```(?:javascript|typescript|js|ts)?\n([\s\S]*?)```/);
      const codeSnippet = codeMatch ? codeMatch[1].trim() : undefined;
      const cleanText = hint.replace(/```[\s\S]*?```/g, '').trim();

      setMessages(prev => [...prev, { role: 'model', text: cleanText || hint, codeSnippet }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Logic Transmission Error. Check Token Sync." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-[#0d1117] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-600 rounded-lg shadow-lg">
            <Brain size={14} className="text-white" />
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">AI Copilot</h4>
            <div className="flex items-center gap-1.5 mt-0.5">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-[8px] font-black text-slate-500 uppercase">Neural Link Online</span>
            </div>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-6">
        {messages.length === 0 && (
          <div className="py-8 text-center px-4">
            <Sparkles className="mx-auto text-indigo-500 mb-4" size={24} />
            <h5 className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mb-2">Awaiting Instructions</h5>
            <p className="text-[10px] text-slate-600 leading-relaxed font-medium">Ask for complexity analysis, bug fixes, or architectural suggestions.</p>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col gap-2 ${m.role === 'user' ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2`}>
            <span className="text-[8px] font-black uppercase tracking-widest text-slate-600 px-1">{m.role === 'user' ? 'Candidate' : 'Gemini 3'}</span>
            <div className={`max-w-[95%] p-3 text-xs font-medium leading-relaxed rounded-xl ${
              m.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white/5 text-slate-300 border border-white/10 rounded-tl-none'
            }`}>
              {m.text}
              
              {m.codeSnippet && (
                <div className="mt-3 rounded-lg bg-black/40 border border-white/10 overflow-hidden">
                  <div className="flex items-center justify-between px-3 py-1.5 bg-white/5 border-b border-white/5">
                    <span className="text-[8px] font-mono text-slate-500 uppercase">Suggested Fix</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => copyToClipboard(m.codeSnippet!, i)}
                        className="p-1 hover:text-white transition-colors"
                      >
                        {copiedId === i ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                      </button>
                      {onApplyCode && (
                        <button 
                          onClick={() => onApplyCode(m.codeSnippet!)}
                          className="flex items-center gap-1 px-1.5 py-0.5 bg-indigo-600/20 text-indigo-400 rounded hover:bg-indigo-600 hover:text-white transition-all text-[8px] font-black uppercase"
                        >
                          Apply Fix
                        </button>
                      )}
                    </div>
                  </div>
                  <pre className="p-3 text-[10px] font-mono text-indigo-200 overflow-x-auto custom-scrollbar">
                    {m.codeSnippet}
                  </pre>
                </div>
              )}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2 animate-pulse">
            <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
              <Bot size={12} className="text-indigo-500" />
            </div>
            <div className="h-2 w-8 bg-white/5 rounded-full" />
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/5 bg-white/[0.02]">
        <div className="relative">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Cmd + L to focus..."
            className="w-full bg-black/50 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-xs text-slate-300 focus:outline-none focus:border-indigo-600 transition-all font-medium placeholder:text-slate-800"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-30 transition-all"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
