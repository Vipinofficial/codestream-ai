import React, { useState, useEffect } from 'react';
import { apiService } from '@/services/apiService';

export default function EditorPanel({ currentIndex, onNext, timeLeft, isFullscreen } : { currentIndex:number, onNext: ()=>void, timeLeft:number, isFullscreen: boolean }){
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState<string>(`// Write your solution here\nfunction solve(){\n  // TODO\n}`);
  const [running, setRunning] = useState(false);

  useEffect(()=>{
    // restore autosave if present
    try{
      const saved = localStorage.getItem(`cs_code_${currentIndex}`);
      if(saved) setCode(saved);
    }catch(e){}
  },[currentIndex]);

  useEffect(()=>{
    const id = setInterval(()=>{
      try{ localStorage.setItem(`cs_code_${currentIndex}`, code); }catch(e){}
    }, 2000);
    return ()=>clearInterval(id);
  },[code,currentIndex]);

  const handleRun = ()=>{
    if(!isFullscreen) return;
    setRunning(true);
    setTimeout(()=> setRunning(false), 700);
  };

  const handleSaveNext = async ()=>{
    try{
      await apiService.syncCodeSession('candidate_1', `challenge_${currentIndex}`, code);
      onNext();
    }catch(e){
      console.error(e);
    }
  };

  return (
    <section className="editor-panel panel">
      <div className="editor-top">
        <div className="left-controls">
          <select value={language} onChange={e=>setLanguage(e.target.value)} className="lang-select">
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
        </div>
        <div className="right-controls">
          <button className="icon-btn" title="Settings">⚙️</button>
        </div>
      </div>

      <div className="editor-area">
        <textarea className="code-editor" value={code} onChange={e=>setCode(e.target.value)} spellCheck={false} />
      </div>

      <div className="editor-actions">
        <button className="run-btn" onClick={handleRun} aria-live="polite" disabled={!isFullscreen} title={!isFullscreen ? 'Enter fullscreen to run' : ''}>{running ? 'Running...' : 'Run Code'}</button>
        <button className="save-next" onClick={handleSaveNext} disabled={!isFullscreen} title={!isFullscreen ? 'Enter fullscreen to save and continue' : ''}>Save & Next</button>
      </div>
    </section>
  );
}
