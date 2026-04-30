import axios from "axios";

// Base API configuration
const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "https://wcfw.onrender.com/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

// Contact form submission
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post("/contact", formData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to submit contact form",
    );
  }
};

// Newsletter subscription
export const subscribeNewsletter = async (email) => {
  try {
    const response = await api.post("/newsletter/subscribe", { email });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to subscribe to newsletter",
    );
  }
};

// User authentication
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    const { token, user } = response.data;
    localStorage.setItem("authToken", token);
    return { token, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};

export const logoutUser = () => {
  localStorage.removeItem("authToken");
};

// Get user profile
export const getUserProfile = async () => {
  try {
    const response = await api.get("/user/profile");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch user profile",
    );
  }
};

// Calculator data
export const getSIPRecommendations = async (sipData) => {
  try {
    const response = await api.post("/sip/recommendations", sipData);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to get SIP recommendations",
    );
  }
};

// Blog/Content APIs
export const getBlogPosts = async (category = "", page = 1, limit = 10) => {
  try {
    const response = await api.get("/blog/posts", {
      params: { category, page, limit },
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch blog posts",
    );
  }
};

export const getBlogPost = async (slug) => {
  try {
    const response = await api.get(`/blog/posts/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch blog post",
    );
  }
};

// Market data
export const getMarketData = async () => {
  try {
    const response = await api.get("/market/data");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch market data",
    );
  }
};

// Portfolio APIs
export const getPortfolio = async () => {
  try {
    const response = await api.get("/portfolio");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch portfolio",
    );
  }
};

export const addSIP = async (sipData) => {
  try {
    const response = await api.post("/portfolio/sip", sipData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Failed to add SIP");
  }
};

// Utility function to handle API errors
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || "An error occurred";
  } else if (error.request) {
    // Request made but no response received
    return "Network error. Please check your connection.";
  } else {
    // Something else happened
    return error.message || "An unexpected error occurred";
  }
};

export default api;
