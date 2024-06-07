import React, { useState, useContext, useEffect } from "react";
import { Flex, Box, Heading, Button } from "@chakra-ui/react";
import SavedJobCard from "../components/SavedJobCard";
import AppliedJobCard from "../components/AppliedJobCard";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useMediaQuery } from "@chakra-ui/react";
import customColorMode from "../../util/toggleColorMode";
import useApiStore from "../store/api-store";
import useSavedJobsStore from "../store/saved-jobs-store"; // Import useSavedJobsStore
import useUserStore from "../store/user-store";

function SavedJobs() {
  const { jobs } = useApiStore();
  const { colors, colorMode, toggleColorMode } = customColorMode();
  const { savedJobs, fetchSavedJobs, removeJob } = useSavedJobsStore(); // Destructure fetchSavedJobs from useSavedJobsStore
  const [isLargerThanSmall] = useMediaQuery("(min-width: 30em)");
  const { user } = useUserStore();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        if (user) {
          await fetchSavedJobs();
        } // Call fetchSavedJobs to fetch saved jobs
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, [fetchSavedJobs]);

  // Function to handle removing a job
  const handleRemoveJob = async (id) => {
    try {
      await removeJob(id);
      await fetchSavedJobs(); // Fetch the updated list of saved jobs after removing a job
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Saved Jobs", jobs)

  // Function to render saved jobs
  const renderSavedJobs = () => {
    return savedJobs.length === 0 ? (
      <Box mt={8}>
        <Heading>No Saved jobs</Heading>
      </Box>
    ) : (
      savedJobs.map((job) => (
        <SavedJobCard
          key={job.job_id}
          {...job}
          handleRemoveJob={handleRemoveJob}
        />
      ))
    );
  };

  // Function to render applied jobs
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
          <Heading size="2xl">
            {user && user.first_name
              ? `${user.first_name}'s Jobs`
              : "Your Jobs"}
          </Heading>{" "}
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
