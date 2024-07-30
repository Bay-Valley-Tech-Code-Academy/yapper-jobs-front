import { create } from "zustand";
import { BASE_URL } from "./config";

// const BASE_URL = "http://localhost:3000";
const useSavedJobsStore = create((set) => ({
  savedJobs: [],
  applications: [],
  interviews: [],
  jobPostings: [],

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
  fetchApplications: async (startIndex, perPage) => {
    try {
      const jwt = localStorage.getItem("jwt");
      const response = await fetch(`${BASE_URL}/job/applications?startIndex=${startIndex}&perPage=${perPage}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch applications");

      const data = await response.json();
      data.apps.forEach((app) => {
        const dateStr = new Date(app.date_applied);
        const months = (dateStr.getMonth() < 10) ? '0' + dateStr.getMonth() : dateStr.getMonth();
        const days = (dateStr.getDate() < 10) ? '0' + dateStr.getDate() : dateStr.getDate();
        app.date_applied = dateStr.getFullYear() + '-' + months + '-' + days;
      });
      set({ applications: data });
    } catch (error) {
      console.error("Failed to fetch applications", error);
    }
  },

  fetchJobPostings: async (search) => {
    try {
      const {keywords, location, remote, industry, experience_level, employment_type, company, company_size, salary_range, benefits, certifications, startIndex, perPage} = search;
      // ?key=${keywords}&loc=${location}&rem={remote}&ind=${industry}&exp=${experience_level}&emp=${employment_type}&size=${company_size}&sal=${salary_range}&ben=${benefits}&cert=${certifications}
      if(!startIndex || !perPage) throw new Error("Failed to fetch job postings here");
      let url = `${BASE_URL}/job/search/get?`;
      const arr = [];
      if(keywords) arr.push(`key=${keywords}`);
      if(location) arr.push(`loc=${location}`);
      if(remote) arr.push(`rem=${remote}`);
      if(industry) arr.push(`ind=${industry}`);
      if(experience_level) arr.push(`exp=${experience_level}`);
      if(employment_type) arr.push(`emp=${employment_type}`);
      if(company) arr.push(`comp=${company}`);
      if(company_size) arr.push(`size=${company_size}`);
      if(salary_range) arr.push(`sal=${salary_range}`);
      if(benefits) arr.push(`ben=${benefits}`);
      if(certifications) arr.push(`cert=${certifications}`);
      arr.push(`startIndex=${startIndex}&perPage=${perPage}`);

      const str = arr.join('&');
      url += str;
      // const jwt = localStorage.getItem("jwt");
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch job postings");
      const data = await response.json();
      data.jobs.forEach((job) => {
        const dateStr = new Date(job.date_created);
        const months = (dateStr.getMonth() < 10) ? '0' + dateStr.getMonth() : dateStr.getMonth();
        const days = (dateStr.getDate() < 10) ? '0' + dateStr.getDate() : dateStr.getDate();
        job.date_created = dateStr.getFullYear() + '-' + months + '-' + days;
      });
      set({ jobPostings: data });
    } catch (error) {
      console.error("Failed to fetch job postings", error);
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
