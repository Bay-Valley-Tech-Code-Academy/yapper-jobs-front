import { create } from "zustand";
import { BASE_URL } from "./config";

// const BASE_URL = "http://localhost:3000";
const useSavedJobsStore = create((set) => ({
  savedJobs: [],
  applications: [],
  interviews: [],
  jobPostings: [],
  count: 0,
  searchCount: 0,
  jobDetails: {},
  detailCount: 0,

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
      if(typeof(startIndex) != 'number' || !perPage) throw new Error("Failed to fetch job postings here");
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
      const yearMil = 1000 * 60 * 60 * 24 * 365.2425; // year length from NASA
      const monthMil = yearMil / 12;
      const weekMil = 1000 * 60 * 60 * 24 * 7;
      const dayMil = 1000 * 60 * 60 * 24;
      const hourMil = 1000 * 60 * 60;
      const minMil = 1000 * 60;

      data.jobs.forEach((job) => {
        const dateStr = new Date(job.date_created);
        const now = new Date(Date.now());
        const diff =  now.getTime() - dateStr.getTime();
        if(diff >= yearMil) {
          const years = Math.floor(diff / yearMil);
          job.ago = years + (years > 1 ? ' years' : ' year') + ' ago';
        } else if(diff >= monthMil) {
          const months = Math.floor(diff / monthMil);
          job.ago = months + (months > 1 ? ' months' : ' month') + ' ago';
        } else if(diff >= dayMil) {
          const days = Math.floor(diff / dayMil);
          job.ago = days + (days > 1 ? ' days' : ' day') + ' ago';
        } else if(diff >= hourMil) {
          const hours = Math.floor(diff / hourMil);
          job.ago = hours + (hours > 1 ? ' hours' : ' hour') + ' ago';
        } else if(diff >= minMil) {
          const minutes = Math.floor(diff / minMil);
          job.ago = minutes + (minutes > 1 ? ' minutes' : ' minute') + ' ago';
        } else {
          job.ago = 'seconds ago';
        }
      });
      set({ jobPostings: data.jobs, searchCount: data.count });
    } catch (error) {
      console.error("Failed to fetch job postings", error);
    }
  },

  fetchJobDetails: async (job_id) => {
    const response = await fetch(`${BASE_URL}/job/${job_id}/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("Failed to fetch job details");
    const data = await response.json();
    
    set({ jobDetails: data.job });
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
  fetchCount: async () => {
    try {
      const response = await fetch(`${BASE_URL}/jobs/count`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch count");

      const data = await response.json();
      set({ count: data });
    } catch (error) {
      console.error("Failed to fetch job count", error);
    }
  },
}));

export default useSavedJobsStore;
