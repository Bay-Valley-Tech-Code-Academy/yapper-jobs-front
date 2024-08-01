import { Flex, Heading, Box, Text, Button, IconButton, HStack, VStack, Image, useRadioGroup } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

{/*Imports for Other Page References*/}
import UpdateEmployerInfo from './UpdateEmployerInfo';
import ProfileSeekerImg from '../Profile-Seeker/ProfileSeekerImg';
import TestPic from "/yapper-jobs-defualt-seeker-img.jpg"
import useUserStore from '../../store/user-store';
import useSavedJobsStore from '../../store/saved-jobs-store';

{/*Imports for Icons on Profile Summary*/}
import { FaLocationPin } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { CgWebsite } from 'react-icons/cg';

import CustomColorMode from '/util/toggleColorMode';

function ProfileEmployer() {
  const { jobPostings, fetchJobPostings, applications, fetchApplications } = useSavedJobsStore();
  const { user } = useUserStore();
  const { colors } = CustomColorMode();
  // console.log(user)
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    industry: "None",
    website: "None",
    mobile: "None",
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
  }
  const gotoApplications = () => {
    navigate("/applications")
  }

  //format employer mobile number
  const formatPhoneNumber = (mobile) => {
    const countryCode = mobile?.slice(0, 1);
    const areaCode = mobile?.slice(1, 4);
    const localNumberPart1 = mobile?.slice(4, 7);
    const localNumberPart2 = mobile?.slice(7);

    return mobile ? `+${countryCode}-${areaCode}-${localNumberPart1}-${localNumberPart2}` : "No Mobile Number";
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  /* if (!user) {
    return <Text>Error loading user data.</Text>;
  } */
  
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
                <UpdateEmployerInfo/>
              </Box>
        </Box>
          {/* Employers Information */}
        <VStack align="start">
          <Heading as="h1" size="lg">{`${user.first_name} ${user.last_name}`}</Heading>
          <Flex align="center" mt={1}>
            <Text ml={1} spacing = {15}>{profile.industry}</Text>
          </Flex>
          {/* <Flex align="center" mt={1}>
            <Text ml={1} spacing = {15}>{profile.company_size}</Text>
          </Flex> */}
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
            <Text ml={2}>{user.email}</Text>
          </Flex>
          <Flex align="center" mt={1}>
            <IconButton
              aria-label="PhoneNumber"
              icon={<FaPhoneAlt/>}
              colorScheme="purple"
              variant="ghost"
              size="sm"
            />
            <Text ml={2}>{formatPhoneNumber(profile.mobile) ? formatPhoneNumber(profile.mobile) : "No Mobile Number"}</Text>
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
            <Text ml={2}>{profile.website}</Text>
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
      <Box bg={colors.pfSections} width={800} height={400} borderRadius="md" overflowY="auto" mt={-7}>        
        {jobPostings.map((job) => {
          return (
            <Box key={job.job_id} bg={colors.pfSections} height={200}>
              <Button ml={3} fontWeight={'bold'} fontSize={20} variant={'link'} color={colors.textColor} overflowY="auto">{job.title}</Button>
              <Text fontWeight={'bold'} fontSize={15} ml={5} mb={3}>Posted {job.date_created}</Text>
              <Text ml={5} fontSize={15}>{job.job_description}</Text>
            </Box>
          )
        })}
      </Box>
      </Flex>
        
        {/* Applications */}
        <VStack align="start">
        <Flex>
        <Text fontSize={40}>Applications</Text>
        <Button variant="link" colorScheme='purple' ml={500} mt={10} onClick={gotoApplications}>View All </Button>
        </Flex>
        <Box bg={colors.pfJobSection} width={800} height={400} borderRadius="md" overflowY="auto">
        <Text fontSize={'large'} ml={4} fontWeight={'bold'}>Incoming </Text>
          {applications.apps.map((app) => {
            return (
              <Box key={app.app_index} mt={5}>
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
                    <Text fontWeight={'bold'}>{app.first_name} {app.last_name}</Text>
                    <Text>Position : {app.title}</Text>
                    <Text>Applied : {app.dare_applied}</Text>
                  </VStack>
                </HStack>
              </Box>
            )
          })}
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
      <Box bg={colors.pfJobSection} width={800} height={350} borderRadius="md" overflowY="auto">
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
