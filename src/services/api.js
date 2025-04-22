const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use full URL in production

// Common headers for all requests
const getHeaders = (token = null) => {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const api = {
  async register(userData) {
    console.log("Our API base url", API_BASE_URL);
    console.log("Our user data", userData);
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/register`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Our data", data);

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      return data;
    } catch (error) {
      console.error("Registration error:", error);
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  },

  async login(credentials) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  },

  async getCurrentUser() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/api/user/me`, {
        headers: getHeaders(token),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          throw new Error("Session expired. Please login again.");
        }
        throw new Error(data.message || "Failed to fetch user data");
      }

      return data;
    } catch (error) {
      console.error("Get current user error:", error);
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  },

  // Add more API methods as needed
  async updateProfile(userData) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: getHeaders(token),
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      return data;
    } catch (error) {
      console.error("Update profile error:", error);
      if (error.name === "TypeError" && error.message === "Failed to fetch") {
        throw new Error("Network error. Please check your connection.");
      }
      throw error;
    }
  },
};
