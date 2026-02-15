import React, { useState, useEffect } from 'react';
import ProblemPanel from './ProblemPanel';
import EditorPanel from './EditorPanel';
import WebcamPreview from './WebcamPreview';
import QuestionSidebar from './QuestionSidebar';
import './Assessment.css';

// Assessment layout: relies on global theme toggle from app Layout

const dummyProblem = {
  title: 'Two Sum',
  description: 'Given an array of integers, return indices of the two numbers such that they add up to a specific target.',
  input: 'nums = [2,7,11,15], target = 9',
  output: '[0,1]',
  example: 'Input: nums = [2,7,11,15], target = 9\nOutput: [0,1]'
};

export default function AssessmentLayout() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes
  // theme controlled by top-level Layout
  const [isFullscreen, setIsFullscreen] = useState<boolean>(!!document.fullscreenElement);
  const [statuses, setStatuses] = useState<Record<number, { done:boolean; flagged:boolean }>>(() => {
    const s: any = {};
    for(let i=1;i<=10;i++) s[i] = { done:false, flagged:false };
    return s;
  });

  useEffect(()=>{
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return ()=> document.removeEventListener('fullscreenchange', handler);
  },[]);

  useEffect(() => {
    const t = setInterval(() => setTimeLeft(t0 => Math.max(0, t0 - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="assessment-root">
      <div className="assessment-main">
        <QuestionSidebar currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} statuses={statuses} setStatuses={setStatuses} />
        <ProblemPanel
          problem={dummyProblem}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          timeLeft={timeLeft}
          isFlagged={statuses[currentIndex]?.flagged || false}
          onToggleFlag={() => setStatuses(prev => ({ ...prev, [currentIndex]: { ...prev[currentIndex], flagged: !prev[currentIndex].flagged } }))}
        />

        <EditorPanel
          currentIndex={currentIndex}
          onNext={() => setCurrentIndex(i => Math.min(10, i + 1))}
          timeLeft={timeLeft}
          isFullscreen={isFullscreen}
        />
      </div>
      {!isFullscreen && (
        <div className="fs-overlay" role="dialog" aria-modal="true">
          <div className="fs-box">
            <h3>Enter Fullscreen to Start Assessment</h3>
            <p className="muted">For exam integrity, this assessment must be taken in fullscreen. Your webcam and activity monitoring remain active.</p>
            <div className="fs-actions">
              <button className="run-btn" onClick={async ()=>{ try{ if(document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen(); }catch(e){} }}>
                Enter Fullscreen
              </button>
            </div>
          </div>
        </div>
      )}
      {/* top controls are provided by the app Layout when on assessment route */}
    </div>
  );
}
