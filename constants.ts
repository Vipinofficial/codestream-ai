
import { Challenge, ChallengeType } from './types';

export const CHALLENGES: Challenge[] = [
  {
    id: '1',
    title: 'Two Sum',
    type: ChallengeType.HYBRID,
    difficulty: 'Easy',
    category: 'Algorithms',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    initialCode: `function twoSum(nums: number[], target: number): number[] {\n  // Write your code here\n  return [];\n}`,
    testCode: `import { twoSum } from './index';\n\ntest('Two Sum - Standard Case', () => {\n  expect(twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);\n});`,
    testCases: [
      { input: '[2, 7, 11, 15], 9', expectedOutput: '[0, 1]' },
      { input: '[3, 2, 4], 6', expectedOutput: '[1, 2]' }
    ],
    mcqs: [
      {
        id: 'ts-q1',
        question: "What is the most efficient time complexity for solving Two Sum using a Hash Map?",
        options: ["O(n^2)", "O(n log n)", "O(n)", "O(1)"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 's1',
    title: 'Financial Forecasting',
    type: ChallengeType.SPREADSHEET,
    difficulty: 'Medium',
    category: 'Data Analysis',
    description: 'Calculate the projected revenue for Q4 based on the monthly growth rate provided in the spreadsheet.',
    spreadsheetData: [
      ['Month', 'Revenue', 'Growth'],
      ['July', '12000', '5%'],
      ['August', '12600', '4%'],
      ['September', '13104', '6%'],
      ['October', '?', ''],
    ]
  },
  {
    id: 'v1',
    title: 'Conflict Resolution',
    type: ChallengeType.VIDEO_RESPONSE,
    difficulty: 'Medium',
    category: 'Behavioral',
    description: 'Describe a time you had a disagreement with a technical lead. How did you handle the situation and what was the outcome?',
  },
  {
    id: 'p_test',
    title: 'Team Collaboration Profile',
    type: ChallengeType.PERSONALITY,
    difficulty: 'Easy',
    category: 'Cultural Fit',
    description: 'A psychometric evaluation to understand your preferred working style and team interaction patterns.',
    personalityQuestions: [
      { id: 'pq1', text: 'I feel energized after long team brainstorming sessions.', dimensions: ['Extroversion'] },
      { id: 'pq2', text: 'I prefer having a strict set of requirements before starting code.', dimensions: ['Orderliness'] },
      { id: 'pq3', text: 'I often mentor junior developers without being asked.', dimensions: ['Leadership'] }
    ]
  },
  {
    id: 'f1',
    title: 'System Architecture Audit',
    type: ChallengeType.FILE_UPLOAD,
    difficulty: 'Hard',
    category: 'Security',
    description: 'Upload your architectural audit report in PDF format for the legacy banking system transition.',
    allowedTypes: ['.pdf', '.docx'],
    maxFileSize: 10485760 // 10MB
  },
  {
    id: 'txt1',
    title: 'Ethical Implications of AI',
    type: ChallengeType.TEXT,
    difficulty: 'Medium',
    category: 'Philosophy',
    description: 'Explain the potential ethical risks of using black-box models in high-stakes healthcare environments.',
  },
  {
    id: 't1',
    title: 'Computer Science Fundamentals',
    type: ChallengeType.THEORY,
    difficulty: 'Medium',
    category: 'CS Core',
    description: 'A comprehensive theory test covering Big O, Memory Management, and Network Protocols.',
    mcqs: [
      {
        id: 'q1',
        question: "What is the worst-case time complexity of Quick Sort?",
        options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
        correctAnswer: 1
      },
      {
        id: 'q2',
        question: "Which OSI layer is responsible for end-to-end communication and error recovery?",
        options: ["Network Layer", "Data Link Layer", "Transport Layer", "Session Layer"],
        correctAnswer: 2
      }
    ]
  },
  {
    id: 'd1',
    title: 'Distributed System Design',
    type: ChallengeType.DESIGN,
    difficulty: 'Hard',
    category: 'Architecture',
    description: 'Design a scalable, highly-available video streaming service like Netflix. Consider global CDN distribution, cache invalidation, and database partitioning.',
    schema: `/* CDN Node Topology */
CREATE TABLE edge_servers (
  id UUID PRIMARY KEY,
  region VARCHAR(50),
  load_percent INT,
  status VARCHAR(20)
);`
  },
  {
    id: 'p1',
    title: 'React Real-time Dashboard',
    type: ChallengeType.PROJECT,
    difficulty: 'Medium',
    category: 'Frontend',
    description: 'Implement a real-time analytics dashboard with WebSocket connectivity. The dashboard should handle high-frequency data updates and provide customizable charting components.',
    testCode: `describe('Dashboard', () => {
  it('should render websocket metrics correctly', () => {
    // Test logic here
  });
});`,
    files: {
      'App.tsx': 'import React from "react";\nimport Dashboard from "./Dashboard";\n\nexport default function App() {\n  return <Dashboard />;\n}',
      'Dashboard.tsx': '// Implement real-time logic here\nexport default function Dashboard() {\n  return <div>Neural Grid Pending...</div>;\n}',
      'types.ts': 'export interface Metric { id: string; val: number; }'
    }
  }
];
