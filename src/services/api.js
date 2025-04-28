const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Use full URL in production

// Common headers for all requests
const getHeaders = (token = null) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export const api = {
  async register(userData) {
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
        // If we have validation errors, throw them
        if (data.errors && Array.isArray(data.errors)) {
          throw new Error(data.errors.join(", "));
        }
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

  async login(loginData) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/login`, {
        method: "POST",
        headers: getHeaders(),
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (data.user && data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);
        return {
          user: data.user,
          token: data.token,
        };
      }
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

  async getFacilities() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/api/facility`, {
        headers: getHeaders(token),
      });

      const data = await response.json();

      // Ensure we return an array, even if empty
      if (!Array.isArray(data)) {
        // If data.facilities exists and is an array, return that
        if (data.facilities && Array.isArray(data.facilities)) {
          return data.facilities;
        }
        // If data is an object but not an array, return empty array
        return [];
      }

      return data;
    } catch (error) {
      console.error("Get facilities error:", error);
      // Return empty array on error to prevent mapping errors
      return [];
    }
  },

  async createFacility(facilityData) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const formData = new FormData();
      for (const key in facilityData) {
        if (key === "pictures") {
          facilityData.pictures.forEach((picture) => {
            formData.append("pictures", picture);
          });
        } else {
          formData.append(key, facilityData[key]);
        }
      }

      const response = await fetch(`${API_BASE_URL}/api/facility`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Create facility error:", error);
      throw error;
    }
  },

  async updateFacility(facilityId, facilityData) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      // Create a new object without the id field
      const { id, ...updateData } = facilityData;

      const response = await fetch(
        `${API_BASE_URL}/api/facility/${facilityId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update facility");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Update facility error:", error);
      throw error;
    }
  },

  async deleteFacility(facilityId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/facility/${facilityId}`,
        {
          method: "DELETE",
          headers: getHeaders(token),
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Delete facility error:", error);
      throw error;
    }
  },

  async getFacilityById(facilityId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/facility/${facilityId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get facility by ID error:", error);
      throw error;
    }
  },

  async getFacilityByType(facilityType) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/facility/type/${facilityType}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get facility by type error:", error);
      throw error;
    }
  },

  async getUserBookings() {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/bookings/mine`,
        {
          headers: getHeaders(token),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user bookings");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Get user bookings error:", error);
      return [];
    }
  },

  async createBooking(bookingData) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(`${API_BASE_URL}/api/bookings`, {
        method: "POST",
        headers: getHeaders(token),
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const data = await response.json();
      console.log("Booking created")
      return data;
    } catch (error) {
      console.error("Create booking error:", error);
      throw error;
    }
  },

  async updateBooking(bookingId, bookingData) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/bookings/${bookingId}`,
        {
          method: "PUT",
          headers: getHeaders(token),
          body: JSON.stringify(bookingData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update booking");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Update booking error:", error);
      throw error;
    }
  },

  async deleteBooking(bookingId) {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `${API_BASE_URL}/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: getHeaders(token),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete booking");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Delete booking error:", error);
      throw error;
    }
  },
};
