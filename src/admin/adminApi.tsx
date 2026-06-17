import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ADMIN LOGIN
export const loginAdmin = async (username: string, password: string) => {
  const response = await API.post("/auth/login", {
    username,
    password,
  });
  return response.data;
};

// GET CONTACTS
export const getContacts = async () => {
  const response = await API.get("/api/contact/admin/contacts");
  return response.data;
};

// DELETE CONTACT

export const deleteContact = async (id: number) => {
  const response = await API.delete(`/api/contact/admin/${id}`);
  return response.data;
};
export default API;
