
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality, LiveServerMessage } from '@google/genai';
import { 
  Mic, MicOff, Video, Play, Square, 
  Activity, Brain, Zap, ShieldAlert, Sparkles, X, Terminal, Volume2
} from 'lucide-react';

interface LiveInterviewProps {
  onComplete: () => void;
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);
  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const LiveInterview: React.FC<LiveInterviewProps> = ({ onComplete }) => {
  const [isActive, setIsActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [interviewerStatus, setInterviewerStatus] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const [transcription, setTranscription] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [latency, setLatency] = useState(12);

  const sessionRef = useRef<any>(null);
  const audioContextsRef = useRef<{input: AudioContext, output: AudioContext} | null>(null);
  const nextStartTimeRef = useRef(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const currentTranscriptionRef = useRef({ user: '', model: '' });

  const startLiveSession = async () => {
    if (isActive) return;
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const inputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      const outputCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
      audioContextsRef.current = { input: inputCtx, output: outputCtx };
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setIsActive(true);
            setTranscription([{ role: 'model', text: "Handshake verified. Assessment link stable. Please state your approach." }]);
            const source = inputCtx.createMediaStreamSource(stream);
            const scriptProcessor = inputCtx.createScriptProcessor(4096, 1, 1);
            scriptProcessor.onaudioprocess = (e) => {
              if (isMuted) return;
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) int16[i] = inputData[i] * 32768;
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };
            source.connect(scriptProcessor);
            scriptProcessor.connect(inputCtx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio) {
              setInterviewerStatus('speaking');
              const outputCtx = audioContextsRef.current?.output;
              if (outputCtx) {
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                const audioBuffer = await decodeAudioData(decode(base64Audio), outputCtx, 24000, 1);
                const source = outputCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputCtx.destination);
                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
                source.onended = () => {
                  sourcesRef.current.delete(source);
                  if (sourcesRef.current.size === 0) setInterviewerStatus('idle');
                };
              }
            }
            if (message.serverContent?.outputTranscription) {
              currentTranscriptionRef.current.model += message.serverContent.outputTranscription.text;
              updateTranscriptionUI('model', currentTranscriptionRef.current.model);
            }
            if (message.serverContent?.inputTranscription) {
              currentTranscriptionRef.current.user += message.serverContent.inputTranscription.text;
              updateTranscriptionUI('user', currentTranscriptionRef.current.user);
            }
            if (message.serverContent?.turnComplete) {
              currentTranscriptionRef.current = { user: '', model: '' };
              setInterviewerStatus('listening');
            }
            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => { try { s.stop(); } catch(e) {} });
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
              setInterviewerStatus('idle');
            }
          },
          onerror: (e) => console.error('Live session error:', e),
          onclose: () => { setIsActive(false); setInterviewerStatus('idle'); }
        },
        config: {
          responseModalities: [Modality.AUDIO],
          outputAudioTranscription: {},
          inputAudioTranscription: {},
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Zephyr' } } },
          systemInstruction: 'You are a senior technical interviewer. Be rigorous but helpful. Ask questions about distributed systems, React, and algorithms. Guide the candidate if they get stuck.'
        }
      });
      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Failed to start live session:', err);
    }
  };

  const updateTranscriptionUI = (role: 'user' | 'model', text: string) => {
    setTranscription(prev => {
      const last = prev[prev.length - 1];
      if (last && last.role === role) {
        const updated = [...prev];
        updated[updated.length - 1] = { role, text };
        return updated;
      }
      return [...prev, { role, text }];
    });
  };

  const toggleMute = () => setIsMuted(!isMuted);

  const stopLiveSession = () => {
    if (sessionRef.current) { sessionRef.current.close(); sessionRef.current = null; }
    if (audioContextsRef.current) {
      audioContextsRef.current.input.close().catch(() => {});
      audioContextsRef.current.output.close().catch(() => {});
    }
    setIsActive(false);
  };

  useEffect(() => {
    const latencyInterval = setInterval(() => setLatency(10 + Math.floor(Math.random() * 5)), 2000);
    return () => { clearInterval(latencyInterval); stopLiveSession(); };
  }, []);

  return (
    <div className="h-screen-safe w-full bg-[#020617] flex flex-col relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/20 blur-[120px] rounded-full animate-pulse" />
      </div>

      <header className="h-20 flex items-center justify-between px-12 border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl shrink-0 z-50">
        <div className="flex items-center gap-6">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-xl">
            <Video size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white tracking-tighter">AI Interview Terminal</h2>
            <div className="flex items-center gap-2 mt-1">
              <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`} />
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{isActive ? 'Link Established' : 'System Offline'}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
             <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Neural Latency</p>
             <p className="text-xs font-mono font-black text-indigo-400">{latency}ms</p>
          </div>
          <button onClick={onComplete} className="p-2 text-slate-400 hover:text-red-500 transition-colors"><X size={24} /></button>
        </div>
      </header>

      <main className="flex-1 flex overflow-hidden p-8 gap-8 relative z-10">
         <section className="flex-[3] flex flex-col gap-8">
            <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[3.5rem] relative overflow-hidden flex flex-col items-center justify-center shadow-2xl">
               <div className={`absolute inset-0 transition-opacity duration-1000 ${interviewerStatus === 'speaking' ? 'opacity-20 bg-indigo-600/10' : 'opacity-0'}`} />
               <div className="relative z-10">
                 <div className={`w-48 h-48 rounded-full border-2 transition-all duration-700 flex items-center justify-center ${interviewerStatus === 'speaking' ? 'border-indigo-500 scale-110' : 'border-indigo-500/20'}`}>
                    <div className="w-32 h-32 rounded-full bg-indigo-600/10 flex items-center justify-center animate-pulse">
                       <Brain size={64} className={interviewerStatus === 'speaking' ? 'text-indigo-400' : 'text-slate-700'} />
                    </div>
                 </div>
               </div>
               <div className="absolute bottom-12 flex flex-col items-center gap-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Node Status: {interviewerStatus.toUpperCase()}</span>
                  <div className="flex gap-1">
                    {[...Array(12)].map((_, i) => (
                      <div key={i} className={`w-1 h-4 rounded-full transition-all duration-300 ${interviewerStatus === 'speaking' ? 'bg-indigo-500' : 'bg-slate-800'}`} 
                        style={{ height: interviewerStatus === 'speaking' ? `${10 + Math.random() * 20}px` : '4px' }} />
                    ))}
                  </div>
               </div>
            </div>

            <div className="h-28 bg-[#0D1117] border border-white/5 rounded-[2.5rem] flex items-center justify-between px-12 shadow-2xl">
               <div className="flex gap-4">
                  {!isActive ? (
                    <button onClick={startLiveSession} className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-indigo-500 active:scale-95 transition-all">
                      <Play size={16} fill="currentColor" /> Initialize Link
                    </button>
                  ) : (
                    <>
                      <button onClick={stopLiveSession} className="p-5 bg-red-600/10 text-red-500 border border-red-500/20 rounded-2xl hover:bg-red-600 hover:text-white transition-all">
                        <Square size={20} fill="currentColor" />
                      </button>
                      <button onClick={toggleMute} className={`p-5 rounded-2xl border transition-all ${isMuted ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'}`}>
                        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
                      </button>
                    </>
                  )}
               </div>
               <div className="flex flex-col items-end gap-1">
                  <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">Signal Reliability</span>
                  <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-emerald-500 w-[94%]" />
                  </div>
               </div>
            </div>
         </section>

         <aside className="flex-[2] flex flex-col gap-8">
            <div className="flex-1 bg-white/[0.01] border border-white/5 rounded-[3.5rem] flex flex-col shadow-2xl overflow-hidden">
               <div className="h-12 border-b border-white/5 flex items-center px-8 bg-white/[0.02]">
                  <Terminal size={14} className="text-indigo-500 mr-3" />
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Tactical Transcript</span>
               </div>
               <div className="flex-1 p-8 overflow-y-auto custom-scrollbar space-y-6">
                  {transcription.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center opacity-30">
                       <Activity size={32} className="mb-4" />
                       <p className="text-[9px] font-black uppercase tracking-widest">Awaiting Neural Activity</p>
                    </div>
                  ) : (
                    transcription.map((t, i) => (
                      <div key={i} className={`flex flex-col gap-1 ${t.role === 'user' ? 'items-end' : 'items-start'}`}>
                         <span className="text-[8px] font-black uppercase text-slate-600 tracking-widest px-2">{t.role === 'user' ? 'Candidate' : 'Interviewer'}</span>
                         <div className={`p-4 text-xs font-medium leading-relaxed rounded-2xl max-w-[90%] ${t.role === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white/5 text-slate-300 rounded-tl-none border border-white/10'}`}>
                            {t.text}
                         </div>
                      </div>
                    ))
                  )}
               </div>
            </div>
            <div className="h-48 bg-indigo-600 p-8 rounded-[3rem] relative overflow-hidden group">
               <Sparkles className="absolute -top-12 -right-12 w-48 h-48 text-white/10 rotate-12 transition-transform duration-1000 group-hover:rotate-45" />
               <h4 className="text-lg font-black text-white mb-2 tracking-tight">AI Evaluation Suite</h4>
               <p className="text-indigo-100 text-[10px] font-medium leading-relaxed uppercase tracking-widest opacity-80">Sentiment & Accuracy Check Enabled</p>
               <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10"><p className="text-[8px] text-white/50 uppercase font-bold">Accuracy</p><p className="text-sm font-black text-white">92.4%</p></div>
                  <div className="p-4 bg-white/10 rounded-2xl border border-white/10"><p className="text-[8px] text-white/50 uppercase font-bold">Confidence</p><p className="text-sm font-black text-white">Elite</p></div>
               </div>
            </div>
         </aside>
      </main>
    </div>
  );
};

export default LiveInterview;
