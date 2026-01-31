import api from "./api";

export const authApi = {
  login: async (data: {
    email: string;
    password: string;
    role: string;
  }) => {
    const res = await api.post("/auth/login", data);
    if (res.data.token) {
      localStorage.setItem("cs_token", res.data.token);
    }
    return res.data;
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    const res = await api.post("/auth/register", data);
    if (res.data.token) {
      localStorage.setItem("cs_token", res.data.token);
    }
    return res.data;
  },

  logout: async () => {
    await api.post("/auth/logout");
    localStorage.removeItem("cs_token");
  },

  getCurrentUser: async () => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};
