import { BASE_URL } from "./config";

const apiService = {
  login: async (email, pass, isEmployer) => {
    const endpoint = isEmployer
      ? `${BASE_URL}/login/employer`
      : `${BASE_URL}/login/seeker`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, pass: pass }),
    });

    if (!response.ok) throw new Error("Sign in request failed");
    const data = await response.json();
    console.log("Data from apiService:", data)
    //save jwt to localstorage
    // if (data.user.jwt) {
    //   localStorage.setItem("jwt", data.user.jwt);
    // }
    // console.log("Data", data);
    // Save user's information to localStorage
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
    // return response.json();
    return data;
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
  //apply logout function from logout endpoint
  // logout: async () => {
  //   // if theres no jwt or user in localStorage, return null
  //   if (!localStorage.getItem("jwt") || !localStorage.getItem("user"))
  //     return null;
  //   try {
  //     const response = await fetch(`${BASE_URL}/logout`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //       },
  //     });

  //     if (!response.ok) throw new Error("Failed to log out");

  //     localStorage.removeItem("jwt");
  //     localStorage.removeItem("user");
  //     return response.json();
  //   } catch (error) {
  //     console.error("Failed to log out", error);
  //   }
  // },
};

export { apiService };
