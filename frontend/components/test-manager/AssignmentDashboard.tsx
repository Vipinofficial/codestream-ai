import React, { useState } from 'react';
import { BarChart3, Users, Send, Eye, CheckCircle, Award, TrendingUp, Activity } from 'lucide-react';

const AssignmentDashboard: React.FC = () => {
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>('1');

  const assignments = [
    {
      id: '1',
      testName: 'Java Fundamentals - Batch 2026-01',
      totalCandidates: 25,
      invited: 25,
      inProgress: 8,
      completed: 12,
      pending: 5,
      averageScore: 72,
      passRate: 78,
      status: 'active',
      startDate: '2026-02-05',
      dueDate: '2026-02-15',
      createdBy: 'Admin',
    },
    {
      id: '2',
      testName: 'Frontend Skills - Q1 2026',
      totalCandidates: 18,
      invited: 18,
      inProgress: 4,
      completed: 14,
      pending: 0,
      averageScore: 68,
      passRate: 72,
      status: 'completed',
      startDate: '2026-01-20',
      dueDate: '2026-02-03',
      createdBy: 'Recruiter',
    },
  ];

  const selectedAssignmentData = assignments.find(a => a.id === selectedAssignment);

  const candidateStatusList = [
    { name: 'John Doe', status: 'completed', score: 85, time: '58 mins', submitted: '2026-02-10' },
    { name: 'Jane Smith', status: 'completed', score: 92, time: '45 mins', submitted: '2026-02-10' },
    { name: 'Mike Johnson', status: 'in-progress', score: null, time: null, submitted: null },
    { name: 'Sarah Lee', status: 'pending', score: null, time: null, submitted: null },
    { name: 'David Brown', status: 'completed', score: 76, time: '72 mins', submitted: '2026-02-09' },
    { name: 'Emily Davis', status: 'in-progress', score: null, time: null, submitted: null },
  ];

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      {selectedAssignmentData && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total', value: selectedAssignmentData.totalCandidates, icon: Users, color: 'blue' },
              { label: 'In Progress', value: selectedAssignmentData.inProgress, icon: Activity, color: 'orange' },
              { label: 'Completed', value: selectedAssignmentData.completed, icon: CheckCircle, color: 'green' },
              { label: 'Avg Score', value: selectedAssignmentData.averageScore + '%', icon: TrendingUp, color: 'purple' },
            ].map((card, idx) => {
              const Icon = card.icon;
              const colorMap = {
                blue: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
                orange: 'bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300',
                green: 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300',
                purple: 'bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300',
              };
              return (
                <div key={idx} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${colorMap[card.color as keyof typeof colorMap]}`}>
                    <Icon size={24} />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{card.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{card.value}</p>
                </div>
              );
            })}
          </div>

          {/* Progress Bars */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-6">Test Progress</h3>
            <div className="space-y-6">
              {[
                { label: 'Invited', count: selectedAssignmentData.invited, total: selectedAssignmentData.totalCandidates, color: 'bg-blue-600' },
                { label: 'In Progress', count: selectedAssignmentData.inProgress, total: selectedAssignmentData.totalCandidates, color: 'bg-orange-600' },
                { label: 'Completed', count: selectedAssignmentData.completed, total: selectedAssignmentData.totalCandidates, color: 'bg-green-600' },
                { label: 'Pass Rate', count: Math.round((selectedAssignmentData.completed * selectedAssignmentData.passRate) / 100), total: selectedAssignmentData.completed, color: 'bg-indigo-600' },
              ].map((item, idx) => (
                <div key={idx}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {item.count}/{item.total} ({Math.round((item.count / item.total) * 100)}%)
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} transition-all`}
                      style={{ width: `${(item.count / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Candidate Status Table */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Candidate Status</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-slate-50 dark:bg-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Candidate</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Score</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Time Taken</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Submitted</th>
                    <th className="px-4 py-3 text-left font-medium text-slate-700 dark:text-slate-300">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {candidateStatusList.map((candidate, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                      <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{candidate.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          candidate.status === 'completed'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : candidate.status === 'in-progress'
                            ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                            : 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300'
                        }`}>
                          {candidate.status === 'in-progress' ? 'In Progress' : candidate.status === 'completed' ? 'Completed' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {candidate.score ? (
                          <span className={`font-bold ${candidate.score >= 70 ? 'text-green-600' : 'text-red-600'}`}>
                            {candidate.score}%
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3">{candidate.time || '-'}</td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">{candidate.submitted || '-'}</td>
                      <td className="px-4 py-3">
                        <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm">
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Performance Insights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Score Distribution</h3>
              <div className="space-y-2">
                {[
                  { range: '90-100%', count: 3, color: 'bg-green-600' },
                  { range: '70-89%', count: 6, color: 'bg-blue-600' },
                  { range: '50-69%', count: 2, color: 'bg-yellow-600' },
                  { range: '<50%', count: 1, color: 'bg-red-600' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <span className="text-sm w-20 text-slate-600 dark:text-slate-400">{item.range}</span>
                    <div className="flex-1 h-6 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex items-center">
                      <div className={`h-full ${item.color}`} style={{ width: `${(item.count / 12) * 100}%` }} />
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white w-6">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Question Performance</h3>
              <div className="space-y-3">
                {[
                  { question: 'Q1: Arrays', correct: 18, percentage: 85 },
                  { question: 'Q2: Loops', correct: 20, percentage: 95 },
                  { question: 'Q3: Classes', correct: 12, percentage: 57 },
                  { question: 'Q4: Exception Handling', correct: 15, percentage: 71 },
                ].map((q, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-xs font-medium w-32 text-slate-700 dark:text-slate-300 truncate">{q.question}</span>
                    <div className="flex-1 h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${q.percentage >= 70 ? 'bg-green-600' : 'bg-orange-600'}`}
                        style={{ width: `${q.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold w-10 text-right text-slate-900 dark:text-white">{q.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6">
            <h3 className="font-bold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center gap-2">
              <CheckCircle size={20} />
              Next Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-white dark:bg-indigo-900/30 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-indigo-900/50 transition-colors">
                <p className="font-medium text-slate-900 dark:text-white">Generate Report</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">View detailed analytics</p>
              </button>
              <button className="p-4 bg-white dark:bg-indigo-900/30 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-indigo-900/50 transition-colors">
                <p className="font-medium text-slate-900 dark:text-white">Send Feedback</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">To all candidates</p>
              </button>
              <button className="p-4 bg-white dark:bg-indigo-900/30 rounded-lg text-left hover:bg-slate-50 dark:hover:bg-indigo-900/50 transition-colors">
                <p className="font-medium text-slate-900 dark:text-white">Issue Certificates</p>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">For passing candidates</p>
              </button>
            </div>
          </div>
        </>
      )}

      {/* Assignment Selector */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
        <h3 className="font-bold text-slate-900 dark:text-white mb-4">Select Assignment</h3>
        <div className="space-y-2">
          {assignments.map(assignment => (
            <button
              key={assignment.id}
              onClick={() => setSelectedAssignment(assignment.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAssignment === assignment.id
                  ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                  : 'border-slate-200 dark:border-slate-700 hover:border-indigo-300'
              }`}
            >
              <p className="font-bold text-slate-900 dark:text-white">{assignment.testName}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                {assignment.completed}/{assignment.totalCandidates} completed • {assignment.passRate}% pass rate
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentDashboard;
