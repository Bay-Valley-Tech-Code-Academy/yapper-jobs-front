import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Heading, Box, Text, Button, IconButton, HStack, VStack } from '@chakra-ui/react';

import UpdateInfo from './UpdateInfo';
import ProfileSeekerImg from './ProfileSeekerImg';
import { jobs } from "../../jobs";
import SavedJobCard from "../../components/SavedJobCard";
import AppliedJobCard from "../../components/AppliedJobCard";

import { FaLocationPin } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

function ProfileSeeker() {
  const navigate = useNavigate();

  const goToResumeBuilder = () => {
    navigate('/resume-builder');
  };
  const goToYourJobs = () => {
    navigate('/saved-jobs');
  };

  return (
    <Flex direction="row" p={5} mx="auto" justifyContent="space-between">
    <Flex direction="column" p={5} bg="white">
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
          <Heading as="h1" size="lg">Gojo Satoru</Heading>
          <Flex align="center" mt={1}>
            <Text ml={1} spacing = {15}>Teacher @ Tokyo Jujutsu High</Text>
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
            <Text ml={2}>hollowpuprle@anime.com</Text>
          </Flex>
          <Flex align="center" mt={1}>
            <IconButton
              aria-label="PhoneNumber"
              icon={<FaPhoneAlt/>}
              colorScheme="purple"
              variant="ghost"
              size="sm"
            />
            <Text ml={2}>123-456-7890</Text>
          </Flex>
          <Flex align="center" mt={1}>
            <IconButton
              aria-label="LinkedInURL"
              icon={<FaLinkedin/>}
              colorScheme="purple"
              variant="ghost"
              size="sm"
            />
            <Text ml={2}>LinkedIn Profile URL</Text>
          </Flex>
          <Flex align="center" mt={1}>
            <IconButton
              aria-label="GitHubURL"
              icon={<FaGithub/>}
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
        <Flex ml={5} >
        <Heading as="h2" size="md">Your Resume</Heading>
        <Flex ml={5}>
        <Button colorScheme="purple" onClick={goToResumeBuilder}>
          Edit Resume
        </Button>
        </Flex>
        </Flex>
      </Box>

      {/* Summary */}
      <Box>
        <Heading as="h3" size="md" ml={5}>Summary</Heading>
        <Box width={800} maxHeight= {450} border={"2px solid purple"} mt={5} ml={5}>
        <Text mt={2}>
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi 
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et 
        dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
         vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur
        </Text>
        </Box>
      </Box>
      </Flex>
        
        {/* Your Jobs Box */}
        <VStack align="start">
        <Flex>
        <Text fontSize={40}>Your Jobs</Text>
        <Button variant="link" colorScheme='purple' ml={550} mt={10} onClick={goToYourJobs}>View All </Button>
        </Flex>
        <Box bg="gray.100" width={800} height={400} borderRadius="md" overflowY="auto">
        <Text fontSize={'large'} ml={4} fontWeight={'bold'}>Application Status</Text>
        <Box>
        {jobs.map((job) => (
            <AppliedJobCard key={job.id} {...job} />
          ))}
        </Box>
      </Box>
      <Box bg="gray.100" width={800} height={350} borderRadius="md" overflowY="auto">
        <Text fontSize={'large'} ml={4} fontWeight={'bold'}>Saved Jobs</Text>
        {jobs.map((job) => (
            <SavedJobCard key={job.id} {...job} />
          ))}
      </Box>
      </VStack>
    </Flex>
    
  );
}

export default ProfileSeeker;
