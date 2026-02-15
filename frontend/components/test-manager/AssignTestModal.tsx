import React, { useState } from 'react';
import { X, Plus, Trash2, Search } from 'lucide-react';

interface CandidateGroup {
  id: string;
  name: string;
  candidateCount: number;
  description: string;
}

interface TestAssignment {
  testId: string;
  testName: string;
  groups: CandidateGroup[];
  assignedAt: string;
  dueDate: string;
  allowRetake: boolean;
  maxAttempts: number;
}

const mockGroups: CandidateGroup[] = [
  { id: '1', name: 'Java Batch 2026', candidateCount: 25, description: 'January intake candidates' },
  { id: '2', name: 'Frontend Engineers', candidateCount: 18, description: 'Front-end development track' },
  { id: '3', name: 'Full Stack Developers', candidateCount: 32, description: 'Full-stack development track' },
  { id: '4', name: 'DevOps Specialists', candidateCount: 12, description: 'DevOps and infrastructure' },
  { id: '5', name: 'Data Scientists', candidateCount: 15, description: 'Data science and ML roles' },
];

interface AssignTestModalProps {
  testId: string;
  testName: string;
  isOpen: boolean;
  onClose: () => void;
  onAssign: (assignment: TestAssignment) => void;
}

const AssignTestModal: React.FC<AssignTestModalProps> = ({ testId, testName, isOpen, onClose, onAssign }) => {
  const [selectedGroups, setSelectedGroups] = useState<CandidateGroup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [allowRetake, setAllowRetake] = useState(false);
  const [maxAttempts, setMaxAttempts] = useState(1);

  const filteredGroups = mockGroups.filter(
    g => g.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
         !selectedGroups.find(sg => sg.id === g.id)
  );

  const handleAddGroup = (group: CandidateGroup) => {
    setSelectedGroups([...selectedGroups, group]);
  };

  const handleRemoveGroup = (id: string) => {
    setSelectedGroups(selectedGroups.filter(g => g.id !== id));
  };

  const totalCandidates = selectedGroups.reduce((sum, g) => sum + g.candidateCount, 0);

  const handleAssign = () => {
    if (selectedGroups.length === 0 || !dueDate) {
      alert('Please select at least one group and set a due date');
      return;
    }

    const assignment: TestAssignment = {
      testId,
      testName,
      groups: selectedGroups,
      assignedAt: new Date().toISOString().split('T')[0],
      dueDate,
      allowRetake,
      maxAttempts,
    };

    onAssign(assignment);
    console.log('Test assigned:', assignment);
    
    // Reset form
    setSelectedGroups([]);
    setDueDate('');
    setAllowRetake(false);
    setMaxAttempts(1);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Assign Test</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{testName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X size={24} className="text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Configuration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Due Date *
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Max Attempts
              </label>
              <input
                type="number"
                min="1"
                value={maxAttempts}
                onChange={(e) => setMaxAttempts(parseInt(e.target.value))}
                disabled={!allowRetake}
                className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              />
            </div>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={allowRetake}
              onChange={(e) => setAllowRetake(e.target.checked)}
              className="w-4 h-4 text-indigo-600 border-slate-300 rounded focus:ring-2 focus:ring-indigo-500"
            />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Allow Retakes
            </span>
          </label>

          {/* Group Selection */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Available Groups */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Available Groups
              </label>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search groups..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800/50">
                {filteredGroups.map(group => (
                  <div
                    key={group.id}
                    className="flex items-start justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                        {group.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {group.candidateCount} candidates
                      </p>
                    </div>
                    <button
                      onClick={() => handleAddGroup(group)}
                      className="ml-2 p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                ))}
                {filteredGroups.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
                    No groups available
                  </p>
                )}
              </div>
            </div>

            {/* Selected Groups */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
                Selected Groups ({selectedGroups.length})
              </label>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3 mb-4">
                <p className="text-sm font-medium text-blue-900 dark:text-blue-300">
                  Total Candidates: <span className="font-bold">{totalCandidates}</span>
                </p>
              </div>

              <div className="space-y-2 max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg p-3 bg-slate-50 dark:bg-slate-800/50">
                {selectedGroups.map(group => (
                  <div
                    key={group.id}
                    className="flex items-start justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-900 dark:text-white">
                        {group.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {group.candidateCount} candidates
                      </p>
                    </div>
                    <button
                      onClick={() => handleRemoveGroup(group.id)}
                      className="ml-2 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors flex-shrink-0"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {selectedGroups.length === 0 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
                    No groups selected
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 justify-end p-6 border-t border-slate-200 dark:border-slate-800 sticky bottom-0 bg-white dark:bg-slate-900">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={selectedGroups.length === 0 || !dueDate}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            Assign Test
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignTestModal;
