
import React, { useRef, useEffect, useState } from 'react';
import { Camera, Shield, UserCheck, AlertCircle, Maximize2, Minimize2, Eye, EyeOff, CameraOff, Settings } from 'lucide-react';

const ProctoringFeed: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [status, setStatus] = useState<'Normal' | 'Scanning' | 'Alert'>('Scanning');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isCameraOff, setIsCameraOff] = useState(false);
  const [isGazeDetected, setIsGazeDetected] = useState(true);

  useEffect(() => {
    async function setupCamera() {
      if (isCameraOff) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsReady(true);
        }
      } catch (err) {
        console.error("Camera access denied", err);
        setIsCameraOff(true);
      }
    }
    setupCamera();

    const interval = setInterval(() => {
      setStatus(prev => prev === 'Scanning' ? 'Normal' : (Math.random() > 0.9 ? 'Scanning' : 'Normal'));
      setIsGazeDetected(Math.random() > 0.1);
    }, 3000);

    return () => {
      clearInterval(interval);
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, [isCameraOff]);

  const toggleCamera = () => {
    if (!isCameraOff) {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
      setIsReady(false);
    }
    setIsCameraOff(!isCameraOff);
  };

  if (isMinimized) {
    return (
      <button 
        onClick={() => setIsMinimized(false)}
        className="fixed bottom-6 right-6 p-4 bg-indigo-600 rounded-full shadow-2xl text-white hover:scale-110 transition-all z-50 group"
      >
        <Camera size={20} />
        <div className="absolute right-0 top-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 animate-pulse" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-64 h-48 bg-slate-900 rounded-[2rem] border border-indigo-500/30 overflow-hidden shadow-2xl z-50 group transition-all">
      {!isReady || isCameraOff ? (
        <div className="flex flex-col items-center justify-center h-full text-slate-500 bg-slate-950 relative">
          <div className="p-4 bg-slate-900 rounded-2xl mb-4 border border-white/5">
             {isCameraOff ? <CameraOff size={24} className="text-red-500" /> : <Camera size={24} className="animate-pulse" />}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest">{isCameraOff ? 'Visual Disabled' : 'Connecting...'}</span>
          <button 
            onClick={toggleCamera} 
            className="absolute bottom-4 text-[8px] font-black uppercase tracking-widest text-indigo-500 hover:text-white"
          >
            {isCameraOff ? 'Enable Neural Eye' : 'Deactivate Link'}
          </button>
        </div>
      ) : (
        <>
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-500" />
          <div className="absolute inset-0 border-2 border-indigo-500/20 pointer-events-none group-hover:border-indigo-500/40 transition-colors" />
          
          {/* Neural HUD Overlay */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-indigo-500/20 rounded-full scale-[2] group-hover:scale-[1.8] transition-transform duration-1000" />
             <div className="absolute top-0 left-0 right-0 h-[1px] bg-indigo-500 shadow-[0_0_10px_#6366f1] animate-[scan_3s_linear_infinite]" />
          </div>
          
          {/* Controls Bar */}
          <div className="absolute bottom-0 inset-x-0 h-10 bg-slate-950/80 backdrop-blur-md flex items-center justify-between px-4 translate-y-full group-hover:translate-y-0 transition-transform">
             <div className="flex gap-3">
               <button onClick={toggleCamera} className="text-slate-500 hover:text-red-500 transition-colors">
                  <CameraOff size={14} />
               </button>
               <button className="text-slate-500 hover:text-indigo-500 transition-colors">
                  <Settings size={14} />
               </button>
             </div>
             <button onClick={() => setIsMinimized(true)} className="text-slate-500 hover:text-white">
                <Minimize2 size={14} />
             </button>
          </div>

          {/* AI Status Indicators */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg backdrop-blur-xl border text-[9px] font-black uppercase tracking-widest transition-all ${
              status === 'Normal' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
              status === 'Scanning' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
              'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
              {status === 'Normal' && <UserCheck size={10} />}
              {status === 'Scanning' && <Shield size={10} className="animate-spin" />}
              {status}
            </div>
            
            <div className={`flex items-center gap-2 px-2.5 py-1 rounded-lg backdrop-blur-xl border text-[9px] font-black uppercase tracking-widest ${
               isGazeDetected ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
            }`}>
               {isGazeDetected ? <Eye size={10} /> : <EyeOff size={10} className="animate-pulse" />}
               {isGazeDetected ? 'Gaze Locked' : 'Focus Lost'}
            </div>
          </div>
          
          <div className="absolute top-3 right-3">
             <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
          </div>
        </>
      )}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ProctoringFeed;
