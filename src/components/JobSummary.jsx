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

  return (
    <Box height="100%" ml="3%" overflowY="auto" paddingRight="2">
      <Stack direction="column" mb="2">
        <Heading size="2xl">{job.title}</Heading>
        <Text fontSize="xl" color="gray.600">
          {job.company}
        </Text>
        <Stack direction="row" justify="space-between" align="center">
          <Text fontSize="sm">1d ago</Text>
        </Stack>
      </Stack>
      <Stack direction="row" spacing="4" align="center" mb="2">
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
      <Text mb={4} mt={4}>
        Industry: {job.industry}
      </Text>
      <Heading mb={4}>About the company</Heading>
      <Text ml={4}>
        We're Proud to Offer a Comprehensive Benefits Package Including:
      </Text>
      <Box m="4">
        <ul>
          <li>401k retirement plan, with employer match</li>
          <li>
            Insurance options including: medical, dental, vision, life and STD
            insurance
          </li>
          <li>
            Paid Time Off/Vacation: Starting at 80 hours per year, and increases
            based on tenure with the organization
          </li>
          <li>Floating Holiday: 40 hours per year</li>
          <li>Paid Holidays: 7 days per year</li>
          <li>
            Paid Sick Leave: Astound allows a number of paid sick hours per
            calendar year and varies based on state and/or local laws
          </li>
          <li>Tuition reimbursement program</li>
          <li>Employee discount program</li>
        </ul>
        </Box>
    </Box>
  );
}

export default JobSummary;
