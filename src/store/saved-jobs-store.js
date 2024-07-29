import { create } from "zustand";
import { BASE_URL } from "./config";

// const BASE_URL = "http://localhost:3000";
const useSavedJobsStore = create((set) => ({
  savedJobs: [],
  applications: [],
  interviews: [],

  fetchSavedJobsId: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`${BASE_URL}/saved-jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) throw new Error("Failed to get saved jobs");

      const data = await response.json();
      const savedJobs = data.map((item) => item.job_id);
      set({ savedJobs }); // Set the savedJobs array
      //   set({ savedJobs: data });
    } catch (error) {
      console.error("Failed to fetch saved jobs", error);
    }
  },
  fetchSavedJobs: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`${BASE_URL}/saved-jobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) throw new Error("Failed to get saved jobs");

      const data = await response.json();

      set({ savedJobs: data });
    } catch (error) {
      console.error("Failed to fetch saved jobs", error);
    }
  },
  saveJob: async (job_id) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`${BASE_URL}/save-job`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify({ job_id: job_id }),
      });

      if (!response.ok) throw new Error("Failed to save job");
      const data = await response.json();

      // Update savedJobs state to include or remove the job_id
      set((state) => ({
        savedJobs: state.savedJobs.includes(job_id)
          ? state.savedJobs.filter((id) => id !== job_id)
          : [...state.savedJobs, job_id],
      }));

      return data;
    } catch (error) {
      console.error("Failed to save job", error);
    }
  },
  removeJob: async (jobId) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`${BASE_URL}/saved-jobs/${jobId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) throw new Error("Failed to remove job");

      // Update savedJobs state to remove the jobId
      set((state) => ({
        savedJobs: state.savedJobs.filter((id) => id !== jobId),
      }));

      return response.json();
    } catch (error) {
      console.error("Failed to remove job", error);
    }
  },
  fetchApplications: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`${BASE_URL}/applications`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch applications");

      const data = await response.json();
      set({ applications: data });
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  },
  
  fetchInterviews: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`${BASE_URL}/interviews`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch interviews");

      const data = await response.json();
      set({ interviews: data });
    } catch (error) {
      console.error("Failed to fetch interviews", error);
    }
  },

  fetchAnalytics: async () => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`${BASE_URL}/analytics`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch analytics");

      const data = await response.json();
      set({ analytics: data });
    } catch (error) {
      console.error("Failed to fetch analytics", error);
    }
  },
}));

export default useSavedJobsStore;
