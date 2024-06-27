import { useState, useEffect } from "react";
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
import useApiStore from "../store/api-store";
import { useParams } from "react-router-dom";
import useUserStore from "../store/user-store";

function Apply() {
  const { jobId } = useParams();
  const { jobs, fetchJobs } = useApiStore();
  const job = jobs.find((job) => job.job_id === parseInt(jobId));
  const {user} = useUserStore();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [commute, setCommute] = useState("");
  const [authorizedToWork, setAuthorizedToWork] = useState("");
  const [isVeteran, setIsVeteran] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setFirstName("");
  //   setLastName("");
  //   setPhoneNumber("");
  //   setCity("");
  //   setState("");
  //   setCommute("");
  //   setAuthorizedToWork("");
  //   setIsVeteran("");
  // };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
    
    // Step 1: Gather form data
    const formData = {
      jobId: jobId,
      answers: {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        city: city,
        state: state,
        commute: commute === "Yes", // Converts "Yes" to true, anything else to false
        authorizedToWork: authorizedToWork === "Yes",
        isVeteran: isVeteran === "Yes"
      }
    };

    console.log(formData)

    
      // Step 2: Send data to backend
      try {
        const response = await fetch('YOUR_BACKEND_ENDPOINT', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
    
        const data = await response.json();
        console.log('Submission successful', data);
        // Handle success response
    
        // Step 3: Reset form fields after successful submission
        setFirstName("");
        setLastName("");
        setPhoneNumber("");
        setCity("");
        setState("");
        setCommute("");
        setAuthorizedToWork("");
        setIsVeteran("");
      } catch (error) {
        console.error('Error during submission:', error);
        // Handle error case
      }
    };

  const handlePhoneNumberChange = (e) => {
    const digitsOnly = e.target.value.replace(/\D/g, "");
    if (digitsOnly.length <= 10) {
      setPhoneNumber(digitsOnly);
      // Check if the length is exactly 10 digits to hide/show the error message
      setPhoneNumberError(digitsOnly.length !== 10);
    }
  };

  const handleStateChange = (e) => {
    const input = e.target.value;
    // Limit the input to 2 characters
    if (input.length <= 2) {
      setState(input.toUpperCase()); // Optionally convert to uppercase
    }
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
                  // onChange={(e) => setPhoneNumber(e.target.value)}
                  onChange={handlePhoneNumberChange}
                  bg="rgb(95, 94, 94)"
                  border="1px solid #fff"
                  borderRadius="0.25em"
                  p="0.5em"
                />
                {/* Conditionally render the error message */}
                {phoneNumberError && (
                  <Text color="red.500">
                    Phone number must be exactly 10 digits.
                  </Text>
                )}
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
                  // onChange={(e) => setState(e.target.value)}
                  onChange={handleStateChange}
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