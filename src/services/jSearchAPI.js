export const fetchJSearchAPI = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/jobs");
    if (!response.ok) {
      throw new Error("Failed to fetch jobs");
    }
    // Parse the response as JSON
    const result = await response.json();
    if (result.success) {
      return result.data;
    } else {
      throw new Error("Failed to fetch jobs: " + result.error);
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    console.error("Error object:", error.message, error.stack);
    return []; // Return empty array in case of error
  }
};
  