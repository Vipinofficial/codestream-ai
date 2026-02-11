import React, { useState } from 'react';
import { TrendingUp, Target, BarChart3, Users, BookOpen, Zap } from 'lucide-react';

const GapAnalysis: React.FC = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>('batch1');
  const [viewType, setViewType] = useState<'skills' | 'individuals' | 'topics'>('skills');

  const skillGaps = [
    {
      id: 1,
      skill: 'Data Structures & Algorithms',
      avgScore: 52,
      targetScore: 80,
      gap: 28,
      candidates: 18,
      priority: 'Critical',
    },
    {
      id: 2,
      skill: 'System Design',
      avgScore: 45,
      targetScore: 75,
      gap: 30,
      candidates: 22,
      priority: 'Critical',
    },
    {
      id: 3,
      skill: 'Database Design',
      avgScore: 68,
      targetScore: 80,
      gap: 12,
      candidates: 15,
      priority: 'High',
    },
    {
      id: 4,
      skill: 'Problem Solving',
      avgScore: 71,
      targetScore: 85,
      gap: 14,
      candidates: 12,
      priority: 'Medium',
    },
    {
      id: 5,
      skill: 'Code Quality',
      avgScore: 76,
      targetScore: 85,
      gap: 9,
      candidates: 8,
      priority: 'Low',
    },
  ];

  const candidateGaps = [
    { name: 'John Doe', dsa: 45, sysdesign: 40, database: 60, problemsolving: 65, codequality: 70 },
    { name: 'Jane Smith', dsa: 65, sysdesign: 55, database: 75, problemsolving: 80, codequality: 85 },
    { name: 'Mike Johnson', dsa: 50, sysdesign: 48, database: 65, problemsolving: 70, codequality: 72 },
    { name: 'Sarah Lee', dsa: 72, sysdesign: 68, database: 80, problemsolving: 85, codequality: 88 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Skill Gap Analysis</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
          Generate Report
        </button>
      </div>

      {/* Batch & Filter Selection */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Batch
            </label>
            <select
              value={selectedBatch}
              onChange={e => setSelectedBatch(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
            >
              <option value="batch1">Batch 2026-01</option>
              <option value="batch2">Batch 2025-Q4</option>
              <option value="batch3">Batch 2025-Q3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Test
            </label>
            <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700">
              <option>All Tests</option>
              <option>Java Assessment</option>
              <option>Frontend Skills</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Skill Category
            </label>
            <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700">
              <option>All Categories</option>
              <option>Technical</option>
              <option>Soft Skills</option>
            </select>
          </div>
        </div>

        {/* View Type Selection */}
        <div className="flex gap-2">
          {[
            { id: 'skills', label: 'Skills Gap', icon: Target },
            { id: 'individuals', label: 'Individual Gaps', icon: Users },
            { id: 'topics', label: 'Topic Analysis', icon: BookOpen },
          ].map(type => (
            <button
              key={type.id}
              onClick={() => setViewType(type.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                viewType === type.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              <type.icon size={18} />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Skills Gap View */}
      {viewType === 'skills' && (
        <div className="space-y-4">
          {skillGaps.map(skill => (
            <div
              key={skill.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">{skill.skill}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Affects {skill.candidates} candidates
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded ${
                  skill.priority === 'Critical'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    : skill.priority === 'High'
                    ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                    : skill.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {skill.priority} Priority
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Current Average</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{skill.avgScore}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Target Score</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{skill.targetScore}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Gap</p>
                  <p className="text-2xl font-bold text-red-600">{skill.gap}%</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 dark:text-slate-400">Progress to Target</span>
                  <span className="font-medium text-slate-900 dark:text-white">{skill.avgScore}%</span>
                </div>
                <div className="w-full bg-slate-300 dark:bg-slate-600 h-3 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full"
                    style={{ width: `${(skill.avgScore / skill.targetScore) * 100}%` }}
                  />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Need {skill.gap}% improvement to reach target of {skill.targetScore}%
                </p>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-lg hover:bg-indigo-200 text-sm font-medium">
                Create Training Plan
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Individual Gaps View */}
      {viewType === 'individuals' && (
        <div className="space-y-4">
          {candidateGaps.map((candidate, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">{candidate.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  { label: 'DSA', score: candidate.dsa },
                  { label: 'Sys Design', score: candidate.sysdesign },
                  { label: 'Database', score: candidate.database },
                  { label: 'Problem Solving', score: candidate.problemsolving },
                  { label: 'Code Quality', score: candidate.codequality },
                ].map((skill, sidx) => (
                  <div key={sidx} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">{skill.label}</p>
                    <div className="flex items-end justify-between">
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{skill.score}%</p>
                      <TrendingUp size={16} className={skill.score >= 75 ? 'text-green-600' : 'text-red-600'} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Topics Analysis */}
      {viewType === 'topics' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Topic-wise Performance</h3>
          <div className="space-y-3">
            {[
              { topic: 'Array Operations', accuracy: 42, attempts: 123 },
              { topic: 'Linked Lists', accuracy: 38, attempts: 98 },
              { topic: 'Tree Traversals', accuracy: 55, attempts: 87 },
              { topic: 'Graph Algorithms', accuracy: 48, attempts: 102 },
              { topic: 'Dynamic Programming', accuracy: 35, attempts: 145 },
            ].map((topic, idx) => (
              <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border-l-4 border-slate-400">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-slate-900 dark:text-white">{topic.topic}</p>
                  <span className={`text-sm font-bold ${topic.accuracy >= 50 ? 'text-green-600' : 'text-red-600'}`}>
                    {topic.accuracy}% Accuracy
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>{topic.attempts} attempts</span>
                  <div className="w-32 h-2 bg-slate-300 dark:bg-slate-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${topic.accuracy >= 50 ? 'bg-green-500' : 'bg-red-500'}`}
                      style={{ width: `${topic.accuracy}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-3 flex items-center gap-2">
          <Zap size={18} />
          Recommendations
        </h3>
        <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          <li>• <strong>Priority 1:</strong> Create intensive DSA & System Design training modules (affects 22 candidates)</li>
          <li>• <strong>Priority 2:</strong> Implement peer mentoring program for Database Design (12 candidates need improvement)</li>
          <li>• <strong>Observation:</strong> Candidates scoring above 75% in Code Quality - consider them for mentoring roles</li>
        </ul>
      </div>
    </div>
  );
};

export default GapAnalysis;
