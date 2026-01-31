import api from "./api";

export const recruiterApi = {
  getProfile: async (recruiterId:string) => {
    const res = await api.get(`/recruiter/${recruiterId}`);
    return res.data;
  },

  updateProfile: async (recruiterId:string,data: any) => {
    const res = await api.put(`/recruiter/${recruiterId}`, data);
    return res.data;
  },

  deleteProfile: async (recruiterId: string) => {
    const res = await api.delete(`/recruiter/${recruiterId}`);
    return res.data;
  },
};
