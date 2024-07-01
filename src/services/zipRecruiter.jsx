const fetchData = async () => {
    try {
      const url = "https://api.ziprecruiter.com/partner/v0/job/emlwcmVjcnVpdGVy-3215";
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      console.error(error);
    }
  };

  export {fetchData};
  