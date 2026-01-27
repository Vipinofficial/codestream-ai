
import React, { useState, useRef, useEffect } from 'react';
import { Challenge } from '../types';
import { Video, Play, Square, RefreshCw, CheckCircle2, AlertCircle, Camera, Mic } from 'lucide-react';

interface VideoResponseStepProps {
  challenge: Challenge;
  onComplete: () => void;
}

const VideoResponseStep: React.FC<VideoResponseStepProps> = ({ challenge, onComplete }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [status, setStatus] = useState<'idle' | 'recording' | 'preview' | 'uploading'>('idle');
  const [recordingTime, setRecordingTime] = useState(0);

  useEffect(() => {
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Camera access denied", err);
      }
    }
    setupCamera();

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval: any;
    if (status === 'recording') {
      interval = setInterval(() => setRecordingTime(prev => prev + 1), 1000);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [status]);

  const startRecording = () => {
    setRecordedChunks([]);
    const stream = videoRef.current?.srcObject as MediaStream;
    const mediaRecorder = new MediaRecorder(stream);
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) setRecordedChunks(prev => [...prev, e.data]);
    };
    
    mediaRecorder.onstop = () => setStatus('preview');
    
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
    setStatus('recording');
  };

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
  };

  const handleRetake = () => {
    setStatus('idle');
    setRecordedChunks([]);
  };

  const handleFinish = () => {
    setStatus('uploading');
    setTimeout(() => onComplete(), 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 bg-[#020617] animate-in fade-in duration-700">
      <div className="max-w-4xl w-full space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-white tracking-tighter">Video Intel Response</h2>
          <p className="text-slate-500 font-medium uppercase tracking-widest text-[10px]">Biometric & Spoken Logic Check</p>
        </div>

        <div className="relative aspect-video bg-black rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl group">
          {status === 'preview' ? (
            <video 
              src={URL.createObjectURL(new Blob(recordedChunks, { type: 'video/webm' }))} 
              controls 
              className="w-full h-full object-cover" 
            />
          ) : (
            <>
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover opacity-80" />
              {status === 'recording' && (
                <div className="absolute top-8 right-8 flex items-center gap-3 px-4 py-2 bg-red-600 rounded-2xl animate-pulse">
                   <div className="w-2 h-2 rounded-full bg-white" />
                   <span className="text-[10px] font-black text-white uppercase tracking-widest">Recording {recordingTime}s</span>
                </div>
              )}
            </>
          )}

          <div className="absolute inset-0 border-[20px] border-[#020617] pointer-events-none" />
        </div>

        <div className="flex items-center justify-center gap-6">
          {status === 'idle' && (
            <button 
              onClick={startRecording}
              className="px-12 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <Video size={18} /> Initialize Feed
            </button>
          )}
          {status === 'recording' && (
            <button 
              onClick={stopRecording}
              className="px-12 py-5 bg-red-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-red-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
            >
              <Square size={18} fill="currentColor" /> Terminate Feed
            </button>
          )}
          {status === 'preview' && (
            <>
              <button 
                onClick={handleRetake}
                className="px-8 py-5 bg-white/5 border border-white/10 text-slate-400 hover:text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs transition-all flex items-center gap-3"
              >
                <RefreshCw size={18} /> Retake
              </button>
              <button 
                onClick={handleFinish}
                className="px-12 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-2xl shadow-indigo-600/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
              >
                <CheckCircle2 size={18} /> Submit Signal
              </button>
            </>
          )}
          {status === 'uploading' && (
             <div className="flex items-center gap-4 text-indigo-500 animate-pulse">
                <RefreshCw className="animate-spin" size={24} />
                <span className="text-[10px] font-black uppercase tracking-widest">Encrypting for Archive...</span>
             </div>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto opacity-30">
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
              <Camera size={14} className="text-indigo-400" />
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">1080p HD Link</span>
           </div>
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
              <Mic size={14} className="text-indigo-400" />
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Dual Channel Mic</span>
           </div>
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
              <AlertCircle size={14} className="text-indigo-400" />
              <span className="text-[8px] font-black uppercase tracking-widest text-slate-500">Lossless Sync</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default VideoResponseStep;
