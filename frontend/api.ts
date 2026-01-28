import { User, Challenge, UserCredentials } from './types';

// In a real app, this would be in a .env file
const API_BASE_URL = '/api'; 

// A utility function to handle API requests
async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers = {
    'Content-Type': 'application/json',
    // We might add an Authorization header here if using token-based auth
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${url}`, { ...options, headers });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  
  // For DELETE or other requests that might not have a body
  if (response.status === 204) {
    return null as T;
  }

  return response.json();
}

// --- Auth APIs ---
export const login = (credentials: UserCredentials): Promise<User> => {
  return fetchApi<User>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const logout = (): Promise<void> => {
  return fetchApi<void>('/auth/logout', {
    method: 'POST',
  });
};

export const checkSession = (): Promise<User> => {
  return fetchApi<User>('/auth/me');
};

// --- Challenge APIs ---
export const getChallenges = (): Promise<Challenge[]> => {
  return fetchApi<Challenge[]>('/challenges');
};

export const createChallenge = (challengeData: Omit<Challenge, 'id'>): Promise<Challenge> => {
  return fetchApi<Challenge>('/challenges', {
    method: 'POST',
    body: JSON.stringify(challengeData),
  });
};

// --- Assessment APIs ---
export const startAssessmentSession = (challengeId: string): Promise<{ sessionId: string }> => {
    return fetchApi<{ sessionId: string }>(`/assessments/start`, {
        method: 'POST',
        body: JSON.stringify({ challengeId }),
    });
}