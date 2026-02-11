import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, User, MessageSquare, Zap } from 'lucide-react';

const WorkflowApproval: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pending' | 'approved' | 'rejected' | 'settings'>('pending');

  const approvalRequests = [
    {
      id: 1,
      testName: 'Java Advanced Concepts',
      submittedBy: 'John Smith',
      submittedDate: '2026-02-12',
      status: 'Pending Review',
      questions: 15,
      estimatedTime: '90 mins',
      priority: 'High',
    },
    {
      id: 2,
      testName: 'Frontend Performance Assessment',
      submittedBy: 'Sarah Johnson',
      submittedDate: '2026-02-11',
      status: 'Pending Review',
      questions: 12,
      estimatedTime: '60 mins',
      priority: 'Medium',
    },
    {
      id: 3,
      testName: 'DevOps Fundamentals',
      submittedBy: 'Mike Davis',
      submittedDate: '2026-02-10',
      status: 'Awaiting Feedback',
      questions: 20,
      estimatedTime: '120 mins',
      priority: 'Low',
    },
  ];

  const approvedTests = [
    {
      id: 1,
      testName: 'Python Basics',
      submittedBy: 'John Smith',
      approvedBy: 'Admin',
      approvedDate: '2026-02-08',
      questions: 10,
    },
    {
      id: 2,
      testName: 'Database Design',
      submittedBy: 'Sarah Johnson',
      approvedBy: 'Emily Brown',
      approvedDate: '2026-02-05',
      questions: 14,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Test Approval Workflow</h2>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: 'Pending', value: '3', icon: Clock, color: 'blue' },
          { label: 'Approved', value: '12', icon: CheckCircle, color: 'green' },
          { label: 'Rejected', value: '2', icon: AlertCircle, color: 'red' },
          { label: 'In Progress', value: '5', icon: Zap, color: 'orange' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
                <Icon size={24} className={`text-${stat.color}-600`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {[
          { id: 'pending', label: 'Pending Review (3)', icon: Clock },
          { id: 'approved', label: 'Approved (12)', icon: CheckCircle },
          { id: 'rejected', label: 'Rejected (2)', icon: AlertCircle },
          { id: 'settings', label: 'Approval Settings' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.id
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            {tab.icon && <tab.icon size={16} />}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Pending Review */}
      {activeTab === 'pending' && (
        <div className="space-y-4">
          {approvalRequests.map(request => (
            <div
              key={request.id}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white mb-1">{request.testName}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Submitted by {request.submittedBy} on {request.submittedDate}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs font-medium rounded ${
                  request.priority === 'High'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                    : request.priority === 'Medium'
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                    : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                }`}>
                  {request.priority} Priority
                </span>
              </div>

              <div className="flex gap-6 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <span>{request.questions} Questions</span>
                <span>{request.estimatedTime}</span>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium flex items-center justify-center gap-2">
                  <CheckCircle size={16} />
                  Approve
                </button>
                <button className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 text-sm font-medium">
                  Request Changes
                </button>
                <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-sm font-medium flex items-center justify-center gap-2">
                  <AlertCircle size={16} />
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Approved */}
      {activeTab === 'approved' && (
        <div className="space-y-3">
          {approvedTests.map(test => (
            <div
              key={test.id}
              className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
            >
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{test.testName}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Approved by {test.approvedBy} on {test.approvedDate}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600 dark:text-slate-400">{test.questions} Questions</span>
                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded flex items-center gap-1">
                  <CheckCircle size={14} />
                  Approved
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Approval Workflow Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                  Approval Levels Required
                </label>
                <div className="space-y-2">
                  {[
                    { label: 'Subject Matter Expert Review', enabled: true },
                    { label: 'Manager Approval', enabled: true },
                    { label: 'Admin Sign-off', enabled: false },
                  ].map((level, idx) => (
                    <label key={idx} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        defaultChecked={level.enabled}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                      />
                      <span className="text-slate-700 dark:text-slate-300">{level.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Auto-Approve Tests Below Difficulty
                </label>
                <select className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700">
                  <option>Never Auto-Approve</option>
                  <option>Easy Tests Only</option>
                  <option>Easy & Medium Tests</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">Notify approvers on new submissions</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Approval Timeout (days)
                </label>
                <input
                  type="number"
                  defaultValue="7"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">Designated Approvers</h3>
            <div className="space-y-2">
              {[
                { name: 'Emily Brown', role: 'Assessments Lead' },
                { name: 'Robert Wilson', role: 'Senior Manager' },
              ].map((approver, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                  <div className="flex items-center gap-3">
                    <User size={18} className="text-slate-600 dark:text-slate-400" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{approver.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{approver.role}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 text-xs bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded hover:bg-red-200">
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
              Add Approver
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowApproval;
