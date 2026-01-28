
const API_URL = 'http://localhost:3001/api';

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
      throw new Error('Login failed');
    }
    return response.json();
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
        throw new Error('Registration failed');
    }
    return response.json();
  },

  getChallenges: async () => {
    const response = await fetch(`${API_URL}/challenges`);
    if (!response.ok) {
        throw new Error('Failed to fetch challenges');
    }
    return response.json();
  },
};
