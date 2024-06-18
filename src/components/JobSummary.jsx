import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Icon,
  Divider,
  useMediaQuery,
  Link,
} from "@chakra-ui/react";
import { FaMapMarkerAlt } from "react-icons/fa";
import useApiStore from "../store/api-store";

function JobSummary({ selectedJob, handleSaveJob, isSaved }) {
  const navigate = useNavigate();
  const jobs = useApiStore((state) => state.jobs);
  const [isLargerThanSmall] = useMediaQuery("(min-width: 30em)");

  if (!isLargerThanSmall) {
    return null; // Render nothing if the screen size is smaller than 30em
  }

  //get job details matching the id of selected job to the jobs JSON
  const job = jobs.find((job) => job.job_id === selectedJob);

  if (!job) {
    return (
      <Box height="100%" width="300px" ml="10%">
        <Heading>No Job Selected</Heading>
      </Box>
    );
  }

  //format timestamp column to date only
  function formatDate(timestamp) {
    const date = new Date(timestamp); // Create a Date object from the timestamp

    // Extract the date components
    const month = date.getMonth() + 1; // getMonth() returns 0-based index
    const day = date.getDate();
    const year = date.getFullYear();

    // Format the date as MM/DD/YYYY
    return `${month}/${day}/${year}`;
  }

  return (
    <Box height="100%" ml="3%" overflowY="auto" paddingRight="2">
      <Stack direction="column" mb="2">
        <Heading size="2xl">{job.title}</Heading>
        <Text fontSize="xl" color="gray.600">
          <Link href={job.website} isExternal>
          {job.company}
          </Link>
        </Text>
        {job.industry && (
          <Text mb={2} mt={2}>
            Industry: {job.industry}
          </Text>
        )}
        <Stack direction="row" justify="space-between" align="center" mb="1">
          <Text fontSize="sm">Posted {formatDate(job.created)}</Text>
        </Stack>
      </Stack>
      <Stack direction="row" spacing="4" align="center" mb="1">
        <Stack direction="row" spacing="1">
          <Icon as={FaMapMarkerAlt} />
          <Text fontSize="sm">
            {job.city}, {job.state}
          </Text>
        </Stack>
        <Text fontSize="sm" fontWeight="bold">
          {job.employment_type}
        </Text>
      </Stack>
      <Text fontSize="md" mb="4" overflowY="auto" maxHeight="400px">
        {job.job_description}
      </Text>
      <Stack direction="row" justify="flex-start" spacing="4">
        <Button
          colorScheme="purple"
          variant="solid"
          onClick={() => navigate(`../apply/${selectedJob}`)}
        >
          Apply Now
        </Button>
        <Button
          colorScheme="gray"
          variant="outline"
          onClick={() => handleSaveJob(selectedJob)}
        >
          {isSaved ? "Unsave" : "Save"}
        </Button>
      </Stack>
      <Divider mt={4} />

      <Heading mb={4}>About the company</Heading>
      {job.benefits && (
        <>
          <Text ml={4}>
            We're Proud to Offer a Comprehensive Benefits Package Including:
          </Text>
          <Box m="4">
            {/* Loop through benefits with ul*/}
            <ul>
              {job.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </Box>
        </>
      )}
    </Box>
  );
}

export default JobSummary;
