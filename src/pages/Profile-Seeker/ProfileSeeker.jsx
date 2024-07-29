import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Heading,
  Box,
  Text,
  Button,
  IconButton,
  HStack,
  VStack,
} from "@chakra-ui/react";

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

function ProfileSeeker() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { colors } = CustomColorMode();
  const { fetchSavedJobs, savedJobs, removeJob } = useSavedJobsStore();
  const [profile, setProfile] = useState({
    summary: "",
  });

  useEffect(async () => {
    try {
      const response = await fetch('/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
            'Content-Type': 'application/json'
        }
      });
      const result = await response.json();
      if (response.ok) {
          setProfile({
            summary: result.user.summary,
          });
          setLoading(false);
      } else {
          alert(`Error: ${result.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(()=> {
    // Fetch saved jobs when the component mounts using try catch block
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
  }, [user, fetchSavedJobs])

  useEffect(()=> {
    // Fetch saved jobs when the component mounts using try catch block
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
  }, [user, fetchSavedJobs])

  const goToResumeBuilder = () => {
    navigate("/resume-builder");
  };
  const goToYourJobs = () => {
    navigate("/saved-jobs");
  };

  // Function to handle removing a saved job
  const handleRemoveJob = async (id) => {
    try {
      await removeJob(id);
      await fetchSavedJobs(); // Fetch the updated list of saved jobs after removing a job
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Flex direction="row" p={5} mx="auto" justifyContent="space-between">
      <Flex 
        direction="column" 
        p={5}
        bg={colors.pfSections}
        borderRadius="md"
      >
        {/* Profile Picture and Contact Information Side by Side */}
        <HStack align="start" spacing={10} mb={4}>
          <Box>
            {/* Profile Picture*/}
            <ProfileSeekerImg />
            {/* Edit Profile Button */}
            <Box ml={5} mt={5}>
              <UpdateInfo />
            </Box>
          </Box>
          {/* Job Seeker's Information */}
          <VStack align="start">
            <Heading as="h1" size="lg">
              {user ? `${user.first_name} ${user.last_name}` : "Guest"}
            </Heading>
            <Flex align="center" mt={1}>
              <Text ml={1} spacing={15}>
                Teacher @ Tokyo Jujutsu High
              </Text>
            </Flex>
            <Flex align="center" mt={1}>
              <IconButton
                aria-label="Location"
                icon={<FaLocationPin />}
                colorScheme="purple"
                variant="ghost"
                size="sm"
              />
              <Text ml={1}>Shibuya, JP</Text>
            </Flex>
            <Flex align="center" mt={1}>
              <IconButton
                aria-label="Email"
                icon={<MdEmail />}
                colorScheme="purple"
                variant="ghost"
                size="sm"
              />
              <Text ml={2}>{user.email}</Text>
            </Flex>
            <Flex align="center" mt={1}>
              <IconButton
                aria-label="PhoneNumber"
                icon={<FaPhoneAlt />}
                colorScheme="purple"
                variant="ghost"
                size="sm"
              />
              <Text ml={2}>123-456-7890</Text>
            </Flex>
            <Flex align="center" mt={1}>
              <IconButton
                aria-label="LinkedInURL"
                icon={<FaLinkedin />}
                colorScheme="purple"
                variant="ghost"
                size="sm"
              />
              <Text ml={2}>LinkedIn Profile URL</Text>
            </Flex>
            <Flex align="center" mt={1}>
              <IconButton
                aria-label="GitHubURL"
                icon={<FaGithub />}
                colorScheme="purple"
                variant="ghost"
                size="sm"
              />
              <Text ml={2}>GitHub Profile URL</Text>
            </Flex>
          </VStack>
        </HStack>

        {/* Resume Information */}
        <Box mb={10} mt={10}>
          <Flex ml={5}>
            <Heading as="h2" size="md">
              Your Resume
            </Heading>
            <Flex ml={5}>
              <Button colorScheme="purple" onClick={goToResumeBuilder}>
                Edit Resume
              </Button>
            </Flex>
          </Flex>
        </Box>

        {/* Summary */}
        <Box>
          <Heading as="h3" size="md" ml={5}>
            Summary
          </Heading>
          <Box
            width={800}
            maxHeight={450}
            border={"2px solid purple"}
            borderRadius="md"
            mt={5}
            ml={5}
          >
            <Text mt={1} p={3}>
              {profile.summary}
            </Text>
          </Box>
        </Box>
      </Flex>

      {/* Your Jobs Box */}
      <VStack align="start">
        <Flex>
          <Text fontSize={40}>Your Jobs</Text>
          <Button
            variant="link"
            colorScheme="purple"
            ml={550}
            mt={10}
            onClick={goToYourJobs}
          >
            View All{" "}
          </Button>
        </Flex>
        <Box
          bg={colors.pfJobSection}
          width={800}
          height={400}
          borderRadius="md"
          overflowY="auto"
        >
          <Text fontSize={"large"} ml={4} fontWeight={"bold"}>
            Application Status
          </Text>
          <Box>
            {jobs.map((job) => (
              <AppliedJobCard key={job.id} {...job} />
            ))}
          </Box>
        </Box>
        <Box
          bg={colors.pfJobSection}
          width={800}
          height={350}
          borderRadius="md"
          overflowY="auto"
        >
          <Text fontSize={"large"} ml={4} fontWeight={"bold"}>
            Saved Jobs
          </Text>
          {savedJobs && savedJobs.map((job, index) => (
            <SavedJobCard
              key={index}
              {...job}
              handleRemoveJob={handleRemoveJob}
            />
          ))}
        </Box>
      </VStack>
    </Flex>
  );
}

export default ProfileSeeker;