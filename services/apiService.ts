
import { User, Challenge, SolutionAnalysis, ChallengeType } from '../types';

/**
 * Backend Simulator Service
 * In a production environment, these methods would call fetch() or an axios instance.
 */

const LATENCY = 300;
const DB_KEY = 'cs_cloud_db';

const getDB = () => JSON.parse(localStorage.getItem(DB_KEY) || '{"sessions": {}, "submissions": []}');
const saveDB = (data: any) => localStorage.setItem(DB_KEY, JSON.stringify(data));

export const apiService = {
  // Simulate fetching candidate pipeline
  fetchPipeline: async () => {
    await new Promise(resolve => setTimeout(resolve, LATENCY));
    return [
      { id: '1', name: 'John Doe', score: 92, status: 'Clear', integrity: '100%', date: '2024-05-15', email: 'john@example.com', active: true },
      { id: '2', name: 'Sarah Chen', score: 88, status: 'Clear', integrity: '98%', date: '2024-05-14', email: 'sarah.c@tech.co', active: true },
      { id: '3', name: 'Mike Ross', score: 45, status: 'Flagged', integrity: '42%', date: '2024-05-14', email: 'mross@suits.com', active: false },
    ];
  },

  // Auto-save code to "cloud"
  syncCodeSession: async (userId: string, challengeId: string, code: string) => {
    await new Promise(resolve => setTimeout(resolve, 150));
    const db = getDB();
    db.sessions[`${userId}_${challengeId}`] = { code, lastUpdated: new Date().toISOString() };
    saveDB(db);
    return { success: true };
  },

  // Submit final analysis to "backend"
  submitSubmission: async (userId: string, challengeId: string, analysis: SolutionAnalysis) => {
    await new Promise(resolve => setTimeout(resolve, LATENCY * 2));
    const db = getDB();
    db.submissions.push({
      userId,
      challengeId,
      analysis,
      timestamp: new Date().toISOString()
    });
    saveDB(db);
    return { id: `sub_${Date.now()}` };
  },

  // Update user profile on "server"
  updateUserProfile: async (user: User) => {
    await new Promise(resolve => setTimeout(resolve, LATENCY));
    // Simulate server-side validation
    if (!user.email.includes('@')) throw new Error("Invalid email format");
    return { ...user, updatedAt: new Date().toISOString() };
  }
};
