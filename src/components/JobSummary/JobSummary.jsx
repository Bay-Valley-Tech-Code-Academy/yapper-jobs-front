import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  IconButton,
  Icon,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react";
import { FaRegBookmark, FaRegClock, FaMapMarkerAlt } from "react-icons/fa";
import { jobs } from "../../jobs";

function JobSummary({ selectedJob }) {
  const navigate = useNavigate();
  const [isLargerThanSmall] = useMediaQuery("(min-width: 30em)");

  if (!isLargerThanSmall) {
    return null; // Render nothing if the screen size is smaller than 30em
  }

  const job = jobs.find((job) => job.id === selectedJob);

  if (!job) {
    return (
      <Box height="100%" ml="3%">
        <Heading>No Job Selected</Heading>
      </Box>
    );
  }

  return (
    <>
      <Box height="100%" ml="3%">
        <Stack direction="column" mb="2">
          <Heading size="md">{job.title}</Heading>
          <Text fontSize="sm" color="gray.600">
            {job.company}
          </Text>
          <Stack direction="row" justify="space-between" align="center">
            <IconButton
              icon={<Icon as={FaRegBookmark} />}
              aria-label="Save Job"
              // onClick={onSaveClick}
            />
            <Text fontSize="sm">1d ago</Text>
          </Stack>
        </Stack>
        <Stack direction="row" spacing="4" align="center" mb="2">
          <Stack direction="row" spacing="1">
            <Icon as={FaMapMarkerAlt} />
            <Text fontSize="sm">{job.location}</Text>
          </Stack>
          {/* {isFullTime && ( */}
          <Text fontSize="sm" fontWeight="bold">
            Full-time
          </Text>
          {/* )} */}
        </Stack>
        <Text fontSize="sm" mb="4" overflowY="auto" maxHeight="500px">
          {job.jobDescription}
        </Text>
        <Stack direction="row" justify="flex-start" spacing="4">
          <Button
            colorScheme="purple"
            variant="solid"
            onClick={() => navigate(`../apply/${selectedJob}`)}
          >
            Apply Now
          </Button>
          <Button colorScheme="gray" variant="outline">
            Save
          </Button>
        </Stack>
        <Divider mt={4} />
        <Text mb={4} mt={4}>
          Industry: Technology
        </Text>
        <Heading mb={4}>About the company</Heading>
        <Text ml={4}>
          We're Proud to Offer a Comprehensive Benefits Package Including:
        </Text>
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
          <li> Employee discount program</li>
        </ul>
      </Box>
    </>
  );
}

export default JobSummary;
