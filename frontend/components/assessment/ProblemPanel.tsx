import React from 'react';

type Problem = {
  title: string;
  description: string;
  input: string;
  output: string;
  example: string;
};

export default function ProblemPanel({ problem, currentIndex, setCurrentIndex, timeLeft, isFlagged, onToggleFlag } : { problem: Problem, currentIndex: number, setCurrentIndex: (n:number)=>void, timeLeft: number, isFlagged: boolean, onToggleFlag: ()=>void }){
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <aside className="problem-panel panel">
      <header className="problem-header">
        <div className="test-title">Acme Corp | Backend Engineer | CodeStream</div>
        <div className="header-right">
          <div className="timer">{`${minutes}:${seconds.toString().padStart(2,'0')}`}</div>
          <button className={`flag-toggle ${isFlagged ? 'active':''}`} onClick={onToggleFlag} title={isFlagged ? 'Unflag' : 'Flag for review'}>✓</button>
        </div>
      </header>



      <div className="problem-body">
        <h2>{problem.title}</h2>
        <p className="desc">{problem.description}</p>

        <div className="section">
          <strong>Input Format</strong>
          <div className="mono">{problem.input}</div>
        </div>

        <div className="section">
          <strong>Output Format</strong>
          <div className="mono">{problem.output}</div>
        </div>

        <div className="section example">
          <strong>Example</strong>
          <pre>{problem.example}</pre>
        </div>
      </div>
    </aside>
  );
}
