import React, { useState } from 'react';
import { Plus, Trash2, Edit, Upload, Filter, Send, Share2 } from 'lucide-react';
import AssignTestModal from './AssignTestModal';
import EmailSendModal from './EmailSendModal';

const mockTests = [
  { id: 1, name: 'Session 2 Data Types, Variables & Type Casting - MCQs', startDate: '31-01-2026', endDate: '31-01-2026', status: 'Inactive', questions: 40, level: 'Beginner', candidates: 20, product: '', testCategory: 'Java Session 1 MCQ', testTemplate: 'SSC 2018' },
  { id: 2, name: 'Session 2', startDate: '31-01-2026', endDate: '31-01-2026', status: 'Inactive', questions: 3, level: 'Beginner', candidates: 20, product: '', testCategory: 'Java Session 1 MCQ', testTemplate: 'Default' },
  { id: 3, name: 'Session 1', startDate: '30-01-2026', endDate: '30-01-2026', status: 'Active', questions: 40, level: 'Beginner', candidates: 3, product: '', testCategory: 'Java Session 1 MCQ', testTemplate: 'SAT' },
];

const mockCandidates = [
  { email: 'john.doe@example.com', name: 'John Doe', group: 'Java Batch 2026' },
  { email: 'jane.smith@example.com', name: 'Jane Smith', group: 'Java Batch 2026' },
  { email: 'mike.johnson@example.com', name: 'Mike Johnson', group: 'Java Batch 2026' },
  { email: 'sarah.williams@example.com', name: 'Sarah Williams', group: 'Java Batch 2026' },
  { email: 'david.brown@example.com', name: 'David Brown', group: 'Java Batch 2026' },
];

const TestList: React.FC = () => {
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [selectedTestName, setSelectedTestName] = useState('');

  const handleAssignTest = (testId: number, testName: string) => {
    setSelectedTestId(testId);
    setSelectedTestName(testName);
    setShowAssignModal(true);
  };

  const handleOpenEmailModal = (testId: number, testName: string) => {
    setSelectedTestId(testId);
    setSelectedTestName(testName);
    setShowEmailModal(true);
  };

  const handleSendEmails = (recipients: any[], message: string, subject: string) => {
    console.log('Sending emails to:', recipients);
    console.log('Subject:', subject);
    console.log('Message:', message);
    // API call would go here
    alert(`Emails sent to ${recipients.length} candidates!`);
  };

  const handleAssignment = (assignment: any) => {
    console.log('Test assigned:', assignment);
    alert(`Test assigned to ${assignment.groups.length} groups with ${assignment.groups.reduce((sum: number, g: any) => sum + g.candidateCount, 0)} candidates!`);
    setShowAssignModal(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tests</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Filter size={16} />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Upload size={16} />
            Import QTI
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
            <Plus size={16} />
            Create Test
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
            <Trash2 size={16} />
            Delete
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl">
          <thead className="bg-slate-50 dark:bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">S.No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Test Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">End Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Questions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Template</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {mockTests.map((test, index) => (
              <tr key={test.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium max-w-xs truncate">{test.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{test.startDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{test.endDate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    test.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {test.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{test.questions}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{test.level}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{test.testCategory}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{test.testTemplate}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAssignTest(test.id, test.name)}
                      className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      title="Assign to Groups"
                    >
                      <Share2 size={18} />
                    </button>
                    <button
                      onClick={() => handleOpenEmailModal(test.id, test.name)}
                      className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors"
                      title="Send Invites"
                    >
                      <Send size={18} />
                    </button>
                    <button className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Edit">
                      <Edit size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modals */}
      {selectedTestId && (
        <>
          <AssignTestModal
            testId={selectedTestId.toString()}
            testName={selectedTestName}
            isOpen={showAssignModal}
            onClose={() => setShowAssignModal(false)}
            onAssign={handleAssignment}
          />
          <EmailSendModal
            testId={selectedTestId.toString()}
            testName={selectedTestName}
            recipients={mockCandidates}
            isOpen={showEmailModal}
            onClose={() => setShowEmailModal(false)}
            onSend={handleSendEmails}
          />
        </>
      )}
    </div>
  );
};

export default TestList;
