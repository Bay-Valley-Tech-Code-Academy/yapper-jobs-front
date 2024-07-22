import { create } from "zustand";
import { BASE_URL } from "./config";

const useApiStore = create((set, get) => ({
  jobs: [],
  fetchJobs: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/jobs`); // Replace '/api/jobs' with your actual API endpoint
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const result = await response.json();
      set({ jobs: result.data });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  },
  filterJobs: (searchQuery) => {
    const filteredJobs = get().jobs.filter((job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    set({ jobs: filteredJobs });
  },
  postJob: async (job) => {
    try {
      const response = await fetch(`${BASE_URL}/job/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        throw new Error("Failed to post job");
      }
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  }
}));

export default useApiStore;
