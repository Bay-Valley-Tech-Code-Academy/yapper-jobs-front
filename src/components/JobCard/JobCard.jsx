import React from "react";
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
import useJobStore from "../../store/job-store";

function JobCard(props) {
  const navigate = useNavigate();

  const { savedJobs } = useJobStore((state)=> ({
    savedJobs: state.savedJobs,
  }));


  const handleClick = (id) => {
    props.setSelectedJob(id);
  };

  const handleApplyClick = (id) => {
    navigate(`../apply/${id}`);
  };

  return (
    <Flex direction="column" maxW="400px" mx="auto">
      <Box p="4">
        <Heading
          as="h2"
          size="md"
          cursor="pointer"
          onClick={() => handleClick(props.id)}
        >
          {props.title}
        </Heading>
        <Text fontSize="sm" color="gray.600">
          {props.company}
        </Text>
        <Text fontSize="sm" fontWeight="bold">
          {props.status}
        </Text>
        <Stack direction="row" spacing="2" mt="2" mb="4">
          <Icon as={FaMapMarkerAlt} />
          <Text fontSize="sm">{props.location}</Text>
        </Stack>
        <Text fontSize="sm" mb="4" maxHeight="110px" overflow="hidden">
          {props.jobDescription}
        </Text>
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={{ base: "2", md: "4" }}
          justify="flex-start"
        >
          <Button
            colorScheme="purple"
            size="sm"
            onClick={() => handleApplyClick(props.id)}
          >
            Apply
          </Button>
          <IconButton
            aria-label="Save/Unsave"
            icon={
              savedJobs.includes(props.id) ? (
                <MdFavorite />
              ) : (
                <MdFavoriteBorder />
              )
            }
            colorScheme="purple"
            variant="ghost"
            size="sm"
            onClick={() => props.handleSaveJob(props.id)}
          />
        </Stack>
      </Box>
    </Flex>
  );
}

export default JobCard;
