import { create } from "zustand";
import { BASE_URL } from "./config";

// const BASE_URL = "http://localhost:3000";
const useUserStore = create((set, get) => ({
  user: null, //state
  login: async (email, pass, isEmployer) => {
    const endpoint = isEmployer
      ? `${BASE_URL}/login/employer`
      : `${BASE_URL}/login/seeker`;
  
    try {
      // Make the POST request to login
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, pass: pass }),
      });
  
      if (!response.ok) {
        throw new Error("Sign in request failed");
      }
  
      const data = await response.json();
  
      console.log(data)
      // Save JWT to localStorage if available
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
      }
  
      // Call fetchSeeker / Employer to get user data and save it to the Zustand store
      if(!isEmployer){
        await get().fetchSeeker(data.jwt);
      } else{
        await get().fetchEmployer(data.jwt);
      }
  
      return { jwt: data.jwt };
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  },

  register: async (role, data) => {
    const endpoint = role === "employer" 
      ? `${BASE_URL}/register/employer` 
      : `${BASE_URL}/register/seeker`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('Registration failed');
    return response.json();
  },
  
  fetchUser: async () => {
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
      //set user data and a property of type: "seeker" to the 'user' property in the Zustand store
      set({ user: { ...userData, "type": "seeker" } });
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  },
  
  fetchEmployer: async () => {
    try {
      console.log("Fetch Employer Running")
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
      //set user data and a property of type: "seeker" to the 'user' property in the Zustand store
      set({ user: { ...userData, "type": "employer" } });
    } catch (error) {
      console.error("Failed to fetch user", error);
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
    // if theres no jwt or user in localStorage, return null
    if (!localStorage.getItem("jwt"))
      return null;
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