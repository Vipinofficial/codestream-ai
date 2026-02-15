import React, { useState } from 'react';
import { Search, Tag, Filter, Edit, Eye, Trash2, Plus, Copy, Info } from 'lucide-react';

interface Question {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'MCQ' | 'Coding' | 'Theory' | 'File Upload' | 'Text';
  marks: number;
  skills: string[];
  reusageCount: number;
  author: string;
  createdAt: string;
  accuracy?: number;
  pValue?: number;
  discriminationIndex?: number;
  explanation?: string;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    title: 'Array Data Structures - Basics',
    category: 'Data Structures',
    difficulty: 'Easy',
    type: 'MCQ',
    marks: 1,
    skills: ['Arrays', 'Algorithms'],
    reusageCount: 12,
    author: 'Admin',
    createdAt: '2026-01-15',
    accuracy: 88,
    pValue: 0.88,
    discriminationIndex: 0.78,
    explanation: 'Arrays are contiguous memory locations storing elements of the same type.',
  },
  {
    id: '2',
    title: 'Binary Tree Implementation',
    category: 'Data Structures',
    difficulty: 'Hard',
    type: 'Coding',
    marks: 5,
    skills: ['Trees', 'Recursion', 'Algorithms'],
    reusageCount: 8,
    author: 'Recruiter1',
    createdAt: '2026-01-20',
    accuracy: 62,
    pValue: 0.62,
    discriminationIndex: 0.85,
    explanation: 'Implement a binary tree with insert, delete, and search operations.',
  },
  {
    id: '3',
    title: 'SQL Join Operations',
    category: 'Database',
    difficulty: 'Medium',
    type: 'MCQ',
    marks: 1,
    skills: ['SQL', 'Databases'],
    reusageCount: 15,
    author: 'Admin',
    createdAt: '2026-01-10',
    accuracy: 75,
    pValue: 0.75,
    discriminationIndex: 0.68,
    explanation: 'Joins combine rows from two or more tables based on related columns.',
  },
];

const QuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState(mockQuestions);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [filterType, setFilterType] = useState<'All' | 'MCQ' | 'Coding' | 'Theory' | 'File Upload' | 'Text'>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recent' | 'reusage' | 'difficulty' | 'accuracy'>('recent');
  const [viewMode, setViewMode] = useState<'list' | 'analytics'>('list');

  const categories = ['All', 'Data Structures', 'Algorithms', 'Database', 'Java', 'Python'];

  const filteredQuestions = questions
    .filter(q => {
      const matchesSearch = q.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
      const matchesType = filterType === 'All' || q.type === filterType;
      const matchesCategory = filterCategory === 'All' || q.category === filterCategory;
      return matchesSearch && matchesDifficulty && matchesType && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'reusage':
          return b.reusageCount - a.reusageCount;
        case 'difficulty':
          const diffOrder = { Easy: 1, Medium: 2, Hard: 3 };
          return diffOrder[a.difficulty] - diffOrder[b.difficulty];
        case 'accuracy':
          return (b.accuracy || 0) - (a.accuracy || 0);
        case 'recent':
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Question Bank</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{filteredQuestions.length} questions</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          <Plus size={16} />
          Add Question
        </button>
      </div>

      {/* View Mode Toggle */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {(['list', 'analytics'] as const).map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              viewMode === mode
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            {mode === 'list' ? 'Questions' : 'Analytics'}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search questions..."
            className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value as any)}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>All Difficulty</option>
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option>All Types</option>
            <option>MCQ</option>
            <option>Coding</option>
            <option>Theory</option>
            <option>File Upload</option>
            <option>Text</option>
          </select>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {categories.map(cat => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="recent">Most Recent</option>
            <option value="reusage">Most Used</option>
            <option value="difficulty">By Difficulty</option>
            <option value="accuracy">By Accuracy</option>
          </select>

          <button className="px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
            <Filter size={16} />
            More
          </button>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {viewMode === 'list' && filteredQuestions.map(question => (
          <div
            key={question.id}
            className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:border-indigo-300 dark:hover:border-indigo-600 transition-colors"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 dark:text-white">{question.title}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">By {question.author} • {question.createdAt}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    question.difficulty === 'Easy'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : question.difficulty === 'Medium'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                  }`}>
                    {question.difficulty}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 items-center text-xs">
                  <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                    {question.category}
                  </span>
                  <span className="bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-700 dark:text-slate-300">
                    {question.type}
                  </span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded text-blue-700 dark:text-blue-300">
                    {question.marks} marks
                  </span>
                  {question.accuracy !== undefined && (
                    <span className="bg-indigo-100 dark:bg-indigo-900/30 px-2 py-1 rounded text-indigo-700 dark:text-indigo-300">
                      {question.accuracy}% accuracy
                    </span>
                  )}
                </div>

                {question.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {question.skills.map(skill => (
                      <span key={skill} className="inline-flex items-center gap-1 text-xs">
                        <Tag size={12} className="text-slate-500" />
                        <span className="text-slate-600 dark:text-slate-400">{skill}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-slate-600 dark:text-slate-400 px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded">
                  Used {question.reusageCount}x
                </span>
                <button className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <Eye size={16} />
                </button>
                <button className="p-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <Copy size={16} />
                </button>
                <button className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 rounded-lg transition-colors">
                  <Edit size={16} />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {viewMode === 'analytics' && (
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50 dark:bg-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Question</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Type</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Used</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">P-Value</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Discrimination</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Accuracy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredQuestions.map(q => (
                  <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{q.title}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{q.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{q.reusageCount}x</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{(q.pValue || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{(q.discriminationIndex || 0).toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        (q.accuracy || 0) >= 75
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : (q.accuracy || 0) >= 50
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                      }`}>
                        {q.accuracy || 0}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
