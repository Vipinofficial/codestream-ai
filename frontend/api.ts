import { User, Challenge, UserCredentials } from './types';

// In a real app, this would be in a .env file
const API_BASE_URL = 'http://localhost:5000/api'; 

// Token management
const getToken = () => localStorage.getItem('cs_token');
const setToken = (token: string) => localStorage.setItem('cs_token', token);
const removeToken = () => localStorage.removeItem('cs_token');

// A utility function to handle API requests
async function fetchApi<T>(url: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
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
export const login = async (credentials: UserCredentials): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Login failed' }));
    throw new Error(errorData.message || 'Login failed');
  }
  
  const data = await response.json();
  
  // Store the token
  if (data.token) {
    setToken(data.token);
  }
  
  return data.user;
};

export const register = async (userData: UserCredentials & { role?: string }): Promise<User> => {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Registration failed' }));
    throw new Error(errorData.message || 'Registration failed');
  }
  
  const data = await response.json();
  
  // Store the token
  if (data.token) {
    setToken(data.token);
  }
  
  return data.user;
};

export const logout = async (): Promise<void> => {
  try {
    await fetchApi<void>('/auth/logout', {
      method: 'POST',
    });
  } finally {
    removeToken();
  }
};

export const checkSession = async (): Promise<User> => {
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
