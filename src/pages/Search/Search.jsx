import React, { useState, useEffect } from "react";
import { Heading, Text, Flex, Box, Button } from "@chakra-ui/react";
import Searchbar from "../../components/Searchbar/Searchbar";
import JobSummary from "../../components/JobSummary/JobSummary";
import JobCard from "../../components/JobCard/JobCard";
import { jobs } from "../../jobs";

function Search() {
  const [selectedJob, setSelectedJob] = useState(1);
  const [maxJobCards, setMaxJobCards] = useState(10); //shows up to 10 job cards initially
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Load saved jobs from local storage when the component mounts
    const saved = localStorage.getItem("savedJobs");
    if (saved) {
      setSavedJobs(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    // Save the saved jobs to local storage whenever it changes
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  }, [savedJobs]);

  const handleSaveJob = (id) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter((jobId) => jobId !== id));
    } else {
      setSavedJobs([...savedJobs, id]);
    }
  };

  const renderJobCards = () => {
    return jobCards.map((job) => (
      <JobCard
        key={job.id}
        {...job}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        savedJobs={savedJobs}
        handleSaveJob={handleSaveJob}
      />
    ));
  };

  const renderShowMoreButton = () => {
    if (jobs.length > maxJobCards) {
      return (
        <Button onClick={handleShowMore} mt="4">
          Show More
        </Button>
      );
    }
    return null;
  };

  //add 5 more job cards on click
  const handleShowMore = () => {
    setMaxJobCards((prevMax) => prevMax + 5);
  };

  //gets the max cards depending on the value of the state variable
  const jobCards = jobs.slice(0, maxJobCards);

  return (
    <div
      style={{
        backgroundColor: "#F4F4F4",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Heading textAlign="center" m="4">
        Search Jobs
      </Heading>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="80%"
        mx="auto"
        px="4"
        mb="4"
      >
        <Searchbar />
      </Flex>
      <Flex maxW="90%" maxH="100vh" mx="auto" px="4">
        {/* JobCards Component */}
        <Box width={{ base: "100%", sm: "40%" }} mr="4" overflow="auto">
          <Box ml="10" p="3">
            <Heading>Search Results</Heading>
            <Text>{jobs.length} jobs</Text>
          </Box>
          {/* Display JobCards */}
          {renderJobCards()}
          {/* Get more Jobs */}
          {renderShowMoreButton()}
        </Box>
        {/* JobSummary Component */}
        <Box width={{ base: "0%", sm: "60%" }}>
          <JobSummary selectedJob={selectedJob} savedJobs={savedJobs}
            handleSaveJob={handleSaveJob} />
        </Box>
      </Flex>
    </div>
  )
}

export default Search;
