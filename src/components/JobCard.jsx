import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  Heading,
  Text,
  Button,
  IconButton,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import useSavedJobsStore from "../store/saved-jobs-store";
import useUserStore from "../store/user-store";

function JobCard(props) {
  const navigate = useNavigate();
  const {user} = useUserStore();

  const { savedJobs, saveJob, removeJob } = useSavedJobsStore();

  const handleClick = (id) => {
    props.setSelectedJob(id);
  };

  const handleApplyClick = (id) => {
    navigate(`../apply/${id}`);
  };

  const handleSaveJob = (job_id) => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      console.error("No user logged in");
      return;
    }
    if (savedJobs.includes(job_id)) {
      removeJob(job_id); // remove job if it is already saved
    } else {
      saveJob(job_id); // save job if it is not already saved
    }
  };

  return (
    <Flex direction="column" maxW="400px" mx="auto">
      <Box p="4">
        <Heading
          as="h2"
          size="md"
          cursor="pointer"
          onClick={() => handleClick(props.job_id)}
        >
          {props.title}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {props.company}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          {props.employment_type}
        </Text>
        <Stack direction="row" spacing="2" mt="2" mb="4">
          <Icon as={FaMapMarkerAlt} />
          {/* <Text fontSize="sm">{props.city}, {props.state}</Text> */}
          <Text fontSize="sm">
            {props.city || props.state
              ? `${props.city}, ${props.state}`
              : "No location specified"}
          </Text>
        </Stack>
        <Text fontSize="sm" mb="4" maxHeight="110px" overflow="hidden">
          {props.job_description}
        </Text>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "2", md: "4" }}
          justify="flex-start"
        >
          <Button
            colorScheme="purple"
            size="sm"
            onClick={() => handleApplyClick(props.job_id)}
          >
            Apply
          </Button>
          {user && (
            <IconButton
              aria-label="Save/Unsave"
              icon={
                savedJobs.includes(props.job_id) ? (
                  <MdFavorite />
                ) : (
                  <MdFavoriteBorder />
                )
              }
              colorScheme="purple"
              variant="ghost"
              size="sm"
              onClick={() => handleSaveJob(props.job_id)}
            />
          )}
        </Stack>
      </Box>
    </Flex>
  );
}

export default JobCard;
