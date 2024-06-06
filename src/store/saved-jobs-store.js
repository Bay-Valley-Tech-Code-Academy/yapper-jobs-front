import { create } from "zustand";

const BASE_URL = "http://localhost:3000";
const user = JSON.parse(localStorage.getItem("user"));
const jwt = user?.jwt;
const useSavedJobsStore = create((set) => ({
  savedJobs: [],
  fetchSavedJobsId: async () => {
    try {
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
  //   addJob: (jobId) => set((state) => ({ savedJobs: [...state.savedJobs, jobId] })),
  //   removeJob: (jobId) => set((state) => ({
  //     savedJobs: state.savedJobs.filter((id) => id !== jobId),
  //   })),
}));

export default useSavedJobsStore;
