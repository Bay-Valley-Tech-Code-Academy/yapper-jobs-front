import { create } from "zustand";
import { BASE_URL } from "./config";

const useUserStore = create((set, get) => ({
  user: null, // state

  loginSeeker: async (email, pass) => {
    const endpoint = `${BASE_URL}/login/seeker`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pass }),
      });

      if (!response.ok) {
        throw new Error("Sign in request failed");
      }

      const data = await response.json();
      if (!data.jwt) {
        throw new Error("Failed to log in as seeker");
      }

      localStorage.setItem("jwt", data.jwt);

      const userData = await get().fetchSeeker(data.jwt);
      if (!userData) {
        throw new Error("Failed to fetch seeker data");
      }

      return { ...data, role: "seeker" };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },

  // Employer login function
  loginEmployer: async (email, pass) => {
    const endpoint = `${BASE_URL}/login/employer`;

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, pass }),
      });

      if (!response.ok) {
        throw new Error("Sign in request failed");
      }

      const data = await response.json();
      if (!data.jwt) {
        throw new Error("Failed to login as employer");
      }

      localStorage.setItem("jwt", data.jwt);

      const userData = await get().fetchEmployer(data.jwt);
      if (!userData) {
        throw new Error("Failed to fetch employer data");
      }

      return { ...data, role: "employer" };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    }
  },
  fetchSeeker: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("No JWT token found");

      const response = await fetch(`${BASE_URL}/seeker`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`, // Assuming the JWT is stored in localStorage
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch seeker data");
      }

      const userData = await response.json();
      // set user data and a property of type: "seeker" to the 'user' property in the Zustand store
      set({ user: { ...userData, type: "seeker" } });
      return userData; // Return the fetched user data
    } catch (error) {
      console.error("Failed to fetch user", error);
      return null; // Ensure to return null if fetching fails
    }
  },

  fetchEmployer: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      if (!jwt) throw new Error("No JWT token found");

      const response = await fetch(`${BASE_URL}/employer`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`, // Assuming the JWT is stored in localStorage
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch employer data");
      }

      const userData = await response.json();
      // set user data and a property of type: "employer" to the 'user' property in the Zustand store
      set({ user: { ...userData, type: "employer" } });
      return userData; // Return the fetched user data
    } catch (error) {
      console.error("Failed to fetch user", error);
      return null; // Ensure to return null if fetching fails
    }
  },

  forgetPassword: async (email) => {
    const response = await fetch(`${BASE_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email");
    }

    return response.json();
  },

  resetPassword: async (newPassword, token) => {
    const response = await fetch(`${BASE_URL}/reset-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token: token, newPassword: newPassword }),
    });

    if (!response.ok) throw new Error("Password reset request failed");
    return response.json();
  },

  logout: async () => {
    // if there's no jwt or user in localStorage, return null
    if (!localStorage.getItem("jwt")) return null;
    try {
      const response = await fetch(`${BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });

      if (!response.ok) throw new Error("Failed to log out");

      localStorage.removeItem("jwt");
      localStorage.removeItem("savedJobs");
      return response.json();
    } catch (error) {
      console.error("Failed to log out", error);
    }
  },
}));

export default useUserStore;
