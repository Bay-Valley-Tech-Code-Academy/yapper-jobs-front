{/*Imports for React and Chakra*/}
import React { useEffect, useState } from 'react';
import { Flex, Heading, Box, Text, Button, IconButton, HStack, VStack, Image, useRadioGroup, useBreakpointValue, Divider } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import customColorMode from "../../../util/toggleColorMode";

{/*Imports for Other Page References*/}
import UpdateEmployerInfo from './UpdateEmployerInfo';
import ProfileSeekerImg from '../Profile-Seeker/ProfileSeekerImg';
import TestPic from "/yapper-jobs-defualt-seeker-img.jpg";
import useUserStore from '../../store/user-store';

{/*Imports for Icons on Profile Summary*/}
import { FaLocationPin } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CgWebsite } from 'react-icons/cg';

import CustomColorMode from '/util/toggleColorMode';

function ProfileEmployer() {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const { colorMode, toggleColorMode, colors } = customColorMode();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      setLoading(false);
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
              <Heading as="h1" size="lg">Bay Valley Tech Software</Heading>
              <Text>Software Development</Text>
              <Text>11 - 50 Employees (Small Business)</Text>
              <Flex align="center">
                <IconButton aria-label="Location" icon={<FaLocationPin />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={1}>Modesto, CA</Text>
              </Flex>
              <Flex align="center">
                <IconButton aria-label="Email" icon={<MdEmail />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={2}>yappercontact@gmail.com</Text>
              </Flex>
              <Flex align="center">
                <IconButton aria-label="PhoneNumber" icon={<FaPhoneAlt />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={2}>209-456-7810</Text>
              </Flex>
              <Flex align="center">
                <IconButton aria-label="LinkedInURL" icon={<FaLinkedin />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={2} color="blue.500" textDecoration="underline">LinkedIn Profile URL</Text>
              </Flex>
              <Flex align="center">
                <IconButton aria-label="WebsiteURL" icon={<CgWebsite />} colorScheme="purple" variant="ghost" size="sm" />
                <Text ml={2} color="teal.500" textDecoration="underline">Website URL</Text>
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
              <Box>
                <Text fontWeight="bold" fontSize="lg">Backend Developer</Text>
                <Text>Posted: 2 days ago</Text>
                <Text>Location: Remote</Text>
                <Text color="gray.600">Looking for a skilled Backend Developer with experience in Node.js and Express.</Text>
              </Box>
              <Divider width="50%"/>
              <Box>
                <Text fontWeight="bold" fontSize="lg">Project Manager</Text>
                <Text>Posted: 1 week ago</Text>
                <Text>Location: New York, NY</Text>
                <Text color="gray.600">Seeking an experienced Project Manager to lead cross-functional teams and deliver complex projects.</Text>
              </Box>
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
