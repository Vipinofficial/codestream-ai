import React, { useState } from 'react';
import { History, GitBranch, Redo, Copy, Calendar } from 'lucide-react';

const TestVersionControl: React.FC = () => {
  const [activeVersion, setActiveVersion] = useState<string>('v3');
  const [comparison, setComparison] = useState<string | null>(null);

  const versions = [
    {
      id: 'v3',
      name: 'Version 3.0',
      date: '2026-02-10',
      time: '3:30 PM',
      author: 'Admin',
      questions: 12,
      changes: 'Updated difficulty levels',
      status: 'Current',
    },
    {
      id: 'v2',
      name: 'Version 2.1',
      date: '2026-02-05',
      time: '11:15 AM',
      author: 'John Doe',
      questions: 10,
      changes: 'Added 2 new questions',
      status: 'Published',
    },
    {
      id: 'v1',
      name: 'Version 1.0',
      date: '2026-01-28',
      time: '9:00 AM',
      author: 'Admin',
      questions: 8,
      changes: 'Initial creation',
      status: 'Archive',
    },
  ];

  const activeVersionData = versions.find(v => v.id === activeVersion);
  const compareVersionData = comparison ? versions.find(v => v.id === comparison) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Test Version Control</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
          Create Snapshot
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Version Timeline */}
        <div className="col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
              <History size={18} />
              Version History
            </h3>
            <div className="space-y-3">
              {versions.map((version, idx) => (
                <div
                  key={version.id}
                  className={`p-4 border-2 rounded-lg transition-all cursor-pointer ${
                    activeVersion === version.id
                      ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50'
                  }`}
                  onClick={() => setActiveVersion(version.id)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">{version.name}</h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {version.date} at {version.time} by {version.author}
                      </p>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded ${
                      version.status === 'Current'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : version.status === 'Published'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                    }`}>
                      {version.status}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-2">{version.changes}</p>
                  <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400">
                    <span>{version.questions} Questions</span>
                  </div>

                  {/* Version Actions */}
                  <div className="flex gap-2 mt-3 pt-3 border-t border-slate-200 dark:border-slate-600">
                    <button className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-600 rounded hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-900 dark:text-white">
                      <Eye size={14} className="inline mr-1" />
                      Preview
                    </button>
                    <button className="px-2 py-1 text-xs bg-slate-200 dark:bg-slate-600 rounded hover:bg-slate-300 dark:hover:bg-slate-500 text-slate-900 dark:text-white">
                      <Copy size={14} className="inline mr-1" />
                      Duplicate
                    </button>
                    {version.id !== 'v3' && (
                      <button className="px-2 py-1 text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded hover:bg-indigo-200">
                        <Redo size={14} className="inline mr-1" />
                        Restore
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Version Details Sidebar */}
        <div className="space-y-4">
          {activeVersionData && (
            <>
              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Version Details</h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Version Name</p>
                    <p className="font-medium text-slate-900 dark:text-white">{activeVersionData.name}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Created By</p>
                    <p className="font-medium text-slate-900 dark:text-white">{activeVersionData.author}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Status</p>
                    <p className="font-medium text-slate-900 dark:text-white">{activeVersionData.status}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Total Questions</p>
                    <p className="font-medium text-slate-900 dark:text-white">{activeVersionData.questions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Changes</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-600"></span>
                    <span className="text-slate-700 dark:text-slate-300">Configuration updated</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <span className="text-slate-700 dark:text-slate-300">Difficulty levels modified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                    <span className="text-slate-700 dark:text-slate-300">Scoring rules changed</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Changelog Detail */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Detailed Changelog</h3>
        <div className="space-y-4">
          <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border-l-4 border-green-600">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Question Difficulty Updated</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">4 questions moved from Medium to Hard</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border-l-4 border-blue-600">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Test Configuration Modified</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Time limit changed from 60 to 90 minutes</p>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg border-l-4 border-orange-600">
            <p className="text-sm font-medium text-slate-900 dark:text-white">Scoring Rules Updated</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Negative marking changed from 0.25 to 0.33</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Eye = ({ size }: any) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>;

export default TestVersionControl;
