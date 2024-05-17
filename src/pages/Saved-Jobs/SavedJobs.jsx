import React from "react";
import {
  MenuButton,
  Menu,
  MenuList,
  Flex,
  Box,
  Button,
  Heading,
  Text,
  MenuOptionGroup,
  MenuItemOption,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Wrap,
  MenuItem,
} from "@chakra-ui/react";
import "./SavedJobs.css";
import { jobs } from "../../jobs";
import SavedJobCard from "../../components/SavedJobCard";
import AppliedJobCard from "../../components/AppliedJobCard";

function SavedJobs() {
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
          {jobs.map((job) => (
            <SavedJobCard key={job.id} {...job} />
          ))}
        </Box>
        <Box width={{ base: "100%", sm: "50%" }} mr={4}>
          <Heading>Application Status</Heading>
          {jobs.map((job) => (
            <AppliedJobCard key={job.id} {...job} />
          ))}
        </Box>
      </Flex>
    </Box>
  );
}

export default SavedJobs;
