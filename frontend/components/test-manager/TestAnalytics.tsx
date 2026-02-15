import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, CheckCircle, AlertCircle, Download } from 'lucide-react';

interface TestAnalytics {
  testId: string;
  testName: string;
  totalCandidates: number;
  avgScore: number;
  highestScore: number;
  lowestScore: number;
  passRate: number;
  timeAverage: number;
  completionRate: number;
  difficultyIndex: number;
  discriminationIndex: number;
  standardDeviation: number;
  questionPerformance: QuestionMetric[];
}

interface QuestionMetric {
  questionId: string;
  questionTitle: string;
  correctCount: number;
  incorrectCount: number;
  accuracy: number;
  avgTime: number;
  difficulty: number;
  discrimination: number;
}

const mockTestAnalytics: TestAnalytics = {
  testId: '1',
  testName: 'Java Fundamentals Assessment',
  totalCandidates: 25,
  avgScore: 72.4,
  highestScore: 95,
  lowestScore: 35,
  passRate: 76,
  timeAverage: 45.5,
  completionRate: 92,
  difficultyIndex: 0.65,
  discriminationIndex: 0.72,
  standardDeviation: 15.3,
  questionPerformance: [
    { questionId: '1', questionTitle: 'Array Data Structures', correctCount: 22, incorrectCount: 3, accuracy: 88, avgTime: 2.5, difficulty: 0.45, discrimination: 0.78 },
    { questionId: '2', questionTitle: 'Binary Tree Traversal', correctCount: 18, incorrectCount: 7, accuracy: 72, avgTime: 4.2, difficulty: 0.65, discrimination: 0.82 },
    { questionId: '3', questionTitle: 'Dynamic Programming', correctCount: 12, incorrectCount: 13, accuracy: 48, avgTime: 6.8, difficulty: 0.85, discrimination: 0.75 },
    { questionId: '4', questionTitle: 'Exception Handling', correctCount: 20, incorrectCount: 5, accuracy: 80, avgTime: 3.1, difficulty: 0.55, discrimination: 0.68 },
  ],
};

const TestAnalytics: React.FC = () => {
  const [selectedTest, setSelectedTest] = useState(mockTestAnalytics);
  const [viewType, setViewType] = useState<'overview' | 'questions' | 'time' | 'detailed'>('overview');

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-600 dark:text-green-400';
    if (accuracy >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 0.33) return 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300';
    if (difficulty <= 0.66) return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300';
    return 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300';
  };

  return (
    <div className="space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics</h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{selectedTest.testName}</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* View Type Tabs */}
      <div className="flex gap-2 border-b border-slate-200 dark:border-slate-700">
        {(['overview', 'questions', 'time', 'detailed'] as const).map(type => (
          <button
            key={type}
            onClick={() => setViewType(type)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              viewType === type
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {type === 'overview' && 'Overview'}
            {type === 'questions' && 'Question Performance'}
            {type === 'time' && 'Time Analytics'}
            {type === 'detailed' && 'Detailed Report'}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {viewType === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Average Score</p>
                <BarChart3 className="text-indigo-600" size={20} />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{selectedTest.avgScore.toFixed(1)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">out of 100</p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Pass Rate</p>
                <CheckCircle className="text-green-600" size={20} />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{selectedTest.passRate}%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{Math.round((selectedTest.passRate / 100) * selectedTest.totalCandidates)} passed</p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Completion Rate</p>
                <TrendingUp className="text-blue-600" size={20} />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{selectedTest.completionRate}%</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{Math.round((selectedTest.completionRate / 100) * selectedTest.totalCandidates)} completed</p>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">Std. Deviation</p>
                <AlertCircle className="text-orange-600" size={20} />
              </div>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">{selectedTest.standardDeviation.toFixed(1)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Score spread</p>
            </div>
          </div>

          {/* Score Distribution */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-medium text-slate-900 dark:text-white mb-4">Score Distribution</h3>
            <div className="space-y-3">
              {[90, 80, 70, 60, 50, 40, 30, 20, 10, 0].map(score => (
                <div key={score} className="flex items-center gap-3">
                  <div className="w-12 text-sm font-medium text-slate-600 dark:text-slate-400">{score}+</div>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all"
                      style={{ width: `${Math.random() * 100}%` }}
                    />
                  </div>
                  <div className="w-8 text-sm text-right text-slate-600 dark:text-slate-400">
                    {Math.floor(Math.random() * 10)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="font-medium text-slate-900 dark:text-white mb-4">Score Range</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Highest</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedTest.highestScore}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Lowest</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedTest.lowestScore}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Range</span>
                  <span className="font-bold text-slate-900 dark:text-white">{selectedTest.highestScore - selectedTest.lowestScore}</span>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
              <h3 className="font-medium text-slate-900 dark:text-white mb-4">Quality Metrics</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Difficulty Index</span>
                  <span className="font-bold text-slate-900 dark:text-white">{(selectedTest.difficultyIndex * 100).toFixed(0)}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Discrimination Index</span>
                  <span className="font-bold text-slate-900 dark:text-white">{(selectedTest.discriminationIndex * 100).toFixed(0)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Question Performance Tab */}
      {viewType === 'questions' && (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Question</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Correct</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Incorrect</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Accuracy</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Avg Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-700 dark:text-slate-300 uppercase">Difficulty</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {selectedTest.questionPerformance.map(q => (
                <tr key={q.questionId} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">{q.questionTitle}</td>
                  <td className="px-6 py-4 text-sm text-green-600 dark:text-green-400">{q.correctCount}</td>
                  <td className="px-6 py-4 text-sm text-red-600 dark:text-red-400">{q.incorrectCount}</td>
                  <td className={`px-6 py-4 text-sm font-medium ${getAccuracyColor(q.accuracy)}`}>{q.accuracy}%</td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{q.avgTime}m</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(q.difficulty)}`}>
                      {(q.difficulty * 100).toFixed(0)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Time Analytics Tab */}
      {viewType === 'time' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-medium text-slate-900 dark:text-white mb-4">Time Metrics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Average Test Duration</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{selectedTest.timeAverage.toFixed(1)}m</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Min</p>
                  <p className="font-bold text-slate-900 dark:text-white">18m</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Max</p>
                  <p className="font-bold text-slate-900 dark:text-white">72m</p>
                </div>
                <div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Median</p>
                  <p className="font-bold text-slate-900 dark:text-white">44m</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-medium text-slate-900 dark:text-white mb-4">Time Distribution</h3>
            <div className="space-y-2">
              {['0-20m', '20-40m', '40-60m', '60-80m'].map((range, idx) => (
                <div key={range} className="flex items-center gap-3">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-16">{range}</span>
                  <div className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-full h-4">
                    <div
                      className="bg-blue-600 h-full rounded-full"
                      style={{ width: `${(idx + 1) * 25}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400 w-8">{(idx + 1) * 3}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Detailed Report - Summary */}
      {viewType === 'detailed' && (
        <div className="space-y-4">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-700 rounded-lg p-6">
            <h3 className="font-medium text-indigo-900 dark:text-indigo-300 mb-3">Executive Summary</h3>
            <p className="text-sm text-indigo-800 dark:text-indigo-400 leading-relaxed">
              The assessment demonstrates a good overall performance with {selectedTest.passRate}% pass rate. 
              The average score of {selectedTest.avgScore.toFixed(1)} and standard deviation of {selectedTest.standardDeviation.toFixed(1)} 
              indicate moderate spread in candidate abilities. The discrimination index of {(selectedTest.discriminationIndex * 100).toFixed(0)}% 
              shows the test effectively differentiates between high and low performers, making it a reliable assessment tool.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-6">
            <h3 className="font-medium text-slate-900 dark:text-white mb-4">Recommendations</h3>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>• Review difficult questions (DP, complexity) for clarity and relevance</li>
              <li>• Consider adjusting passing score threshold based on distribution</li>
              <li>• Provide targeted training for topics with low accuracy rates</li>
              <li>• Analyze outlier performances for potential cheating detection</li>
              <li>• Reuse high discrimination questions in future assessments</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestAnalytics;
