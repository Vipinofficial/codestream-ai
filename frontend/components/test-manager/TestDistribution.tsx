import React, { useState } from 'react';
import { ChevronDown, Eye, Mail, Trash2, BarChart3 } from 'lucide-react';

interface TestAssignmentRecord {
  id: string;
  testName: string;
  groupName: string;
  candidateCount: number;
  assignedDate: string;
  dueDate: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  completed: number;
  inProgress: number;
  pending: number;
}

const mockAssignments: TestAssignmentRecord[] = [
  {
    id: '1',
    testName: 'Java Fundamentals Assessment',
    groupName: 'Java Batch 2026',
    candidateCount: 25,
    assignedDate: '2026-02-01',
    dueDate: '2026-02-15',
    status: 'In Progress',
    completed: 12,
    inProgress: 8,
    pending: 5,
  },
  {
    id: '2',
    testName: 'Frontend Skills Test',
    groupName: 'Frontend Engineers',
    candidateCount: 18,
    assignedDate: '2026-01-25',
    dueDate: '2026-02-10',
    status: 'In Progress',
    completed: 15,
    inProgress: 3,
    pending: 0,
  },
  {
    id: '3',
    testName: 'Full Stack Dev Challenge',
    groupName: 'Full Stack Developers',
    candidateCount: 32,
    assignedDate: '2026-02-05',
    dueDate: '2026-02-20',
    status: 'Pending',
    completed: 2,
    inProgress: 1,
    pending: 29,
  },
  {
    id: '4',
    testName: 'DevOps Assessment',
    groupName: 'DevOps Specialists',
    candidateCount: 12,
    assignedDate: '2026-01-20',
    dueDate: '2026-02-05',
    status: 'Completed',
    completed: 12,
    inProgress: 0,
    pending: 0,
  },
];

const TestDistribution: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Pending' | 'In Progress' | 'Completed'>('All');

  const filteredAssignments = mockAssignments.filter(a =>
    filterStatus === 'All' || a.status === filterStatus
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getProgressPercentage = (assignment: TestAssignmentRecord) => {
    return Math.round((assignment.completed / assignment.candidateCount) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex gap-3">
        {(['All', 'Pending', 'In Progress', 'Completed'] as const).map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              filterStatus === status
                ? 'bg-indigo-600 text-white'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-600'
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Assignments</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{mockAssignments.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">Total Candidates</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">
            {mockAssignments.reduce((sum, a) => sum + a.candidateCount, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">Tests Completed</p>
          <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
            {mockAssignments.reduce((sum, a) => sum + a.completed, 0)}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
          <p className="text-sm text-slate-600 dark:text-slate-400">Completion Rate</p>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mt-2">
            {filteredAssignments.length > 0
              ? Math.round(
                  (filteredAssignments.reduce((sum, a) => sum + a.completed, 0) /
                    filteredAssignments.reduce((sum, a) => sum + a.candidateCount, 0)) *
                    100
                )
              : 0}
            %
          </p>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-3">
        {filteredAssignments.map(assignment => (
          <div
            key={assignment.id}
            className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-900"
          >
            {/* Main Row */}
            <button
              onClick={() => setExpandedId(expandedId === assignment.id ? null : assignment.id)}
              className="w-full p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex-1 text-left">
                <h3 className="font-medium text-slate-900 dark:text-white">{assignment.testName}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{assignment.groupName}</p>
              </div>

              <div className="flex items-center gap-4 mr-4">
                <div className="text-right">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {assignment.completed}/{assignment.candidateCount}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Completed</p>
                </div>

                <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 transition-all"
                    style={{ width: `${getProgressPercentage(assignment)}%` }}
                  />
                </div>

                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                  {assignment.status}
                </span>
              </div>

              <ChevronDown
                size={20}
                className={`text-slate-500 transition-transform ${expandedId === assignment.id ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Expanded Details */}
            {expandedId === assignment.id && (
              <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-800/50 space-y-4">
                {/* Status Breakdown */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{assignment.pending}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{assignment.inProgress}</p>
                  </div>
                  <div className="bg-white dark:bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Completed</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{assignment.completed}</p>
                  </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Assigned Date</p>
                    <p className="font-medium text-slate-900 dark:text-white">{assignment.assignedDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Due Date</p>
                    <p className="font-medium text-slate-900 dark:text-white">{assignment.dueDate}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Total Candidates</p>
                    <p className="font-medium text-slate-900 dark:text-white">{assignment.candidateCount}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 dark:text-slate-400">Completion Rate</p>
                    <p className="font-medium text-slate-900 dark:text-white">
                      {Math.round((assignment.completed / assignment.candidateCount) * 100)}%
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <button className="flex items-center gap-2 flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <Eye size={16} />
                    View Results
                  </button>
                  <button className="flex items-center gap-2 flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <BarChart3 size={16} />
                    Analytics
                  </button>
                  <button className="flex items-center gap-2 flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                    <Mail size={16} />
                    Remind
                  </button>
                  <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-700 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {filteredAssignments.length === 0 && (
          <div className="text-center py-12 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <p className="text-slate-600 dark:text-slate-400">No assignments found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestDistribution;
