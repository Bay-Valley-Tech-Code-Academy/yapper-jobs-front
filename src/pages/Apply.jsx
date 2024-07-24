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
  const { user } = useUserStore();

  const [formData, setFormData] = useState({});
  const [phoneNumberError, setPhoneNumberError] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const job = jobs.find((job) => job.job_id === parseInt(jobId));

  // Initialize formData based on job's questions
  useEffect(() => {
    if (job && job.questions) {
      const initialFormData = job.questions.reduce((acc, question) => {
        acc[question] = "";
        return acc;
      }, {});
      setFormData(initialFormData);
    }
  }, [job]);

  const handleChange = (e, question) => {
    const value = e.target.value;
    if (question === "Phone Number") {
      const digitsOnly = value.replace(/\D/g, "");
      if (digitsOnly.length <= 10) {
        setFormData((prev) => ({ ...prev, [question]: digitsOnly }));
        setPhoneNumberError(digitsOnly.length !== 10);
      }
    } else if (question === "State") {
      if (value.length <= 2) {
        setFormData((prev) => ({ ...prev, [question]: value.toUpperCase() }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [question]: value }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedData = {
      jobId: jobId,
      answers: {
        ...formData,
        commute: formData["Will you be able to make the commute?"] === "Yes",
        authorizedToWork:
          formData["Are you authorized to work in the United States?"] ===
          "Yes",
        isVeteran: formData["Are you a veteran?"] === "Yes",
      },
    };

    try {
      const jwt = localStorage.getItem("jwt");
      console.log(formattedData);
      const response = await fetch(`/job/apply/${jobId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Submission successful", data);
      setFormData(
        job.questions.reduce((acc, question) => {
          acc[question] = "";
          return acc;
        }, {})
      );
    } catch (error) {
      console.error("Error during submission:", error);
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
              {job.questions && job.questions.map((question) => (
                <FormControl
                  key={question}
                  isRequired
                  className="form-group"
                  maxW="30em"
                >
                  <FormLabel htmlFor={question}>{question}:</FormLabel>
                  {["Will you be able to make the commute?", "Are you authorized to work in the United States?", "Are you a veteran?"].includes(
                    question
                  ) ? (
                    <Select
                      id={question}
                      value={formData[question]}
                      onChange={(e) => handleChange(e, question)}
                      bg="rgb(95, 94, 94)"
                      border="1px solid #fff"
                      borderRadius="0.25em"
                      p="0.5em"
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </Select>
                  ) : (
                    <Input
                      id={question}
                      value={formData[question]}
                      onChange={(e) => handleChange(e, question)}
                      bg="rgb(95, 94, 94)"
                      border="1px solid #fff"
                      borderRadius="0.25em"
                      p="0.5em"
                    />
                  )}
                  {question === "Phone Number" && phoneNumberError && (
                    <Text color="red.500">
                      Phone number must be exactly 10 digits.
                    </Text>
                  )}
                </FormControl>
              ))}
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
