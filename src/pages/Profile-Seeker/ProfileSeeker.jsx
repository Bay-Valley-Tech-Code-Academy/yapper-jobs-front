import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Box,
  Text,
  Textarea,
  Button,
  IconButton,
  HStack,
  VStack,
  Divider,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import customColorMode from "../../../util/toggleColorMode";

import UpdateInfo from "./UpdateInfo";
import ProfileSeekerImg from "./ProfileSeekerImg";
import { jobs } from "../../jobs";
import SavedJobCard from "../../components/SavedJobCard";
import AppliedJobCard from "../../components/AppliedJobCard";

import CustomColorMode from '/util/toggleColorMode';
import { FaLocationPin } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
// import { CgWebsite } from "react-icons/cg";
import useUserStore from "../../store/user-store";
import useSavedJobsStore from "../../store/saved-jobs-store";

const MAX_CHAR_LIMIT = 500;

function ProfileSeeker() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { fetchSavedJobs, savedJobs, removeJob } = useSavedJobsStore();
  const [summary, setSummary] = useState("");
  const [charCount, setCharCount] = useState(0);
  const { colorMode, toggleColorMode, colors } = CustomColorMode();

  // Handle changes to the summary text area
  const handleSummaryChange = (event) => {
    const newSummary = event.target.value;
    setSummary(newSummary);
    setCharCount(newSummary.length);
  };

  useEffect(() => {
    // Fetch saved jobs when the component mounts
    const fetchJobs = async () => {
      try {
        if (user) {
          await fetchSavedJobs();
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobs();
  }, [user, fetchSavedJobs]);

  const goToResumeBuilder = () => {
    navigate("/resume-builder");
  };

  const goToYourJobs = () => {
    navigate("/saved-jobs");
  };

  const handleRemoveJob = async (id) => {
    try {
      await removeJob(id);
      await fetchSavedJobs(); // Fetch the updated list of saved jobs after removing a job
    } catch (error) {
      console.error(error);
    }
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex
      direction={isDesktop ? "row" : "column"}
      p={5}
      mx="auto"
      justifyContent="space-between"
    >
      <Flex direction={isDesktop ? "row" : "column"} w="full" mb={5}>
        {/* Seeker's Information */}
        <Flex
          direction="column"
          bg={colors.dividerColor}
          p={5}
          borderRadius="md"
          mb={isDesktop ? 0 : 5}
          w={isDesktop ? "65%" : "full"}
        >
          {/* Profile Picture and Contact Information Side by Side */}
          <HStack align="start" spacing={5}>
            <VStack align="center" spacing={3}>
              <Box>
                <ProfileSeekerImg />
              </Box>
              {/* Edit Profile Button */}
              <Box mt={3}>
                <UpdateInfo />
              </Box>
            </VStack>
            <VStack align="start" spacing={3}>
              <Heading as="h1" size="lg">
                {user ? `${user.first_name} ${user.last_name}` : "Hayden Janes"}
              </Heading>
              <Text color={colors.textColor}>Front End Software Developer</Text>
              <Flex align="center">
                <IconButton
                  aria-label="Location"
                  icon={<FaLocationPin />}
                  colorScheme="purple"
                  variant="ghost"
                  size="sm"
                />
                <Text color={colors.textColor} ml={1}>Modesto, CA</Text>
              </Flex>
              <Flex align="center">
                <IconButton
                  aria-label="Email"
                  icon={<MdEmail />}
                  colorScheme="purple"
                  variant="ghost"
                  size="sm"
                />
                <Text color={colors.textColor} ml={2}>hayden.janes.cohort233@gmail.com</Text>
              </Flex>
              <Flex align="center" mt={1}>
              <IconButton
                aria-label="PhoneNumber"
                icon={<FaPhoneAlt />}
                colorScheme="purple"
                variant="ghost"
                size="sm"
              />
              <Text color={colors.textColor} ml={2}>209-456-7810</Text>
            </Flex>
            <Flex align="center" mt={1}>
              <IconButton
                aria-label="LinkedInURL"
                icon={<FaLinkedin />}
                colorScheme="purple"
                variant="ghost"
                size="sm"
              />
              <Text color={colors.hyperlinkColor} ml={2}>https://www.linkedin.com/in/haydenjanes/</Text>
            </Flex>
            <Flex align="center" mt={1}>
              <IconButton
                aria-label="GitHubURL"
                icon={<FaGithub />}
                colorScheme="purple"
                variant="ghost"
                size="sm"
              />
              <Text color={colors.hyperlinkColor} ml={2}>https://github.com/haydencohort233</Text>
            </Flex>
            </VStack>
          </HStack>

          {/* Resume Information */}
          <Box mt={-20}>
            <Heading color={colors.textColor} as="h2" size="md" mb={3}>
              Your Resume
            </Heading>
            <Button bgColor={colors.buttonBgColor} color={colors.buttonColor} onClick={goToResumeBuilder} ml={2.5} mb={3}>
              Edit Resume
            </Button>
          </Box>

          <Divider color="gray.200" />

          {/* Summary */}
          <Box>
          <Heading color={colors.textColor} as="h3" size="md" ml={5}>
            Summary
          </Heading>
          <Box maxWidth="100%" maxHeight={450} border={"2px solid purple"} mt={5} ml={5} p={4}>
            <Textarea
              value={summary}
              onChange={handleSummaryChange}
              placeholder="Enter your summary..."
              size="sm"
              resize="none"
            />
            <Text mt={2} color={charCount > MAX_CHAR_LIMIT ? "red.500" : "gray.500"}>
              {charCount}/{MAX_CHAR_LIMIT}
            </Text>
          </Box>
        </Box>
      </Flex>

        {/* Your Jobs Box */}
        <Flex
          direction="column"
          bg={colors.dividerColor}
          p={5}
          borderRadius="md"
          w={isDesktop ? "30%" : "full"}
          ml={isDesktop ? 5 : 0}
        >
          <Flex justify="space-between" align="center" mb={3}>
            <Heading color={colors.textColor} as="h2" size="md">Your Jobs</Heading>
            <Button variant="link" onClick={goToYourJobs} color={colors.hyperlinkColor}>View All</Button>
          </Flex>

          <Divider color="gray.200" />

          <Box mt={3} mb={5} maxHeight="400px" overflowX="hidden" overflowY="auto">
            <Text color={colors.textColor} fontSize="lg" fontWeight="bold" mb={0}>Application Status:</Text>
            <VStack align="start" spacing={0}>
              {jobs.map((job) => (
                <AppliedJobCard key={job.id} {...job} />
              ))}
            </VStack>
          </Box>
          
          <Divider color="gray.200" />

          <Box mt={3}>
            <Text color={colors.textColor} fontSize="lg" fontWeight="bold" mb={3}>Saved Jobs: (0 Saved)</Text>
            <VStack align="start" spacing={3}>
              {savedJobs && savedJobs.map((job, index) => (
                <SavedJobCard
                  key={index}
                  {...job}
                  handleRemoveJob={handleRemoveJob}
                />
              ))}
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProfileSeeker;
