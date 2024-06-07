import React, { useState, useEffect } from "react";
import { Heading, Text, Flex, Box, Button } from "@chakra-ui/react";
import Searchbar from "../components/Searchbar";
import JobSummary from "../components/JobSummary";
import JobCard from "../components/JobCard";
import customColorMode from "../../util/toggleColorMode"; // Import custom color mode
import useApiStore from "../store/api-store";
import useSavedJobsStore from "../store/saved-jobs-store";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";
import useUserStore from "../store/user-store";

function Search() {
  const [selectedJob, setSelectedJob] = useState(1);
  const [maxJobCards, setMaxJobCards] = useState(10); // Shows up to 10 job cards initially
  const { jobs, fetchJobs } = useApiStore();
  const { fetchSavedJobsId, savedJobs, saveJob } = useSavedJobsStore();
  const { colors, colorMode, toggleColorMode } = customColorMode();
  const [isLargerThanSmall] = useMediaQuery("(min-width: 30em)");
  const {user} = useUserStore();

  useEffect(() => {
    fetchJobs();
    if(user){
      fetchSavedJobsId();
    }
  }, [fetchJobs, fetchSavedJobsId]);

  // console.log(user.first_name);

  const handleSaveJob = async (job_id) => {
    try {
      await saveJob(job_id);
    } catch (error) {
      console.error("Failed to save job", error);
    }
  };

  const renderJobCards = () => {
    return jobCards.map((job) => (
      <JobCard
        key={job.job_id}
        {...job}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
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

  // Add 5 more job cards on click
  const handleShowMore = () => {
    setMaxJobCards((prevMax) => prevMax + 5);
  };

  // Gets the max cards depending on the value of the state variable
  const jobCards = jobs.slice(0, maxJobCards);

  return (
    <Box
      bg={colors.bgGradient}
      color={colors.textColor}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <Flex justifyContent="flex-end" p={4}>
        <Button
          onClick={toggleColorMode}
          color={colors.buttonColor}
          backgroundColor={colors.buttonBgColor}
        >
          {isLargerThanSmall ? (
            `Toggle ${colorMode === "light" ? "Dark" : "Light"} Mode`
          ) : colorMode === "light" ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </Button>
      </Flex>
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
        <Searchbar jobs={jobs}/>
      </Flex>
      <Flex width="80%" maxH="100vh" mx="auto" px="4">
        <Box width={{ base: "100%", sm: "40%" }} mr="4" overflow="auto">
          <Box ml="10" p="3">
            <Heading>Search Results</Heading>
            <Text>{jobs.length} jobs</Text>
          </Box>
          {renderJobCards()}
          {renderShowMoreButton()}
        </Box>
        <Box width={{ base: "0%", sm: "60%" }}>
          <JobSummary
            selectedJob={selectedJob}
            savedJobs={savedJobs}
            handleSaveJob={handleSaveJob}
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default Search;
