import React, { useState } from 'react';
import { Brain, Zap, BarChart3, Users, BookOpen, CheckCircle, AlertTriangle } from 'lucide-react';

const AdvancedFeatures: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<'plagiarism' | 'gapanalysis' | 'skills' | 'interview' | 'benchmark'>('plagiarism');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Advanced Features</h2>
      </div>

      {/* Feature Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700 overflow-x-auto pb-0">
        {[
          { id: 'plagiarism', label: 'Plagiarism Detection', icon: Brain },
          { id: 'gapanalysis', label: 'Gap Analysis', icon: BarChart3 },
          { id: 'skills', label: 'Skill Mapping', icon: BookOpen },
          { id: 'interview', label: 'Interview Integration', icon: Users },
          { id: 'benchmark', label: 'Benchmarking', icon: Zap },
        ].map(feature => (
          <button
            key={feature.id}
            onClick={() => setActiveFeature(feature.id as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
              activeFeature === feature.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            <feature.icon size={16} className="inline mr-2" />
            {feature.label}
          </button>
        ))}
      </div>

      {/* Plagiarism Detection */}
      {activeFeature === 'plagiarism' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Plagiarism Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">Enable Text-Based Plagiarism Detection</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-3 mb-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">Enable Code Plagiarism Detection</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Plagiarism Threshold (%)
                </label>
                <input
                  type="number"
                  defaultValue="30"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Percentage above which content is flagged</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Detections</h3>
            <div className="space-y-3">
              {[
                { candidate: 'John Doe', test: 'Java Fundamentals', similarity: 85, status: 'Flagged' },
                { candidate: 'Jane Smith', test: 'Frontend Skills', similarity: 15, status: 'Clear' },
                { candidate: 'Mike Johnson', test: 'DevOps Assessment', similarity: 42, status: 'Review' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium text-slate-900 dark:text-white">{item.candidate}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.test}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white">{item.similarity}%</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">Similarity</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded ${
                      item.status === 'Flagged'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : item.status === 'Review'
                        ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                        : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gap Analysis */}
      {activeFeature === 'gapanalysis' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Skill Gap Analysis</h3>
            <div className="space-y-4">
              {[
                { skill: 'Data Structures', avgScore: 68, target: 80, gap: 12 },
                { skill: 'Algorithms', avgScore: 52, target: 75, gap: 23 },
                { skill: 'Database Design', avgScore: 71, target: 80, gap: 9 },
                { skill: 'System Design', avgScore: 45, target: 70, gap: 25 },
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-slate-900 dark:text-white">{item.skill}</h4>
                    <span className={`text-sm font-bold ${item.gap <= 10 ? 'text-green-600' : 'text-red-600'}`}>
                      Gap: {item.gap}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mb-2">
                    <span>Current: {item.avgScore}%</span>
                    <span>Target: {item.target}%</span>
                  </div>
                  <div className="flex gap-2 h-2">
                    <div className="flex-1 bg-slate-300 dark:bg-slate-600 rounded-full overflow-hidden">
                      <div className="bg-indigo-600 h-full" style={{ width: `${item.avgScore}%` }} />
                    </div>
                    <div className="w-8 text-xs text-slate-600 dark:text-slate-400">{item.avgScore}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skill Mapping */}
      {activeFeature === 'skills' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Skill Assessment Matrix</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Test</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Problem Solving</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Code Quality</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Communication</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Time Management</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {[
                    { test: 'Java Fundamentals', ps: 85, cq: 78, comm: 0, tm: 72 },
                    { test: 'Frontend Skills', ps: 79, cq: 88, comm: 80, tm: 85 },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{item.test}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded text-xs">
                          {item.ps}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded text-xs">
                          {item.cq}%
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {item.comm > 0 ? (
                          <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded text-xs">
                            {item.comm}%
                          </span>
                        ) : (
                          <span className="text-slate-500">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 px-2 py-1 rounded text-xs">
                          {item.tm}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Interview Integration */}
      {activeFeature === 'interview' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Auto-Schedule Interviews</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Auto-schedule interview if score {`>`} (%)
                </label>
                <input
                  type="number"
                  defaultValue="70"
                  min="0"
                  max="100"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Interview Type
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700">
                  <option>Technical Interview</option>
                  <option>HR Round</option>
                  <option>Behavioral Interview</option>
                  <option>Both</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">Send interview confirmation email</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Scheduled Interviews</h3>
            <div className="space-y-2">
              {[
                { candidate: 'John Doe', date: '2026-02-15', time: '10:00 AM', status: 'Scheduled' },
                { candidate: 'Jane Smith', date: '2026-02-16', time: '02:00 PM', status: 'Confirmed' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white">{item.candidate}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{item.date} at {item.time}</p>
                  </div>
                  <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 rounded">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Benchmarking */}
      {activeFeature === 'benchmark' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Performance Benchmarking</h3>
          <div className="space-y-4">
            {[
              { metric: 'Average Score', current: 72, batches: 70, industry: 65 },
              { metric: 'Pass Rate', current: 76, batches: 72, industry: 68 },
              { metric: 'Avg Time Taken', current: 45, batches: 48, industry: 50 },
            ].map((item, idx) => (
              <div key={idx} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-slate-900 dark:text-white">{item.metric}</h4>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{item.current}%</span>
                </div>
                <div className="flex gap-2 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex-1">
                    <p>Your Batch</p>
                    <div className="mt-1 w-full bg-slate-300 dark:bg-slate-600 h-2 rounded-full">
                      <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${item.current}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p>All Batches</p>
                    <div className="mt-1 w-full bg-slate-300 dark:bg-slate-600 h-2 rounded-full">
                      <div className="bg-orange-600 h-full rounded-full" style={{ width: `${item.batches}%` }} />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p>Industry Avg</p>
                    <div className="mt-1 w-full bg-slate-300 dark:bg-slate-600 h-2 rounded-full">
                      <div className="bg-green-600 h-full rounded-full" style={{ width: `${item.industry}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedFeatures;
