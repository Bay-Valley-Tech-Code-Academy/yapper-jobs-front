import { 
  ChakraProvider, 
  Flex, 
  Text, 
  Button, 
  VStack, 
  Box, 
  HStack, 
  Image, 
  Select, 
  Grid, 
  GridItem, 
  Stat, 
  StatLabel, 
  StatNumber, 
  StatHelpText, 
  Tooltip, 
  IconButton, 
  Badge 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import CustomColorMode from '/util/toggleColorMode';
import TestPic from "/yapper-jobs-defualt-seeker-img.jpg";

function EmployerMain() {
  const navigate = useNavigate();
  const { colors } = CustomColorMode();

  const gotoJobPost = () => {
    navigate("/post-job");
  }

  const gotoApplications = () => {
    navigate("/applications");
  }

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
          <Button variant="link" colorScheme='purple' onClick={gotoJobPost}>Post New Job</Button>
        </Flex>
        <Box bg={colors.pfJobSection} width={800} borderRadius="md" overflowY="auto">
          <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
            <VStack align="start" spacing={2}>
              <Flex justify="space-between" w="100%">
                <Text fontWeight="bold" fontSize="large">Front-End Developer</Text>
                <HStack spacing={3}>
                  <Tooltip label="Edit" fontSize="md">
                    <IconButton icon={<EditIcon />} size="sm" />
                  </Tooltip>
                  <Tooltip label="Delete" fontSize="md">
                    <IconButton icon={<DeleteIcon />} size="sm" />
                  </Tooltip>
                </HStack>
              </Flex>
              <Text>Location: Remote</Text>
              <Text>Experience: 2+ years</Text>
              <Text>Posted: 2 days ago</Text>
              <Select placeholder="Select status" mt={2} w="200px">
                <option value="open">Open</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
              </Select>
            </VStack>
            <Box borderBottom="1px solid #ccc" mt={4} />
          </Box>
          <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
            <VStack align="start" spacing={2}>
              <Flex justify="space-between" w="100%">
                <Text fontWeight="bold" fontSize="large">Backend Developer</Text>
                <HStack spacing={3}>
                  <Tooltip label="Edit" fontSize="md">
                    <IconButton icon={<EditIcon />} size="sm" />
                  </Tooltip>
                  <Tooltip label="Delete" fontSize="md">
                    <IconButton icon={<DeleteIcon />} size="sm" />
                  </Tooltip>
                </HStack>
              </Flex>
              <Text>Location: New York</Text>
              <Text>Experience: 3+ years</Text>
              <Text>Posted: 3 days ago</Text>
              <Select placeholder="Select status" mt={2} w="200px">
                <option value="open">Open</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
              </Select>
            </VStack>
            <Box borderBottom="1px solid #ccc" mt={4} />
          </Box>
          <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
            <VStack align="start" spacing={2}>
              <Flex justify="space-between" w="100%">
                <Text fontWeight="bold" fontSize="large">Full Stack Developer</Text>
                <HStack spacing={3}>
                  <Tooltip label="Edit" fontSize="md">
                    <IconButton icon={<EditIcon />} size="sm" />
                  </Tooltip>
                  <Tooltip label="Delete" fontSize="md">
                    <IconButton icon={<DeleteIcon />} size="sm" />
                  </Tooltip>
                </HStack>
              </Flex>
              <Text>Location: San Francisco</Text>
              <Text>Experience: 5+ years</Text>
              <Text>Posted: 5 days ago</Text>
              <Select placeholder="Select status" mt={2} w="200px">
                <option value="open">Open</option>
                <option value="paused">Paused</option>
                <option value="closed">Closed</option>
              </Select>
            </VStack>
          </Box>
        </Box>
      </VStack>

      {/* Applications */}
      <VStack align="start" mt={10}>
        <Flex justify="space-between" align="center" mb={5} width={800}>
          <Text fontSize={40}>Applications</Text>
          <Button variant="link" colorScheme='purple' onClick={gotoApplications}>View All</Button>
        </Flex>
        <Box bg={colors.pfJobSection} width={800} borderRadius="md" overflowY="auto">
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
      </VStack>

      {/* Interviews */}
      <VStack align="start" mt={10}>
        <Text fontSize={40}>Interviews</Text>
        <Box bg={colors.pfJobSection} width={800} borderRadius="md" overflowY="auto">
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
      </VStack>
    </Flex>
    </ChakraProvider>
  );
}

export default EmployerMain;
