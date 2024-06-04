import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Heading,
  VStack,
  Flex,
} from "@chakra-ui/react";
import useApiStore from "../../store/api-store";
import { useParams } from "react-router-dom";

function Apply() {
  const { jobId } = useParams();
  const { jobs, fetchJobs } = useApiStore();
  const job = jobs.find((job) => job.job_id === parseInt(jobId));

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [commute, setCommute] = useState("");
  const [authorizedToWork, setAuthorizedToWork] = useState("");
  const [isVeteran, setIsVeteran] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setCity("");
    setState("");
    setCommute("");
    setAuthorizedToWork("");
    setIsVeteran("");
  };

  return (
    <Box className="apply-container" pl="5%">
      <Heading
        as="h2"
        className="apply-header"
        mt="1em"
        mb="1em"
        fontSize="32px"
        fontWeight="bold"
      >
        Apply To Job
      </Heading>
      {!job ? (
        <Text fontSize="24px" color="red.500">
          Job does not exist. Please check the job listing and try again.
        </Text>
      ) : (
        <>
          <Button
            className="upload-resume-btn"
            bg="#663399"
            color="white"
            border="none"
            px="0.5em"
            py="0.25em"
            borderRadius="1em"
            mb="2em"
            _hover={{ bg: "teal" }}
            maxW="10em"
          >
            Upload Resume
          </Button>
          <Flex
            className="job-info"
            mb="3em"
            flexDirection="row"
            alignItems="center"
          >
            <Box
              className="job-description"
              border="2px solid #000"
              p="0.5em"
              mb="1em"
              maxW="40em"
            >
              <Text>{job.job_description}</Text>
            </Box>
            <VStack align="start" ml="10em" spacing="0.5em">
              <Text className="job-info-item" fontSize="22px">
                <strong>{job.title}</strong>
              </Text>
              <Text className="job-info-item" fontSize="22px">
                <strong>Company:</strong> {job.company}
              </Text>
              <Text className="job-info-item" fontSize="22px">
                <strong>Location:</strong> {job.city}, {job.state}
              </Text>
              <Text className="job-info-item" fontSize="22px">
                <strong>Status:</strong> {job.employment_type}
              </Text>
            </VStack>
          </Flex>
          <Heading
            as="h3"
            className="questions-title"
            mt="1em"
            mb="0.5em"
            fontSize="24px"
            fontWeight="bold"
          >
            Questions
          </Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing="0.75em" align="stretch">
              <FormControl isRequired className="form-group" maxW="30em">
                <FormLabel htmlFor="firstName">First Name:</FormLabel>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  bg="rgb(95, 94, 94)"
                  border="1px solid #fff"
                  borderRadius="0.25em"
                  p="0.5em"
                />
              </FormControl>
              <FormControl isRequired className="form-group" maxW="30em">
                <FormLabel htmlFor="lastName">Last Name:</FormLabel>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  bg="rgb(95, 94, 94)"
                  border="1px solid #fff"
                  borderRadius="0.25em"
                  p="0.5em"
                />
              </FormControl>
              <FormControl isRequired className="form-group" maxW="30em">
                <FormLabel htmlFor="phoneNumber">Phone Number:</FormLabel>
                <Input
                  id="phoneNumber"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  bg="rgb(95, 94, 94)"
                  border="1px solid #fff"
                  borderRadius="0.25em"
                  p="0.5em"
                />
              </FormControl>
              <FormControl isRequired className="form-group" maxW="30em">
                <FormLabel htmlFor="city">City:</FormLabel>
                <Input
                  id="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  bg="rgb(95, 94, 94)"
                  border="1px solid #fff"
                  borderRadius="0.25em"
                  p="0.5em"
                />
              </FormControl>
              <FormControl isRequired className="form-group" maxW="30em">
                <FormLabel htmlFor="state">State:</FormLabel>
                <Input
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  bg="rgb(95, 94, 94)"
                  border="1px solid #fff"
                  borderRadius="0.25em"
                  p="0.5em"
                />
              </FormControl>
              <FormControl isRequired className="form-group" maxW="30em">
                <FormLabel htmlFor="commute">
                  Will you be able to make the commute? (Yes/No):
                </FormLabel>
                <Select
                  id="commute"
                  value={commute}
                  onChange={(e) => setCommute(e.target.value)}
                  bg="rgb(95, 94, 94)"
                  border="1px solid #fff"
                  borderRadius="0.25em"
                  p="0.5em"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </FormControl>
              <FormControl isRequired className="form-group" maxW="30em">
                <FormLabel htmlFor="authorizedToWork">
                  Are you authorized to work in the United States? (Yes/No):
                </FormLabel>
                <Select
                  id="authorizedToWork"
                  value={authorizedToWork}
                  onChange={(e) => setAuthorizedToWork(e.target.value)}
                  bg="rgb(95, 94, 94)"
                  border="1px solid #fff"
                  borderRadius="0.25em"
                  p="0.5em"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </FormControl>
              <FormControl isRequired className="form-group" maxW="30em">
                <FormLabel htmlFor="isVeteran">
                  Are you a veteran? (Yes/No):
                </FormLabel>
                <Select
                  id="isVeteran"
                  value={isVeteran}
                  onChange={(e) => setIsVeteran(e.target.value)}
                  bg="rgb(95, 94, 94)"
                  border="1px solid #fff"
                  borderRadius="0.25em"
                  p="0.5em"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </Select>
              </FormControl>
              <Button
                type="submit"
                bg="#663399"
                color="white"
                border="none"
                px="0.5em"
                py="0.25em"
                borderRadius="1em"
                cursor="pointer"
                mt="1em"
                _hover={{ bg: "teal" }}
                maxW="10em"
              >
                Submit
              </Button>
            </VStack>
          </form>
        </>
      )}
    </Box>
  );
}

export default Apply;
