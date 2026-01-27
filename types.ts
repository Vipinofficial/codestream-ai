
export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
  STUDENT = 'STUDENT'
}

export enum ChallengeType {
  CODING = 'CODING',
  THEORY = 'THEORY', // MCQs
  HYBRID = 'HYBRID',
  PROJECT = 'PROJECT', // Multi-file
  DESIGN = 'DESIGN', // Whiteboard
  TEXT = 'TEXT', // Short answer / Text response
  FILE_UPLOAD = 'FILE_UPLOAD',
  SPREADSHEET = 'SPREADSHEET',
  VIDEO_RESPONSE = 'VIDEO_RESPONSE',
  PERSONALITY = 'PERSONALITY'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  preferences?: {
    dyslexiaFont: boolean;
    highContrast: boolean;
    notifications: boolean;
  };
}

export interface Challenge {
  id: string;
  title: string;
  type: ChallengeType;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Elite';
  category: string;
  description: string;
  jobRole?: string;
  experienceLevel?: string;
  timeLimit?: number; // Minutes
  initialCode?: string;
  testCode?: string;
  schema?: string;
  testCases?: TestCase[];
  mcqs?: MCQ[];
  files?: Record<string, string>;
  maxFileSize?: number;
  allowedTypes?: string[];
  spreadsheetData?: any[][];
  personalityQuestions?: PersonalityQuestion[];
  // New configuration fields
  config?: {
    negativeMarking?: boolean;
    randomizeQuestions?: boolean;
    randomizeOptions?: boolean;
    passingScore?: number;
    marksPerQuestion?: number;
    difficultyDistribution?: {
      easy: number;
      medium: number;
      hard: number;
    };
    antiCheat?: {
      tabSwitchDetection: boolean;
      copyPasteRestriction: boolean;
      proctoringRequired: boolean;
      timePerQuestion?: number;
      webcamVerification: boolean;
    }
  }
}

export interface PersonalityQuestion {
  id: string;
  text: string;
  dimensions: string[];
}

export interface CodeSnapshot {
  timestamp: number;
  code: string;
}

export interface SecurityEvent {
  type: 'TAB_SWITCH' | 'COPY' | 'PASTE' | 'BLUR' | 'FOCUS' | 'AI_FLAG';
  timestamp: number;
  details?: string;
}

export interface Template {
  id: string;
  name: string;
  description: string;
  challengeIds: string[];
  createdAt: string;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  skillTag?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  codeSnippet?: string;
}

export interface SolutionAnalysis {
  score: number;
  timeComplexity: string;
  spaceComplexity: string;
  feedback: string;
  optimizations: string[];
  integrityScore?: number;
  securityEvents?: SecurityEvent[];
  codeHistory?: CodeSnapshot[];
}

export enum AppView {
  DASHBOARD = 'DASHBOARD',
  CHALLENGE = 'CHALLENGE',
  TEMPLATES = 'TEMPLATES',
  ADMIN = 'ADMIN',
  ASSESSMENT_START = 'ASSESSMENT_START',
  LOGIN = 'LOGIN',
  SYSTEM_SETTINGS = 'SYSTEM_SETTINGS',
  PROFILE = 'PROFILE',
  LIVE_INTERVIEW = 'LIVE_INTERVIEW',
  WHITEBOARD = 'WHITEBOARD',
  PROJECT = 'PROJECT',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  REQUEST_ACCESS = 'REQUEST_ACCESS'
}

export enum SessionStep {
  PREVIEW = 'PREVIEW',
  MCQ = 'MCQ',
  CODING = 'CODING',
  AI_INTERVIEW = 'AI_INTERVIEW',
  TEXT_RESPONSE = 'TEXT_RESPONSE',
  FILE_UPLOAD = 'FILE_UPLOAD',
  SPREADSHEET = 'SPREADSHEET',
  VIDEO_RESPONSE = 'VIDEO_RESPONSE',
  PERSONALITY = 'PERSONALITY',
  FINISHED = 'FINISHED'
}
