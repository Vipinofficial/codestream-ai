import React, { useState } from 'react';
import { Plus, Copy, Edit, Trash2, Eye, Lock, Users } from 'lucide-react';

interface TestTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  totalQuestions: number;
  duration: number;
  difficulty: string;
  passingScore: number;
  useCount: number;
  author: string;
  lastModified: string;
  config: {
    randomizeQuestions: boolean;
    randomizeOptions: boolean;
    negativeMarking: boolean;
    showAnswers: boolean;
    allowRetake: boolean;
  };
}

const mockTemplates: TestTemplate[] = [
  {
    id: '1',
    name: 'Java Fundamentals',
    description: 'Basic Java concepts and OOP',
    category: 'Java',
    totalQuestions: 40,
    duration: 60,
    difficulty: 'Mixed',
    passingScore: 60,
    useCount: 12,
    author: 'Admin',
    lastModified: '2026-02-10',
    config: {
      randomizeQuestions: true,
      randomizeOptions: true,
      negativeMarking: false,
      showAnswers: false,
      allowRetake: true,
    },
  },
  {
    id: '2',
    name: 'Frontend Interview',
    description: 'HTML, CSS, JavaScript, React, Angular',
    category: 'Frontend',
    totalQuestions: 50,
    duration: 90,
    difficulty: 'Mixed',
    passingScore: 70,
    useCount: 8,
    author: 'Recruiter1',
    lastModified: '2026-02-05',
    config: {
      randomizeQuestions: true,
      randomizeOptions: false,
      negativeMarking: true,
      showAnswers: false,
      allowRetake: false,
    },
  },
  {
    id: '3',
    name: 'DevOps Essentials',
    description: 'Docker, Kubernetes, CI/CD',
    category: 'DevOps',
    totalQuestions: 35,
    duration: 45,
    difficulty: 'Hard',
    passingScore: 75,
    useCount: 5,
    author: 'Admin',
    lastModified: '2026-01-20',
    config: {
      randomizeQuestions: true,
      randomizeOptions: true,
      negativeMarking: true,
      showAnswers: true,
      allowRetake: false,
    },
  },
];

const TestTemplates: React.FC = () => {
  const [templates, setTemplates] = useState(mockTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState<TestTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Java', 'Python', 'Frontend', 'Backend', 'DevOps', 'Database'];

  const filteredTemplates = templates.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || t.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Test Templates</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">Pre-built templates for quick test creation</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          <Plus size={16} />
          Create Template
        </button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex-1 min-w-64">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search templates..."
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
        >
          {categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map(template => (
          <div
            key={template.id}
            onClick={() => setSelectedTemplate(template)}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <h3 className="font-bold text-slate-900 dark:text-white">{template.name}</h3>
              <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-2 py-1 rounded">
                {template.category}
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">{template.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
              <div className="bg-slate-50 dark:bg-slate-700 p-2 rounded">
                <p className="text-slate-500 dark:text-slate-400">Questions</p>
                <p className="font-bold text-slate-900 dark:text-white">{template.totalQuestions}</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-2 rounded">
                <p className="text-slate-500 dark:text-slate-400">Duration</p>
                <p className="font-bold text-slate-900 dark:text-white">{template.duration}m</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-2 rounded">
                <p className="text-slate-500 dark:text-slate-400">Pass Score</p>
                <p className="font-bold text-slate-900 dark:text-white">{template.passingScore}%</p>
              </div>
              <div className="bg-slate-50 dark:bg-slate-700 p-2 rounded">
                <p className="text-slate-500 dark:text-slate-400">Uses</p>
                <p className="font-bold text-slate-900 dark:text-white">{template.useCount}</p>
              </div>
            </div>

            {/* Config Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template.config.randomizeQuestions && (
                <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-2 py-1 rounded">
                  Randomized
                </span>
              )}
              {template.config.negativeMarking && (
                <span className="text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-2 py-1 rounded">
                  Negative Mark
                </span>
              )}
              {template.config.allowRetake && (
                <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                  Retakeable
                </span>
              )}
            </div>

            <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
              <button className="flex-1 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 py-2 rounded transition-colors">
                <Eye size={14} className="inline mr-1" />
                View
              </button>
              <button className="flex-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 py-2 rounded transition-colors">
                <Copy size={14} className="inline mr-1" />
                Use
              </button>
              <button className="text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-2 rounded transition-colors">
                <Edit size={14} />
              </button>
              <button className="text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 px-3 py-2 rounded transition-colors">
                <Trash2 size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Template Details Panel */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-slate-200 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedTemplate.name}</h2>
                <button onClick={() => setSelectedTemplate(null)} className="text-slate-500 hover:text-slate-700">×</button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Configuration</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <span className={selectedTemplate.config.randomizeQuestions ? 'text-green-600' : 'text-slate-500'}>
                      ✓ Randomize Questions
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={selectedTemplate.config.randomizeOptions ? 'text-green-600' : 'text-slate-500'}>
                      ✓ Randomize Options
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={selectedTemplate.config.negativeMarking ? 'text-green-600' : 'text-slate-500'}>
                      ✓ Negative Marking
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={selectedTemplate.config.showAnswers ? 'text-green-600' : 'text-slate-500'}>
                      ✓ Show Answers
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={selectedTemplate.config.allowRetake ? 'text-green-600' : 'text-slate-500'}>
                      ✓ Allow Retake
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <h3 className="font-semibold text-slate-900 dark:text-white mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                    Create Test from This
                  </button>
                  <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                    Edit Template
                  </button>
                  <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
                    Duplicate
                  </button>
                  <button className="px-4 py-2 border border-red-200 dark:border-red-700 rounded-lg text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestTemplates;
