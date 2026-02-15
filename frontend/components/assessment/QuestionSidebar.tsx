import React, { useState, useEffect, useRef } from 'react';
import WebcamPreview from './WebcamPreview';

type Props = {
  currentIndex: number;
  setCurrentIndex: (n:number)=>void;
  statuses: Record<number, { done:boolean; flagged:boolean }>;
  setStatuses: (s: Record<number, { done:boolean; flagged:boolean }>|((prev:Record<number, { done:boolean; flagged:boolean }>)=>Record<number, { done:boolean; flagged:boolean }>)) => void;
};

export default function QuestionSidebar({ currentIndex, setCurrentIndex, statuses, setStatuses }: Props){

  const toggleFlag = (i:number)=>{
    setStatuses(prev => ({ ...prev, [i]: { ...prev[i], flagged: !prev[i].flagged } }));
  };

  const markDone = (i:number)=>{
    setStatuses(prev => ({ ...prev, [i]: { ...prev[i], done: true, flagged: prev[i].flagged } }));
  };

  useEffect(()=>{
    // When currentIndex changes, mark it as visited (not automatically done)
  },[currentIndex]);

  return (
    <aside className="question-sidebar">
      <div className="qs-section">
        <div className="qs-label">Questions</div>
        <div className="qs-wrapper">
          <div className="qs-list">
            {Array.from({length:10}).map((_,i)=>{
              const idx = i+1;
              const s = statuses[idx];
              return (
                <div key={idx} className={`qs-item ${idx===currentIndex ? 'current':''}`} onClick={()=>setCurrentIndex(idx)}>
                  <div className={`qs-num ${s.done ? 'done':''} ${s.flagged ? 'flagged':''}`}>
                    {idx}
                    {s.flagged && <span className="qs-flag-badge" onClick={(e)=>{e.stopPropagation(); toggleFlag(idx);}} title="Unflag">⚑</span>}
                    {!s.flagged && <span className="qs-flag-slot" onClick={(e)=>{e.stopPropagation(); toggleFlag(idx);}} title="Flag"></span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="qs-section">
        <div className="qs-label">Live Feed</div>
        <div className="qs-webcam"><WebcamPreview small={true} /></div>
      </div>
    </aside>
  );
}
