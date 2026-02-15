import React, { useState } from 'react';
import { Plus, Trash2, Search, ChevronDown } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'MCQ' | 'Coding' | 'Theory';
  marks: number;
}

interface TestConfig {
  name: string;
  description: string;
  category: string;
  duration: number;
  passingScore: number;
  difficulty: 'Mixed' | 'Easy' | 'Medium' | 'Hard';
}

const mockQuestions: Question[] = [
  { id: '1', title: 'Array Data Structures', category: 'Data Structures', difficulty: 'Easy', type: 'MCQ', marks: 1 },
  { id: '2', title: 'Binary Tree Traversal', category: 'Data Structures', difficulty: 'Medium', type: 'Coding', marks: 5 },
  { id: '3', title: 'Dynamic Programming Basics', category: 'Algorithms', difficulty: 'Hard', type: 'Coding', marks: 5 },
  { id: '4', title: 'Java Generics', category: 'Java', difficulty: 'Medium', type: 'Theory', marks: 2 },
  { id: '5', title: 'Database Normalization', category: 'Database', difficulty: 'Medium', type: 'MCQ', marks: 1 },
  { id: '6', title: 'SQL Joins', category: 'Database', difficulty: 'Easy', type: 'MCQ', marks: 1 },
];

const TestFromPool: React.FC = () => {
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [testConfig, setTestConfig] = useState<TestConfig>({
    name: '',
    description: '',
    category: 'General',
    duration: 60,
    passingScore: 60,
    difficulty: 'Mixed',
  });

  const filteredQuestions = mockQuestions.filter(q => {
    const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
    const isNotSelected = !selectedQuestions.find(sq => sq.id === q.id);
    return matchesSearch && matchesDifficulty && isNotSelected;
  });

  const handleAddQuestion = (question: Question) => {
    setSelectedQuestions([...selectedQuestions, question]);
  };

  const handleRemoveQuestion = (id: string) => {
    setSelectedQuestions(selectedQuestions.filter(q => q.id !== id));
  };

  const totalMarks = selectedQuestions.reduce((sum, q) => sum + q.marks, 0);

  const handleCreateTest = () => {
    if (!testConfig.name || selectedQuestions.length === 0) {
      alert('Please enter test name and select at least one question');
      return;
    }
    console.log('Creating test:', { ...testConfig, questions: selectedQuestions, totalMarks });
    alert('Test created successfully!');
    setSelectedQuestions([]);
    setTestConfig({ name: '', description: '', category: 'General', duration: 60, passingScore: 60, difficulty: 'Mixed' });
  };

  return (
    <div className="space-y-6">
      {/* Test Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Test Name *
          </label>
          <input
            type="text"
            value={testConfig.name}
            onChange={(e) => setTestConfig({ ...testConfig, name: e.target.value })}
            placeholder="e.g., Java Fundamentals Assessment"
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Description
          </label>
          <textarea
            value={testConfig.description}
            onChange={(e) => setTestConfig({ ...testConfig, description: e.target.value })}
            placeholder="Test description..."
            rows={2}
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Category
          </label>
          <select
            value={testConfig.category}
            onChange={(e) => setTestConfig({ ...testConfig, category: e.target.value })}
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>General</option>
            <option>Java</option>
            <option>Python</option>
            <option>Databases</option>
            <option>DevOps</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Duration (minutes)
          </label>
          <input
            type="number"
            value={testConfig.duration}
            onChange={(e) => setTestConfig({ ...testConfig, duration: parseInt(e.target.value) })}
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Passing Score (%)
          </label>
          <input
            type="number"
            value={testConfig.passingScore}
            onChange={(e) => setTestConfig({ ...testConfig, passingScore: parseInt(e.target.value) })}
            min="0"
            max="100"
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Difficulty Level
          </label>
          <select
            value={testConfig.difficulty}
            onChange={(e) => setTestConfig({ ...testConfig, difficulty: e.target.value as any })}
            className="w-full px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>Mixed</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>
        </div>
      </div>

      {/* Question Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Available Questions */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Available Questions
            </label>
            <div className="flex gap-2 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <select
                  value={filterDifficulty}
                  onChange={(e) => setFilterDifficulty(e.target.value as any)}
                  className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option>All</option>
                  <option>Easy</option>
                  <option>Medium</option>
                  <option>Hard</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50">
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map(question => (
                <div
                  key={question.id}
                  className="flex items-start justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-slate-900 dark:text-white truncate">
                      {question.title}
                    </h4>
                    <div className="flex gap-2 mt-1 flex-wrap">
                      <span className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-1 rounded">
                        {question.category}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        question.difficulty === 'Easy'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                          : question.difficulty === 'Medium'
                          ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                      }`}>
                        {question.difficulty}
                      </span>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-1 rounded">
                        {question.marks} marks
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAddQuestion(question)}
                    className="ml-2 p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
                No questions available
              </p>
            )}
          </div>
        </div>

        {/* Selected Questions */}
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Selected Questions ({selectedQuestions.length})
            </label>
            <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-3 mb-4">
              <p className="text-sm font-medium text-indigo-900 dark:text-indigo-300">
                Total Marks: <span className="font-bold">{totalMarks}</span>
              </p>
            </div>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-lg p-4 bg-slate-50 dark:bg-slate-800/50">
            {selectedQuestions.length > 0 ? (
              selectedQuestions.map((question, index) => (
                <div
                  key={question.id}
                  className="flex items-start justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {index + 1}. {question.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {question.marks} marks • {question.difficulty}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveQuestion(question.id)}
                    className="ml-2 p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors flex-shrink-0"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-6">
                No questions selected
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Create Button */}
      <div className="flex gap-3 justify-end">
        <button className="px-6 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
          Cancel
        </button>
        <button
          onClick={handleCreateTest}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50"
          disabled={selectedQuestions.length === 0 || !testConfig.name}
        >
          Create Test
        </button>
      </div>
    </div>
  );
};

export default TestFromPool;
