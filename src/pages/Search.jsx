import { useState, useEffect } from "react";
import { Heading, Text, Flex, Box, Button } from "@chakra-ui/react";
import Searchbar from "../components/Searchbar";
import JobSummary from "../components/JobSummary";
import JobCard from "../components/JobCard";
import customColorMode from "../../util/toggleColorMode";
import useApiStore from "../store/api-store";
import useSavedJobsStore from "../store/saved-jobs-store";
import useUserStore from "../store/user-store";

function Search() {
  const [selectedJob, setSelectedJob] = useState(1);
  const [maxJobCards, setMaxJobCards] = useState(10);
  const { jobs, fetchJobs } = useApiStore();
  const { fetchSavedJobsId, savedJobs, saveJob, removeJob } = useSavedJobsStore();
  const { colors } = customColorMode();
  const { user } = useUserStore();

  useEffect(() => {
    fetchJobs();
    if (user) {
      fetchSavedJobsId();
    }
  }, [user, fetchJobs, fetchSavedJobsId]);

  const handleSaveJob = async (job_id) => {
    try {
      if (savedJobs.includes(job_id)) {
        await removeJob(job_id);
      } else {
        await saveJob(job_id);
      }
    } catch (error) {
      console.error("Failed to save job", error);
    }
  };

  const renderJobCards = () => {
    return jobCards.map((job, index) => (
      <JobCard
        key={index}
        {...job}
        selectedJob={selectedJob}
        setSelectedJob={setSelectedJob}
        isSaved={savedJobs.includes(job.job_id)}
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

  const handleShowMore = () => {
    setMaxJobCards((prevMax) => prevMax + 5);
  };

  const jobCards = jobs.slice(0, maxJobCards);

  return (
    <Box
      bg={colors.bgGradient}
      color={colors.textColor}
      display="flex"
      flexDirection="column"
      height="100%"
    >
      <Flex justifyContent="flex-end" p={4}></Flex>
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
        <Searchbar jobs={jobs} />
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
            handleSaveJob={handleSaveJob}
            isSaved={savedJobs.includes(selectedJob)} // Pass isSaved to JobSummary
          />
        </Box>
      </Flex>
    </Box>
  );
}

export default Search;
