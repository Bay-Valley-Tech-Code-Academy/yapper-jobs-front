import React from "react";
import {
  Flex,
  Box,
  Heading,
} from "@chakra-ui/react";
import "./SavedJobs.css";
import { jobs } from "../../jobs";
import SavedJobCard from "../../components/SavedJobCard";
import AppliedJobCard from "../../components/AppliedJobCard";
import useJobStore from "../../store/job-store";

function SavedJobs() {

  const { savedJobs, removeJob } = useJobStore((state) => ({
    savedJobs: state.savedJobs,
    removeJob: state.removeJob,
  })); // Use the store(zustand)

  //remove from saved jobs
  const handleRemoveJob = (id) => {
    removeJob(id);
  };

  //fetch details from jobs JSON matching with job id of savedJobs
  const savedJobDetails = jobs.filter((job) => savedJobs.includes(job.id))

  // Render SavedJobCard component
  const renderSavedJobs = () => {
    return savedJobDetails.length === 0 ? (
      <Box mt={8}><Heading>No Saved jobs</Heading></Box>
    ) : (
      savedJobDetails.map((job) => (
        <SavedJobCard key={job.id} {...job} handleRemoveJob={handleRemoveJob} />
      ))
    )
  }

  //Render AppliedJobs component
  const renderAppliedJobs = () => {
    return jobs.length === 0 ? (
      <Box mt={8}><Heading>No Application Status Available</Heading></Box>
    ) : (
      jobs.map((job) => (
        <AppliedJobCard key={job.id} {...job} />
      ))
    )
  }

  return (
    <Box bg="#F4F4F4">
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
