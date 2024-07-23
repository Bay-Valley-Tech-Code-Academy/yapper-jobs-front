import {
  ChakraProvider,
  Flex,
  Text,
  Button,
  VStack,
  Box,
  Grid,
  GridItem,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Spinner,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useApiStore from "../store/api-store";
import useUserStore from "../store/user-store";
import CustomColorMode from '/util/toggleColorMode';
import useSavedJobsStore from '../store/saved-jobs-store';
import JobPostCard from '../components/JobPostCard';
import ApplicationCard from '../components/ApplicationCard';
import InterviewCard from '../components/InterviewCard';

function EmployerMain() {
  const navigate = useNavigate();
  const { fetchJobs, jobs } = useApiStore();
  const { fetchSavedJobsId, fetchApplications, fetchInterviews, applications, interviews } = useSavedJobsStore();
  const { colors } = CustomColorMode();
  const { user } = useUserStore();

  useEffect(() => {
    fetchJobs();
    if (user) {
      fetchSavedJobsId();
      fetchApplications();
      fetchInterviews();
    }
  }, [user, fetchJobs, fetchSavedJobsId, fetchApplications, fetchInterviews]);

  const goToJobPost = () => {
    navigate("/post-job");
  };

  const gotoApplications = () => {
    navigate("/applications");
  };

  return (
    <ChakraProvider>
      <Flex direction="column" p={5} mx="auto" color={colors.textColor}>
        {/* Analytics */}
        <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={10}>
          <GridItem w="100%" h="100px" bg={colors.employerDash} borderRadius="md" p={4}>
            <Stat color={colors.textColor}>
              <StatLabel color={colors.textColor}>Total Applications</StatLabel>
              <StatNumber>100</StatNumber>
              <StatHelpText>Last 30 days</StatHelpText>
            </Stat>
          </GridItem>
          <GridItem w="100%" h="100px" bg={colors.employerDash} borderRadius="md" p={4}>
            <Stat>
              <StatLabel>Total Jobs Posted</StatLabel>
              <StatNumber>10</StatNumber>
              <StatHelpText>Last 30 days</StatHelpText>
            </Stat>
          </GridItem>
          <GridItem w="100%" h="100px" bg={colors.employerDash} borderRadius="md" p={4}>
            <Stat>
              <StatLabel>Total Interviews</StatLabel>
              <StatNumber>45</StatNumber>
              <StatHelpText>Last 30 days</StatHelpText>
            </Stat>
          </GridItem>
        </Grid>

        {/* Recent Activity */}
        <VStack align="start" mb={10} width={800}>
          <Text fontSize={40}>Recent Activity</Text>
          <Box bg={colors.pfJobSection} width={800} borderRadius="md" p={5}>
            <Text fontSize='large' fontWeight='bold'>Activities</Text>
            <Box mt={5}>
              <Text>New application from Gojo Satoru for Front-End Developer - 14 hrs ago</Text>
            </Box>
            <Box mt={5}>
              <Text>Eren Yeager&apos;s application for Janitor status changed to Denied - 12 hrs ago</Text>
            </Box>
            <Box mt={5}>
              <Text>Interview scheduled for Naruto Uzumaki - October 28, 2024</Text>
            </Box>
          </Box>
        </VStack>

        {/* Job Postings */}
        <VStack align="start">
          <Flex justify="space-between" align="center" mb={5} width={800}>
            <Text fontSize={40}>Job Postings</Text>
            <Button variant="link" colorScheme='purple' onClick={goToJobPost}>Post New Job</Button>
          </Flex>
          <Box bg={colors.pfJobSection} width={800} borderRadius="md" overflowY="auto">
            {/* {jobs.map((job, index) => (
              <JobPostCard
                key={index}
                title={job.title}
                isRemote={job.isRemote}
                city={job.city}
                state={job.state}
                experience_level={job.experience_level}
              />
            ))} */}
          </Box>
        </VStack>

        {/* Applications */}
        <VStack align="start" mt={10}>
          <Flex justify="space-between" align="center" mb={5} width={800}>
            <Text fontSize={40}>Applications</Text>
            <Button variant="link" colorScheme='purple' onClick={gotoApplications}>View All</Button>
          </Flex>
          <Box bg={colors.pfJobSection} width={800} borderRadius="md" overflowY="auto">
            {applications.length === 0 ? (
              <Spinner />
            ) : (
              applications.map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))
            )}
            {/* //hard code on application 
            <VStack align="start" mt={10}>
              <Flex justify="space-between" align="center" mb={5} width={800}>
                <Text fontSize={40}>Applications</Text>
                <Button variant="link" colorScheme='purple' onClick={gotoApplications}>View All</Button>
              </Flex>
              <Box bg="gray.100" width={800} borderRadius="md" overflowY="auto">
                <Text fontSize='large' ml={4} fontWeight='bold'>Incoming</Text>
                <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
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
                    <VStack align="start">
                <Text fontWeight="bold">Gojo Satoru</Text>
                <Text>Position: Front-End Developer</Text>
                <Text>Applied: 14 hrs ago</Text>
                <HStack>
                  <Badge colorScheme="green">Status: Accepted</Badge>
                  <Select placeholder="Change status" w="150px">
                    <option value="accept">Accept</option>
                    <option value="deny">Deny</option>
                    <option value="pending">Pending</option>
                  </Select>
                </HStack>
              </VStack>
            </HStack>
            <Box borderBottom="1px solid #ccc" mt={4} />
          </Box>
          <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
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
              <VStack align="start">
                <Text fontWeight="bold">Eren Yeager</Text>
                <Text>Position: Janitor</Text>
                <Text>Applied: 12 hrs ago</Text>
                <HStack>
                  <Badge colorScheme="red">Status: Denied</Badge>
                  <Select placeholder="Change status" w="150px">
                    <option value="accept">Accept</option>
                    <option value="deny">Deny</option>
                    <option value="pending">Pending</option>
                  </Select>
                </HStack>
              </VStack>
            </HStack>
            <Box borderBottom="1px solid #ccc" mt={4} />
          </Box>
          <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
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
              <VStack align="start">
                <Text fontWeight="bold">Tanjiro Kamado</Text>
                <Text>Position: Front-End Developer</Text>
                <Text>Applied: 5 hrs ago</Text>
                <HStack>
                  <Badge colorScheme="yellow">Status: Pending</Badge>
                  <Select placeholder="Change status" w="150px">
                    <option value="accept">Accept</option>
                    <option value="deny">Deny</option>
                    <option value="pending">Pending</option>
                  </Select>
                </HStack>
              </VStack>
            </HStack>
            <Box borderBottom="1px solid #ccc" mt={4} />
          </Box>
          <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
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
              <VStack align="start">
                <Text fontWeight="bold">Goku</Text>
                <Text>Position: Backend Developer</Text>
                <Text>Applied: 8 hrs ago</Text>
                <HStack>
                  <Badge colorScheme="yellow">Status: Pending</Badge>
                  <Select placeholder="Change status" w="150px">
                    <option value="accept">Accept</option>
                    <option value="deny">Deny</option>
                    <option value="pending">Pending</option>
                  </Select>
                </HStack>
              </VStack>
            </HStack>
          </Box>
        </Box>
      </VStack> */}
          </Box>
        </VStack>

        {/* Interviews */}
        <VStack align="start" mt={10}>
          <Text fontSize={40}>Interviews</Text>
          <Box bg={colors.pfJobSection} width={800} borderRadius="md" overflowY="auto">
            {interviews.length === 0 ? (
              <Spinner />
            ) : (
              interviews.map((interview) => (
                <InterviewCard key={interview.id} interview={interview} />
              ))
            )}
            {/* //hard code on interviews 
            <VStack align="start" mt={10}>
              <Text fontSize={40}>Interviews</Text>
              <Box bg="gray.100" width={800} borderRadius="md" overflowY="auto">
              <Text fontSize='large' ml={4} fontWeight='bold'>Upcoming</Text>
              <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
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
                <VStack align="start">
                  <Text fontWeight="bold">Naruto Uzumaki</Text>
                  <Text>Position: Full Stack Developer</Text>
                  <Text>Interview: October 28, 2024</Text>
                  <Badge colorScheme="green">Status: Accepted</Badge>
                </VStack>
              </HStack>
              <Box borderBottom="1px solid #ccc" mt={4} />
            </Box>
            <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
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
              <VStack align="start">
                <Text fontWeight="bold">Gon Freecess</Text>
                <Text>Position: Front-End Developer</Text>
                <Text>Interview: 0 days from now</Text>
                <Badge colorScheme="yellow">Status: Re-Schedule</Badge>
              </VStack>
            </HStack>
            <Box borderBottom="1px solid #ccc" mt={4} />
          </Box>
          <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
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
              <VStack align="start">
                <Text fontWeight="bold">Gojo Satoru</Text>
                <Text>Position: Front-End Developer</Text>
                <Text>Interview: 7 days from now</Text>
                <Badge colorScheme="green">Status: Accepted</Badge>
              </VStack>
            </HStack>
          </Box>
        </Box>
      </VStack> */}
          </Box>
        </VStack>
      </Flex>
    </ChakraProvider>
  );
}

export default EmployerMain;
