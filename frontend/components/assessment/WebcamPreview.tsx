import React, { useEffect, useRef } from 'react';

export default function WebcamPreview({ small }: { small?: boolean }){
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(()=>{
    async function start(){
      try{
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if(videoRef.current) videoRef.current.srcObject = stream;
      }catch(e){
        // ignore in environments without camera
      }
    }
    start();
    return ()=>{
      if(videoRef.current && videoRef.current.srcObject){
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t=>t.stop());
      }
    };
  }, []);

  return (
    <div className={`webcam-preview panel ${small ? 'small':'large'}`}>
      <video ref={videoRef} autoPlay muted playsInline />
      <div className="webcam-label">Live Proctor</div>
    </div>
  );
}
