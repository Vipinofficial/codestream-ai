import React, { useState } from 'react';
import { PieChart, Zap, TrendingDown, AlertTriangle, BarChart2, Target } from 'lucide-react';

const ScoringValidation: React.FC = () => {
  const [scoreMode, setScoreMode] = useState<'manual' | 'auto' | 'hybrid'>('auto');
  const [selectedTest, setSelectedTest] = useState<string>('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Scoring & Validation</h2>
      </div>

      {/* Score Mode Selection */}
      <div className="flex gap-3 border-b border-slate-200 dark:border-slate-700 pb-4">
        {(['auto', 'manual', 'hybrid'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setScoreMode(mode)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              scoreMode === mode
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            {mode === 'auto' && 'Automatic Scoring'}
            {mode === 'manual' && 'Manual Review Queue'}
            {mode === 'hybrid' && 'Hybrid Approach'}
          </button>
        ))}
      </div>

      {/* Automatic Scoring */}
      {scoreMode === 'auto' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Scoring Rules</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Marks Per Multiple Choice Question
                </label>
                <input
                  type="number"
                  defaultValue="1"
                  step="0.5"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Marks Per Coding Question
                </label>
                <input
                  type="number"
                  defaultValue="5"
                  step="1"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>

              <div>
                <label className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">Apply Negative Marking</span>
                </label>
                <div className="ml-7">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Negative Marks Per Wrong Answer (%)
                  </label>
                  <input
                    type="number"
                    defaultValue="25"
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">Partial Credit for Coding Questions</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Automated Scoring Status</h3>
            <div className="space-y-3">
              {[
                { test: 'Java Fundamentals', scored: 25, pending: 0, status: 'Complete', percentage: 100 },
                { test: 'Frontend Skills', scored: 18, pending: 2, status: 'In Progress', percentage: 90 },
                { test: 'DevOps Assessment', scored: 8, pending: 4, status: 'In Progress', percentage: 67 },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900 dark:text-white">{item.test}</h4>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      item.status === 'Complete'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex gap-3 text-xs text-slate-600 dark:text-slate-400 mb-2">
                    <span>Scored: {item.scored}</span>
                    <span>Pending: {item.pending}</span>
                  </div>
                  <div className="w-full bg-slate-300 dark:bg-slate-600 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Manual Review */}
      {scoreMode === 'manual' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Manual Review Queue</h3>
            <div className="space-y-3">
              {[
                { candidate: 'John Doe', test: 'Java Fundamentals', questions: 5, priority: 'high' },
                { candidate: 'Jane Smith', test: 'Frontend Skills', questions: 3, priority: 'medium' },
                { candidate: 'Mike Johnson', test: 'DevOps Assessment', questions: 8, priority: 'high' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{item.candidate}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.test} • {item.questions} questions</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      item.priority === 'high'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    }`}>
                      {item.priority.toUpperCase()}
                    </span>
                    <button className="px-3 py-1 text-xs font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700">
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Hybrid */}
      {scoreMode === 'hybrid' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Hybrid Scoring Configuration</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Auto-score if confidence above (%)
              </label>
              <input
                type="number"
                defaultValue="90"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
              />
            </div>

            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Questions with confidence below threshold will go to manual review queue
              </p>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Current Setup: Auto-score MCQs and coding questions. Manual review for text-based answers and borderline cases.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Grade Boundaries */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Grade Boundaries</h3>
        <div className="space-y-3">
          {[
            { grade: 'A', from: 80, to: 100, students: 8 },
            { grade: 'B', from: 70, to: 79, students: 12 },
            { grade: 'C', from: 60, to: 69, students: 4 },
            { grade: 'D', from: 50, to: 59, students: 1 },
            { grade: 'F', from: 0, to: 49, students: 0 },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <div className="w-12 h-12 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <span className="font-bold text-lg text-indigo-600 dark:text-indigo-400">{item.grade}</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-slate-900 dark:text-white">
                  {item.from}% - {item.to}%
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">{item.students} students</p>
              </div>
              <input
                type="number"
                defaultValue={item.from}
                min="0"
                max="100"
                className="w-16 px-2 py-1 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-600 text-sm"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScoringValidation;
