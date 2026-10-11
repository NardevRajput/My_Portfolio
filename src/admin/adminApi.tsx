import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// ==========================================
// AXIOS REQUEST INTERCEPTOR
// ==========================================

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ==========================================
// ADMIN LOGIN
// ==========================================

export const loginAdmin = async (
  username: string,
  password: string
) => {
  const response = await API.post("/auth/login", {
    username,
    password,
  });

  return response.data;
};

// ==========================================
// FORGOT PASSWORD - SEND OTP
// ==========================================

export const forgotPassword = async (
  username: string,
  method: "EMAIL" | "SMS"
) => {
  const response = await API.post("/auth/forgot-password", {
    username,
    method,
  });

  return response.data as {
    message: string;
    requestId: number;
  };
};

// ==========================================
// VERIFY OTP
// ==========================================

export const verifyOtp = async (
  requestId: number,
  otp: string
) => {
  const response = await API.post("/auth/verify-otp", {
    requestId,
    otp,
  });

  return response.data as {
    message: string;
    resetToken: string;
  };
};

// ==========================================
// RESET PASSWORD
// ==========================================

export const resetPassword = async (
  resetToken: string,
  newPassword: string
) => {
  const response = await API.post("/auth/reset-password", {
    resetToken,
    newPassword,
  });

  return response.data as {
    message: string;
  };
};

// ==========================================
// GET CONTACTS
// ==========================================

export const getContacts = async () => {
  const response = await API.get(
    "/api/contact/admin/contacts"
  );

  return response.data;
};

// ==========================================
// DELETE CONTACT
// ==========================================

export const deleteContact = async (id: number) => {
  const response = await API.delete(
    `/api/contact/admin/${id}`
  );

  return response.data;
};

// ==========================================
// UPLOAD / UPDATE HOME HERO IMAGE
// ==========================================

export const uploadHeroImage = async (image: File) => {
  const formData = new FormData();

  formData.append("image", image);

  const response = await API.put(
    "/api/home/hero-image",
    formData
  );

  return response.data;
};

// ==========================================
// GET PUBLIC HOME HERO IMAGE URL
// ==========================================

export const getHeroImageUrl = () => {
  return `${import.meta.env.VITE_API_URL}/api/home/hero-image`;
};

// ==========================================
// DELETE HOME HERO IMAGE
// ==========================================

export const deleteHeroImage = async () => {
  const response = await API.delete(
    "/api/home/hero-image"
  );

  return response.data;
};

// ==========================================
// EXPORT API INSTANCE
// ==========================================

export default API;