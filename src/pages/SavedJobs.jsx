import React from "react";
import { Flex, Box, Heading, Button } from "@chakra-ui/react";
// import { jobs } from "../jobs";
import SavedJobCard from "../components/SavedJobCard";
import AppliedJobCard from "../components/AppliedJobCard";
import useJobStore from "../store/job-store";
import useApiStore from "../store/api-store";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";
import customColorMode from "../../util/toggleColorMode"; // Import custom color mode

function SavedJobs() {
  const { savedJobs, removeJob } = useJobStore((state) => ({
    savedJobs: state.savedJobs,
    removeJob: state.removeJob,
  })); // Use the store(zustand)
  const {jobs } = useApiStore();
  const { colors, colorMode, toggleColorMode } = customColorMode();
  const [isLargerThanSmall] = useMediaQuery("(min-width: 30em)");


  //remove from saved jobs
  const handleRemoveJob = (id) => {
    removeJob(id);
  };

  //fetch details from jobs JSON matching with job id of savedJobs
  const savedJobDetails = jobs.filter((job) => savedJobs.includes(job.job_id));

  // Render SavedJobCard component
  const renderSavedJobs = () => {
    return savedJobDetails.length === 0 ? (
      <Box mt={8}>
        <Heading>No Saved jobs</Heading>
      </Box>
    ) : (
      savedJobDetails.map((job) => (
        <SavedJobCard key={job.job_id} {...job} handleRemoveJob={handleRemoveJob} />
      ))
    );
  };

  //Render AppliedJobs component. Unable to apply to jobs for now so it only renders the jobs json for now
  const renderAppliedJobs = () => {
    return jobs.length === 0 ? (
      <Box mt={8}>
        <Heading>No Application Status Available</Heading>
      </Box>
    ) : (
      jobs.map((job) => <AppliedJobCard key={job.job_id} {...job} />)
    );
  };

  return (
    <Box bg={colors.bgGradient} color={colors.textColor}>
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
      <Flex justifyContent="center">
        <Box mt={8} mb={16}>
          <Heading size="2xl">Your Jobs</Heading>
        </Box>
      </Flex>
      <Flex
        maxW="90%"
        mx="auto"
        px="4"
        direction={{ base: "column", sm: "row" }}
        justifyContent="space-between"
      >
        <Box width={{ base: "100%", sm: "50%" }} mr={4}>
          <Heading>Saved Jobs</Heading>
          {renderSavedJobs()}
        </Box>
        <Box width={{ base: "100%", sm: "50%" }} mr={4}>
          <Heading>Application Status</Heading>
          {renderAppliedJobs()}
        </Box>
      </Flex>
    </Box>
  );
}

export default SavedJobs;
