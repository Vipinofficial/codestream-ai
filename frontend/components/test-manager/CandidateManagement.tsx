import React, { useState } from 'react';
import { Users, Upload, Mail, Award, TrendingUp, Eye, Download, Edit } from 'lucide-react';

interface Candidate {
  id: string;
  name: string;
  email: string;
  group: string;
  testsTaken: number;
  avgScore: number;
  highestScore: number;
  certificatesEarned: number;
  status: 'Passed' | 'Failed' | 'In Progress';
}

const mockCandidates: Candidate[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', group: 'Java Batch 2026', testsTaken: 5, avgScore: 78, highestScore: 92, certificatesEarned: 2, status: 'Passed' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', group: 'Frontend Track', testsTaken: 6, avgScore: 85, highestScore: 95, certificatesEarned: 3, status: 'Passed' },
  { id: '3', name: 'Mike Johnson', email: 'mike@example.com', group: 'Java Batch 2026', testsTaken: 3, avgScore: 45, highestScore: 62, certificatesEarned: 0, status: 'In Progress' },
];

const CandidateManagement: React.FC = () => {
  const [candidates, setCandidates] = useState(mockCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'performance' | 'certificates'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCandidates = candidates.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Candidate Management</h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          <Upload size={16} />
          Import Candidates
        </button>
      </div>

      {/* View Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {(['list', 'performance', 'certificates'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              viewMode === mode
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            {mode === 'list' && <Users size={16} className="inline mr-2" />}
            {mode === 'performance' && <TrendingUp size={16} className="inline mr-2" />}
            {mode === 'certificates' && <Award size={16} className="inline mr-2" />}
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search candidates..."
        className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
      />

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Email</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Group</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Tests Taken</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Avg Score</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {filteredCandidates.map(candidate => (
                <tr key={candidate.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{candidate.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{candidate.email}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{candidate.group}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{candidate.testsTaken}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{candidate.avgScore}%</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      candidate.status === 'Passed'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                        : candidate.status === 'Failed'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                    }`}>
                      {candidate.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <button onClick={() => setSelectedCandidate(candidate)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Performance View */}
      {viewMode === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredCandidates.map(candidate => (
            <div key={candidate.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white">{candidate.name}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{candidate.group}</p>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Average Score</span>
                  <span className="font-bold text-slate-900 dark:text-white">{candidate.avgScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Highest Score</span>
                  <span className="font-bold text-slate-900 dark:text-white">{candidate.highestScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Tests Taken</span>
                  <span className="font-bold text-slate-900 dark:text-white">{candidate.testsTaken}</span>
                </div>
              </div>
              <button className="mt-4 w-full px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                View Detailed Report
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Certificates View */}
      {viewMode === 'certificates' && (
        <div className="space-y-3">
          {filteredCandidates.map(candidate => (
            <div key={candidate.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-slate-900 dark:text-white">{candidate.name}</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{candidate.certificatesEarned} certificate{candidate.certificatesEarned !== 1 ? 's' : ''} earned</p>
                </div>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                  <Award size={16} className="inline mr-2" />
                  Generate Certificate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Candidate Detail Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg max-w-2xl w-full p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedCandidate.name}</h3>
              <button onClick={() => setSelectedCandidate(null)} className="text-slate-500">×</button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">Email</p>
                <p className="font-semibold text-slate-900 dark:text-white">{selectedCandidate.email}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">Group</p>
                <p className="font-semibold text-slate-900 dark:text-white">{selectedCandidate.group}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">Average Score</p>
                <p className="font-semibold text-slate-900 dark:text-white">{selectedCandidate.avgScore}%</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg">
                <p className="text-xs text-slate-600 dark:text-slate-400">Certificates</p>
                <p className="font-semibold text-slate-900 dark:text-white">{selectedCandidate.certificatesEarned}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                View Performance
              </button>
              <button className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                Send Feedback
              </button>
              <button className="flex-1 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                Generate Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateManagement;
