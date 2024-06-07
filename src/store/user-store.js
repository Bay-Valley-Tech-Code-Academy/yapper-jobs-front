import { create } from "zustand";

const BASE_URL = "http://localhost:3000";
const useUserStore = create((set) => ({
  user: null,
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
  
      // Save JWT to localStorage if available
      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
      }
  
      // Make the GET request to fetch user data
      const userResponse = await fetch(`${BASE_URL}/seeker`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.jwt}`, // Include JWT in headers
        },
      });
  
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }
  
      const userData = await userResponse.json();
  
      // Save user data to the 'user' property in the Zustand store
      if (userData) {
        set({ user: userData });
      }
  
      return { user: userData, jwt: data.jwt };
    } catch (error) {
      console.error("Error during login:", error);
      throw error; // Rethrow the error to handle it in the calling code
    }
  },
  
  fetchUser: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`${BASE_URL}/seeker`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`, // Assuming the JWT is stored in localStorage
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await response.json();
      set({ user: userData });
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  },
  forgetPassword: async (email) => {
    const response = await fetch(`${BASE_URL}/forget-password`, {
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
  resetPassword: async (newPassword) => {
    const response = await fetch(`${BASE_URL}/reset-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newPassword: newPassword }),
    });

    if (!response.ok) throw new Error("Password reset request failed");
    return response.json();
  },
  // logout: async () => {
  //   // if theres no jwt or user in localStorage, return null
  //   if (!localStorage.getItem("jwt") || !localStorage.getItem("user"))
  //     return null;
  //   try {
    // const jwt = localStorage.getItem("jwt");
  //     const response = await fetch(`${BASE_URL}/logout`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${jwt}`,
  //       },
  //     });

  //     if (!response.ok) throw new Error("Failed to log out");

  //     localStorage.removeItem("jwt");
  //     return response.json();
  //   } catch (error) {
  //     console.error("Failed to log out", error);
  //   }
  // },
}));

export default useUserStore;