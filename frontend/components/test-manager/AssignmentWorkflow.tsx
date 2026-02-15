import React, { useState } from 'react';
import { ArrowRight, CheckCircle, Clock, Send, BarChart3, Award, Users, Settings, Eye } from 'lucide-react';

interface AssignmentStep {
  id: number;
  title: string;
  description: string;
  icon: any;
  completed: boolean;
}

interface TestAssignment {
  id: string;
  testName: string;
  selectedGroups: string[];
  candidateCount: number;
  emailTemplate: string;
  selectedCandidates: any[];
  status: 'draft' | 'assigned' | 'in-progress' | 'completed';
  startDate: string;
  dueDate: string;
  createdAt: string;
}

const AssignmentWorkflow: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [assignments, setAssignments] = useState<TestAssignment[]>([
    {
      id: '1',
      testName: 'Java Fundamentals - Batch 2026-01',
      selectedGroups: ['Java Batch 2026'],
      candidateCount: 15,
      emailTemplate: 'standard',
      selectedCandidates: [],
      status: 'in-progress',
      startDate: '2026-02-05',
      dueDate: '2026-02-15',
      createdAt: '2026-02-01',
    },
  ]);

  const [formData, setFormData] = useState({
    testName: '',
    selectedGroups: [] as string[],
    emailTemplate: 'standard',
    notificationFrequency: 'daily',
  });

  const steps: AssignmentStep[] = [
    {
      id: 1,
      title: 'Select Test',
      description: 'Choose which test to assign',
      icon: BarChart3,
      completed: true,
    },
    {
      id: 2,
      title: 'Select Candidates',
      description: 'Choose candidates/groups',
      icon: Users,
      completed: true,
    },
    {
      id: 3,
      title: 'Configure',
      description: 'Set timing & rules',
      icon: Settings,
      completed: false,
    },
    {
      id: 4,
      title: 'Send Invites',
      description: 'Send emails to candidates',
      icon: Send,
      completed: false,
    },
    {
      id: 5,
      title: 'Monitor',
      description: 'Track submissions',
      icon: Eye,
      completed: false,
    },
    {
      id: 6,
      title: 'Complete',
      description: 'Generate reports & certificates',
      icon: Award,
      completed: false,
    },
  ];

  const mockTests = [
    { id: 1, name: 'Java Fundamentals', questions: 40, level: 'Beginner' },
    { id: 2, name: 'Frontend Skills', questions: 30, level: 'Intermediate' },
    { id: 3, name: 'System Design', questions: 20, level: 'Advanced' },
  ];

  const mockGroups = [
    { id: 1, name: 'Java Batch 2026', candidates: 25 },
    { id: 2, name: 'Frontend Batch 2026', candidates: 18 },
    { id: 3, name: 'DevOps Team', candidates: 12 },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Workflow Steps */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">Test Assignment Workflow</h2>

        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              return (
                <div key={step.id} className="flex items-center flex-1">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all ${
                      currentStep >= step.id
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    {step.completed ? (
                      <CheckCircle size={20} />
                    ) : (
                      <StepIcon size={20} />
                    )}
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        currentStep > step.id
                          ? 'bg-indigo-600'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-6 gap-2 mt-4">
            {steps.map(step => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className="text-left"
              >
                <p className="text-xs font-semibold text-slate-900 dark:text-white">{step.title}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">{step.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg p-8 min-h-72">
          {/* Step 1: Select Test */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select Test</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Choose a test to assign to candidates
              </p>
              <div className="space-y-2">
                {mockTests.map(test => (
                  <label
                    key={test.id}
                    className="flex items-center p-4 border border-slate-200 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  >
                    <input type="radio" name="test" className="w-4 h-4" defaultChecked={test.id === 1} />
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">{test.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {test.questions} questions • {test.level}
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Candidates/Groups */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Select Candidates</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Choose which groups to assign this test to
              </p>
              <div className="space-y-2">
                {mockGroups.map(group => (
                  <label
                    key={group.id}
                    className="flex items-center p-4 border border-slate-200 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-white dark:hover:bg-slate-800 transition-colors"
                  >
                    <input type="checkbox" className="w-4 h-4" defaultChecked={group.id === 1} />
                    <div className="ml-4 flex-1">
                      <p className="font-medium text-slate-900 dark:text-white">{group.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {group.candidates} candidates
                      </p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Configure */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Configure Test Settings</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-02-15"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Due Date
                  </label>
                  <input
                    type="date"
                    defaultValue="2026-02-25"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-3 mt-4">
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-slate-700 dark:text-slate-300">Enable proctoring</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-slate-700 dark:text-slate-300">Randomize questions</span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-slate-700 dark:text-slate-300">Allow retakes</span>
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Send Invites */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Send Invitations</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Configure email template and send invitations
              </p>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Email Template
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800">
                  <option>Standard Test Invitation</option>
                  <option>Urgent Assessment Required</option>
                  <option>Skills Assessment</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Notification Schedule
                </label>
                <select className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800">
                  <option>Send immediately</option>
                  <option>Send today at 5 PM</option>
                  <option>Send tomorrow at 9 AM</option>
                </select>
              </div>

              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  ✓ Ready to send invitations to <strong>25 candidates</strong> from selected groups
                </p>
              </div>

              <button className="w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium flex items-center justify-center gap-2">
                <Send size={18} />
                Send Invitations
              </button>
            </div>
          )}

          {/* Step 5: Monitor */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Monitor Progress</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Track test submissions and proctoring
              </p>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Invited</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-white">25</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
                  <p className="text-xs text-slate-600 dark:text-slate-400">In Progress</p>
                  <p className="text-2xl font-bold text-indigo-600">8</p>
                </div>
                <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
                  <p className="text-xs text-slate-600 dark:text-slate-400">Completed</p>
                  <p className="text-2xl font-bold text-green-600">12</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-medium text-slate-900 dark:text-white">Recent Activity</p>
                {[
                  { name: 'John Doe', action: 'Started test', time: '5 mins ago' },
                  { name: 'Jane Smith', action: 'Submitted test', time: '15 mins ago' },
                  { name: 'Mike Johnson', action: 'Started test', time: '1 hour ago' },
                ].map((activity, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-600">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{activity.name}</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{activity.action}</p>
                    </div>
                    <span className="text-xs text-slate-600 dark:text-slate-400">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Complete */}
          {currentStep === 6 && (
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Complete & Report</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                Generate reports and certificates
              </p>

              <div className="grid grid-cols-2 gap-4">
                <button className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <BarChart3 size={24} className="text-indigo-600 mb-2" />
                  <p className="font-medium text-slate-900 dark:text-white">Generate Report</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">View analytics & scores</p>
                </button>

                <button className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Award size={24} className="text-green-600 mb-2" />
                  <p className="font-medium text-slate-900 dark:text-white">Issue Certificates</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">For passing candidates</p>
                </button>

                <button className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Users size={24} className="text-blue-600 mb-2" />
                  <p className="font-medium text-slate-900 dark:text-white">Gap Analysis</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">Identify skill gaps</p>
                </button>

                <button className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <Send size={24} className="text-orange-600 mb-2" />
                  <p className="font-medium text-slate-900 dark:text-white">Send Feedback</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">To all candidates</p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
          <button
            onClick={handlePreviousStep}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-300'
            }`}
          >
            Previous
          </button>

          <span className="text-sm text-slate-600 dark:text-slate-400">
            Step {currentStep} of {steps.length}
          </span>

          <button
            onClick={handleNextStep}
            disabled={currentStep === steps.length}
            className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              currentStep === steps.length
                ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Active Assignments */}
      <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-8">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Active Assignments</h3>
        <div className="space-y-4">
          {assignments.map(assignment => (
            <div
              key={assignment.id}
              className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 rounded-lg"
            >
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 dark:text-white">{assignment.testName}</h4>
                <div className="flex gap-6 mt-2 text-sm text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users size={16} />
                    {assignment.candidateCount} candidates
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    Due: {assignment.dueDate}
                  </span>
                  <span className={`flex items-center gap-1 font-medium ${
                    assignment.status === 'in-progress' ? 'text-indigo-600' : 'text-green-600'
                  }`}>
                    <CheckCircle size={16} />
                    {assignment.status === 'in-progress' ? 'In Progress' : 'Completed'}
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 text-sm font-medium">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignmentWorkflow;
