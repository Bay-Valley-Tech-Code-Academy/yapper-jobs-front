import {create} from "zustand";

const useJobStore = create((set) => ({
    savedJobs: JSON.parse(localStorage.getItem('savedJobs')) || [], //global state
    addJob: (jobId) =>
      set((state) => {
        const updatedJobs = [...state.savedJobs, jobId];
        localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
        return { savedJobs: updatedJobs };
      }),
    removeJob: (jobId) =>
      set((state) => {
        const updatedJobs = state.savedJobs.filter((id) => id !== jobId);
        localStorage.setItem('savedJobs', JSON.stringify(updatedJobs));
        return { savedJobs: updatedJobs };
      }),
  }));

  export default useJobStore;