{/*Imports for React and Chakra*/}
import React from 'react'
import { Flex, Heading, Box, Text, Button, IconButton, HStack, VStack, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

{/*Imports for Other Page References*/}
import UpdateEmployerInfo from './UpdateEmployerInfo';
import ProfileSeekerImg from '../Profile-Seeker/ProfileSeekerImg';
import TestPic from "/yapper-jobs-defualt-seeker-img.jpg"

{/*Imports for Icons on Profile Summary*/}
import { FaLocationPin } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CgWebsite } from 'react-icons/cg';


function ProfileEmployer() {
  const navigate = useNavigate();

  const gotoJobPost = () => {
    navigate("/post-job");
  }
  const gotoApplications = () => {
    navigate("/applications")
  }
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
                <UpdateEmployerInfo/>
              </Box>
        </Box>
          {/* Employers Information */}
        <VStack align="start">
          <Heading as="h1" size="lg">Yapper Software</Heading>
          <Flex align="center" mt={1}>
            <Text ml={1} spacing = {15}>Software Development</Text>
          </Flex>
          <Flex align="center" mt={1}>
            <Text ml={1} spacing = {15}>Less than 12 employees</Text>
          </Flex>
          <Flex align="center" mt={1}>
            <IconButton
              aria-label="Location"
              icon={<FaLocationPin />}
              colorScheme="purple"
              variant="ghost"
              size="sm"
            />
            <Text ml={1}>California, US</Text>
          </Flex>
          <Flex align="center" mt={1}>
            <IconButton
              aria-label="Email"
              icon={<MdEmail />}
              colorScheme="purple"
              variant="ghost"
              size="sm"
            />
            <Text ml={2}>yappercontact@gmail.com</Text>
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
              aria-label="WebsiteURL"
              icon={<CgWebsite/>}
              colorScheme="purple"
              variant="ghost"
              size="sm"
            />
            <Text ml={2}>Website URL</Text>
          </Flex>
        </VStack>
      </HStack>

      {/* Jobs Postings */}
      <Box mb={10} mt={10}>
        <Flex ml={5} >
        <Heading as="h2" size="md">Job Postings</Heading>
        <Flex ml={5}>
        <Button colorScheme="purple" variant={'link'} onClick={gotoJobPost}>View All</Button>
        </Flex>
        </Flex>
      </Box>
      <Box bg="gray.100" width={800} height={400} borderRadius="md" overflowY="auto" mt={-7}>        
        <Box bg="gray.300" height={200}>
          <Button ml={3} fontWeight={'bold'} fontSize={20} variant={'link'} color={'black'} overflowY="auto">Front-End Developer</Button>
          <Text fontWeight={'bold'} fontSize={15} ml={5} mb={3}>Posted 14 days ago</Text>
          <Text ml={5} fontSize={15}>Looking for a front end developer with a minimum of 2 years work experience with knowledge of JavaScript, HTML, CSS, Chakra UI, and basic knowledge of Git  </Text>
        </Box>
        <Box bg="gray.300" height={200}>
          <Button ml={3} fontWeight={'bold'} fontSize={20} variant={'link'} color={'black'}>Backend Developer</Button>
          <Text fontWeight={'bold'} fontSize={15} ml={5} mb={3}>Posted 1 day ago</Text>
          <Text ml={5} fontSize={15}>Urgently hiring a backend developer. Looking for minimum 4 years experience with proficient with MySQL, Firebase, Insomnia, and Netlify. Extensive knowledge of APIS is a requirement</Text>
        </Box><Box bg="gray.300" height={200}>
          <Button ml={3} fontWeight={'bold'} fontSize={20} variant={'link'} color={'black'}>Janitor / Groundskeeper</Button>
          <Text ml={5} fontSize={15}>Looking for janitor to clean toilets, thats it. We pay</Text>
        </Box>
      </Box>
      </Flex>
        
        {/* Applications */}
        <VStack align="start">
        <Flex>
        <Text fontSize={40}>Applications</Text>
        <Button variant="link" colorScheme='purple' ml={500} mt={10} onClick={gotoApplications}>View All </Button>
        </Flex>
        <Box bg="gray.100" width={800} height={400} borderRadius="md" overflowY="auto">
        <Text fontSize={'large'} ml={4} fontWeight={'bold'}>Incoming </Text>
          {/*Basic Box For Incoming Applicants*/}
          <Box mt={5}>
          <HStack>
            <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="75px"
                    border="5px solid purple"
                    objectFit="cover"
                    ml={4}
                    mt={2}
                />
              <VStack align={'start'}>
                <Text fontWeight={'bold'}>Joe Mama</Text>
                <Text>Position : Front-End Developer</Text>
                <Text>Applied : 14 hrs ago</Text>
                </VStack>
            </HStack>
        </Box>
        <Box mt={5}>
        <HStack>
        <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="75px"
                    border="5px solid purple"
                    objectFit="cover"
                    ml={4}
                    mt={2}
                />
                <VStack align={'start'}>
                <Text fontWeight={'bold'}>Eren Yeager</Text>
                <Text>Position : Janitor</Text>
                <Text>Applied : 14 hrs ago</Text>
                </VStack>
              </HStack>
        </Box>
        <Box mt={5}>
        <HStack>
        <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="75px"
                    border="5px solid purple"
                    objectFit="cover"
                    ml={4}
                    mt={2}
                />
                <VStack align={'start'}>
                <Text fontWeight={'bold'}>Tanjiro Kamado</Text>
                <Text>Position : Front-End Developer</Text>
                <Text>Applied : 15 hrs ago</Text>
                </VStack>
              </HStack>
        </Box>
        <Box mt={5}>
        <HStack>
        <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="75px"
                    border="5px solid purple"
                    objectFit="cover"
                    ml={4}
                    mt={2}
                />
                <VStack align={'start'}>
                <Text fontWeight={'bold'}>Goku</Text>
                <Text>Position : Backend Developer</Text>
                <Text>Applied : 19 hrs ago</Text>
                </VStack>
              </HStack>
        </Box>
      </Box>
          {/*Replied Box*/}
      <Box bg="gray.100" width={800} height={350} borderRadius="md" overflowY="auto">
        <Text fontSize={'large'} ml={5} fontWeight={'bold'}>Replied</Text>
          {/*Basic Box For Replied Applicants*/}
        <Box mt={5}>
          <HStack>
          <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="75px"
                    border="5px solid purple"
                    objectFit="cover"
                    ml={4}
                    mt={2}
                />
                <VStack align={'start'}>
                <Text fontWeight={'bold'}>George Washington</Text>
                <Text>Position : Front-End Developer</Text>
                <Text color={'red'}>Status : Denied</Text>
                </VStack>
              </HStack>
        </Box>
        <Box mt={5}>
          <HStack>
          <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="75px"
                    border="5px solid purple"
                    objectFit="cover"
                    ml={4}
                    mt={2}
                />
                <VStack align={'start'}>
                <Text fontWeight={'bold'}>John F. Kennedy</Text>
                <Text>Position : Front-End Developer</Text>
                <Text color={'red'}>Status : Denied</Text>
                </VStack>
              </HStack>
        </Box>
        <Box mt={5}>
          <HStack>
          <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="75px"
                    border="5px solid purple"
                    objectFit="cover"
                    ml={4}
                    mt={2}
                />
                <VStack align={'start'}>
                <Text fontWeight={'bold'}>Abraham Lincoln</Text>
                <Text>Position : Front-End Developer</Text>
                <Text color={'#D69E2E'}>Status : Interview Pending</Text>
                </VStack>
              </HStack>
        </Box>
        <Box mt={5}>
          <HStack>
          <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="75px"
                    border="5px solid purple"
                    objectFit="cover"
                    ml={4}
                    mt={2}
                />
                <VStack align={'start'}>
                <Text fontWeight={'bold'}>John Adams</Text>
                <Text>Position : Front-End Developer</Text>
                <Text color={'green'}>Status : Hired </Text>
                </VStack>
              </HStack>
        </Box>
        <Box mt={5}>
          <HStack>
          <Image
                    className="seeker-img"
                    src={TestPic}
                    alt="Default Profile Pic"
                    borderRadius="full"
                    boxSize="75px"
                    border="5px solid purple"
                    objectFit="cover"
                    ml={4}
                    mt={2}
                />
                <VStack align={'start'}>
                <Text fontWeight={'bold'}>Benjamin Franklin</Text>
                <Text>Position : Front-End Developer</Text>
                <Text color={'green'}>Status : Hired</Text>
                </VStack>
              </HStack>
        </Box>
      </Box>
      </VStack>
    </Flex>
  )
}

export default ProfileEmployer;
