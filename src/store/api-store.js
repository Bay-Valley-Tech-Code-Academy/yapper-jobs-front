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
}));

export default useApiStore;
