const API_URL = 'http://localhost:5000/api';

// Token management
const getToken = () => localStorage.getItem('cs_token');
const setToken = (token) => localStorage.setItem('cs_token', token);
const removeToken = () => localStorage.removeItem('cs_token');

export const api = {
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }
    
    const data = await response.json();
    
    // Store the JWT token
    if (data.token) {
      setToken(data.token);
    }
    
    return data;
  },

  register: async (name, email, password, role) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }
    
    const data = await response.json();
    
    // Store the JWT token
    if (data.token) {
      setToken(data.token);
    }
    
    return data;
  },

  logout: async () => {
    try {
      const token = getToken();
      if (token) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
      }
    } catch (e) {
      // Ignore logout errors
    } finally {
      removeToken();
    }
    return { message: 'Logged out successfully' };
  },

  getCurrentUser: async () => {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      removeToken();
      throw new Error('Session expired');
    }
    
    return response.json();
  },

  getChallenges: async () => {
    const token = getToken();
    const response = await fetch(`${API_URL}/challenges`, {
      headers: token ? {
        'Authorization': `Bearer ${token}`,
      } : {},
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch challenges');
    }
    return response.json();
  },

  createChallenge: async (challengeData) => {
    const token = getToken();
    const response = await fetch(`${API_URL}/challenges`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(challengeData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create challenge');
    }
    return response.json();
  },

  getMCQQuestions: async (filters = {}) => {
    const token = getToken();
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/questions/mcq?${params}`, {
      headers: token ? {
        'Authorization': `Bearer ${token}`,
      } : {},
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch MCQ questions');
    }
    return response.json();
  },

  createMCQQuestion: async (questionData) => {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch(`${API_URL}/questions/mcq`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(questionData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create question');
    }
    return response.json();
  },

  getCodingQuestions: async (filters = {}) => {
    const token = getToken();
    const params = new URLSearchParams(filters);
    const response = await fetch(`${API_URL}/questions/coding?${params}`, {
      headers: token ? {
        'Authorization': `Bearer ${token}`,
      } : {},
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch coding questions');
    }
    return response.json();
  },

  createCodingQuestion: async (questionData) => {
    const token = getToken();
    if (!token) {
      throw new Error('Not authenticated');
    }
    
    const response = await fetch(`${API_URL}/questions/coding`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(questionData),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create question');
    }
    return response.json();
  },
};
