{/*Imports for React and Chakra*/}
import React, { useEffect, useState } from 'react';
import { Flex, Heading, Box, Text, Button, IconButton, HStack, VStack, Image, useRadioGroup, useBreakpointValue, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CustomColorMode from "../../../util/toggleColorMode";

{/*Imports for Other Page References*/}
import UpdateEmployerInfo from './UpdateEmployerInfo';
import ProfileSeekerImg from '../Profile-Seeker/ProfileSeekerImg';
import TestPic from "/yapper-jobs-defualt-seeker-img.jpg";
import useUserStore from '../../store/user-store';
import useSavedJobsStore from '../../store/saved-jobs-store';

{/*Imports for Icons on Profile Summary*/}
import { FaLocationPin } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CgWebsite } from 'react-icons/cg';


function ProfileEmployer() {
  const { jobPostings, fetchJobPostings, applications, fetchApplications } = useSavedJobsStore();
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode, colors } = CustomColorMode();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    industry: "None",
    website: "None",
    mobile: "None",
    city: "None",
    state: "None",
  });

  useEffect(() => {
    if(user) {
      async function getProf() {
        try {
          await fetchJobPostings({company: user.company, startIndex: 1, perPage: 10});
          await fetchApplications(1, 5);
          const response = await fetch('http://localhost:3000/profile', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
          });
          const result = await response.json();
          if (response.ok) {
              setProfile({
                industry: result.industry,
                website: result.website,
                mobile: result.mobile,
                city: result.city,
                state: result.state,
              });
              setLoading(false);
          } else {
              alert(`Error: ${result.error}`);
          }
        } catch (error) {
          alert(`Error: ${error}`);
          console.error(error);
        }
      }

      getProf();
    }
  }, [user]);
  const gotoJobPost = () => {
    navigate("/post-job");
  };
  const gotoApplications = () => {
    navigate("/applications");
  };

  const isDesktop = useBreakpointValue({ base: false, md: true });

  return (
    <Flex direction="column" p={5}>
      <Flex direction={isDesktop ? "row" : "column"} w="full" mb={5}>
        {/* Employers Information */}
        <Flex direction="column" bg={colors.dividerColor} p={5} borderRadius="md" mb={isDesktop ? 0 : 5} w={isDesktop ? "70%" : "full"}>
          {/* Profile Picture and Contact Information Side by Side */}
          <HStack align="start" spacing={5}>
            <VStack align="center" spacing={3}>
              <Box>
                <ProfileSeekerImg />
              </Box>
              {/* Edit Profile Button */}
              <Box mt={3}>
                <UpdateEmployerInfo />
              </Box>
            </VStack>
            <VStack align="start" spacing={3}>
              <Heading as="h1" size="lg">{user.first_name} {user.last_name}</Heading>
              <Text>{profile.industry}</Text>
              <Flex align="center">
                <IconButton aria-label="Location" icon={<FaLocationPin />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={1}>{profile.city}, {profile.state}</Text>
              </Flex>
              <Flex align="center">
                <IconButton aria-label="Email" icon={<MdEmail />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={2}>{user.email}</Text>
              </Flex>
              <Flex align="center">
                <IconButton aria-label="PhoneNumber" icon={<FaPhoneAlt />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={2}>{profile.mobile}</Text>
              </Flex>
              {/* <Flex align="center">
                <IconButton aria-label="LinkedInURL" icon={<FaLinkedin />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={2} color="blue.500" textDecoration="underline">LinkedIn Profile URL</Text>
              </Flex> */}
              <Flex align="center">
                <IconButton aria-label="WebsiteURL" icon={<CgWebsite />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={2} color="teal.500" textDecoration="underline">{profile.website}</Text>
              </Flex>
            </VStack>
          </HStack>
        </Flex>

        {/* Job Postings */}
        <Flex direction="column" bg={colors.dividerColor} p={5} borderRadius="md" w={isDesktop ? "30%" : "full"} ml={isDesktop ? 5 : 0}>
          <Flex justify="space-between" align="center" mb={3}>
            <Heading as="h2" size="md">Job Postings</Heading>
            <Button variant="link" onClick={gotoJobPost} colorScheme="purple">View All</Button>
          </Flex>

          <Divider color={colors.textColor} />

          <Box mt={3}>
            <VStack align="start" spacing={3}>
              {jobPostings.map((job) => {
                return (
                  <Box key={job.job_id} bg={colors.pfSections} height={200}>
                    <Button ml={3} fontWeight={'bold'} fontSize={20} variant={'link'} color={colors.textColor} overflowY="auto">{job.title}</Button>
                    <Text fontWeight={'bold'} fontSize={15} ml={5} mb={3}>Posted {job.ago}</Text>
                    <Text ml={5} fontSize={15}>{job.job_description}</Text>
                    <Text fontWeight="bold" fontSize="lg">{job.title}</Text>
                    {/* <Text>Posted: 2 days ago</Text>
                    <Text>Location: Remote</Text>
                    <Text color="gray.600">Looking for a skilled Backend Developer with experience in Node.js and Express.</Text> */}
                  </Box>
                  // <Divider width="50%"/>
                )
              })}
            </VStack>
          </Box>
        </Flex>
      </Flex>

      {/* Applications */}
      <Flex direction={isDesktop ? "row" : "column"} w="full">
        {/* Outgoing Applications */}
        <Flex direction="column" bg={colors.dividerColor} p={5} borderRadius="md" mb={isDesktop ? 0 : 5} w={isDesktop ? "50%" : "full"} mr={isDesktop ? 5 : 0}>
          <Text fontSize="lg" fontWeight="bold" mb={3}>Outgoing Applications</Text>
          <Divider color="red.500" />
          <Box mt={3}>
            <VStack align="start" spacing={3}>
              <HStack spacing={3}>
                <Image src={TestPic} alt="Johnathon Smith" borderRadius="full" boxSize="75px" border="5px solid purple" objectFit="cover" />
                <VStack align="start">
                  <Text fontWeight="bold">Johnathon Smith</Text>
                  <Text>Position: Front-End Developer</Text>
                  <Text>Applied: 14 hrs ago</Text>
                </VStack>
              </HStack>
              <HStack spacing={3}>
                <Image src={TestPic} alt="Mary Jane" borderRadius="full" boxSize="75px" border="5px solid purple" objectFit="cover" />
                <VStack align="start">
                  <Text fontWeight="bold">Mary Jane</Text>
                  <Text>Position: Backend Developer</Text>
                  <Text>Applied: 2 days ago</Text>
                </VStack>
              </HStack>
              <HStack spacing={3}>
                <Image src={TestPic} alt="Michael Kirby" borderRadius="full" boxSize="75px" border="5px solid purple" objectFit="cover" />
                <VStack align="start">
                  <Text fontWeight="bold">Michael Kirby</Text>
                  <Text>Position: UX/UI Designer</Text>
                  <Text>Applied: 1 week ago</Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </Flex>
        {/* Application Responses */}
        <Flex direction="column" bg={colors.dividerColor} p={5} borderRadius="md" w={isDesktop ? "50%" : "full"}>
          <Text fontSize="lg" fontWeight="bold" mb={3}>Responses</Text>
          <Divider />
          <Box mt={3}>
            <VStack align="start" spacing={3}>
              <HStack spacing={3}>
                <Image src={TestPic} alt="George Washington" borderRadius="full" boxSize="75px" border="5px solid purple" objectFit="cover" />
                <VStack align="start">
                  <Text fontWeight="bold">George Washington</Text>
                  <Text>Position: Front-End Developer</Text>
                  <Text color="red">Status: Denied</Text>
                </VStack>
              </HStack>
              <HStack spacing={3}>
                <Image src={TestPic} alt="Alexander Hamilton" borderRadius="full" boxSize="75px" border="5px solid purple" objectFit="cover" />
                <VStack align="start">
                  <Text fontWeight="bold">Alexander Hamilton</Text>
                  <Text>Position: Backend Developer</Text>
                  <Text color="green">Status: Approved</Text>
                </VStack>
              </HStack>
              <HStack spacing={3}>
                <Image src={TestPic} alt="Abraham Lincoln" borderRadius="full" boxSize="75px" border="5px solid purple" objectFit="cover" />
                <VStack align="start">
                  <Text fontWeight="bold">Abraham Lincoln</Text>
                  <Text>Position: Project Manager</Text>
                  <Text color="blue">Status: Under Review</Text>
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ProfileEmployer;
