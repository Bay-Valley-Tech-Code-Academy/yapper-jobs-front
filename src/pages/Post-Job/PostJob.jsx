import React, { useRef, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  HStack,
  VStack,
  Container,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  IconButton,
  List,
  ListItem,
  Flex,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepTitle,
  StepSeparator,
  StepIcon,
  StepNumber,
  Badge,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import customColorMode from "../../../util/toggleColorMode";

const sections = [
  {
    id: "basic-information",
    label: "Basic Information",
    fields: [
      "job-position-title",
      "company",
      "state",
      "city",
      "zipcode",
      "experience-level",
      "job-type",
      "work-location",
    ],
  },
  {
    id: "additional-details",
    label: "Additional Details",
    fields: ["company-size", "salary-min", "salary-max", "benefits", "skills"],
    optionalFields: ["qualifications"],
  },
  {
    id: "description",
    label: "Description",
    fields: ["description"],
    optionalFields: ["responsibilities"],
  },
];

const JobPosting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [completedSections, setCompletedSections] = useState({});
  const { colorMode, toggleColorMode, colors } = customColorMode();
  const toast = useToast();

  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    "job-position-title": "",
    company: "",
    state: "",
    city: "",
    zipcode: "",
    "experience-level": "",
    "job-type": "",
    "work-location": "",
    "salary-min": "",
    "salary-max": "",
    "company-size": "",
    // benefits: '',
    benefits: [],
    skills: "",
    qualifications: "",
    responsibilities: "",
    description: "",
  });
  const [formError, setFormError] = useState("");

  // console.log(formData);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // Capitalize the first letter of the company name
    if (id === "company") {
      const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
      setFormData({
        ...formData,
        [id]: capitalizedValue,
      });
      return;
    }

    // Validation for zipcode
    if (id === "zipcode") {
      if (!/^\d*$/.test(value)) {
        setFormError("Zipcode cannot contain letters");
        return;
      }
      if (value.length > 5) {
        setFormError("Zipcode cannot be longer than 5 digits");
        return;
      }
    }

    setFormData({
      ...formData,
      [id]: value,
    });
    setFormError(""); // Clear error message on input change
  };

  const handleNextStep = () => {
    if (activeStep < sections.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePrevStep = () => {
    const currentSection = sections[activeStep];
    const isSectionCompleted = currentSection.fields.every(
      (field) => formData[field] && formData[field].trim() !== ""
    );

    if (!isSectionCompleted) {
      setCompletedSections({
        ...completedSections,
        [activeStep]: false,
      });
    }

    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  // Handle benefits input separately to split comma-separated values
  const handleBenefitsChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      benefits: value.split(",").map((benefit) => benefit.trim()), // Split comma-separated values and trim whitespace
    }));
  };

  // const handleCompleteSection = () => {
  //   const currentSection = sections[activeStep];
  //   const requiredFields = currentSection.fields.filter(
  //     (field) =>
  //       !currentSection.optionalFields ||
  //       !currentSection.optionalFields.includes(field)
  //   );
  //   const isSectionCompleted = requiredFields.every(
  //     (field) => formData[field] && formData[field].trim() !== ""
  //   );

  //   if (!isSectionCompleted) {
  //     setFormError(
  //       "Please complete all required fields in the current section before proceeding."
  //     );
  //     toast({
  //       title: "Error",
  //       description:
  //         "Please complete all required fields in the current section before proceeding.",
  //       status: "error",
  //       duration: 1000,
  //       isClosable: true,
  //     });
  //     return;
  //   }

  //   setCompletedSections({
  //     ...completedSections,
  //     [activeStep]: true,
  //   });

  //   setFormError(""); // Clear error message on section complete

  //   if (activeStep === sections.length - 1) {
  //     // Mark the last step as completed
  //     setCompletedSections({
  //       ...completedSections,
  //       [activeStep]: true,
  //     });
  //     toast({
  //       title: "Success",
  //       description: "Job posting created successfully!",
  //       status: "success",
  //       duration: 5000,
  //       isClosable: true,
  //     });
  //   } else {
  //     handleNextStep();
  //   }
  // };

  const handleCompleteSection = () => {
    const currentSection = sections[activeStep];
    const requiredFields = currentSection.fields.filter(
      (field) => !currentSection.optionalFields || !currentSection.optionalFields.includes(field)
    );
    const isSectionCompleted = requiredFields.every(
      (field) => formData[field] && (Array.isArray(formData[field]) ? formData[field].length > 0 : formData[field].trim() !== '')
    );
  
    if (!isSectionCompleted) {
      setFormError('Please complete all required fields in the current section before proceeding.');
      toast({
        title: 'Error',
        description: 'Please complete all required fields in the current section before proceeding.',
        status: 'error',
        duration: 1000,
        isClosable: true,
      });
      return;
    }
  
    setCompletedSections({
      ...completedSections,
      [activeStep]: true,
    });
  
    setFormError('');
  
    if (activeStep === sections.length - 1) {
      setCompletedSections({
        ...completedSections,
        [activeStep]: true,
      });
      toast({
        title: 'Success',
        description: 'Job posting created successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } else {
      handleNextStep();
    }
  };
  console.log(formData)  

  return (
    <Container maxW="container.md" p={4}>
      <Flex justifyContent="flex-end">
        <Tooltip
          label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
          aria-label="A tooltip"
          openDelay={500}
          closeDelay={200}
        >
          <Button
            onClick={toggleColorMode}
            mr={2}
            color={colors.buttonColor}
            backgroundColor={colors.buttonBgColor}
            _hover={{ bg: colors.buttonHoverColor }}
            size={["sm", "md", "lg"]}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Tooltip>
      </Flex>
      <Heading as="h1" mb={6}>
        Create Job Posting
      </Heading>
      <HStack align="start" spacing={4}>
        {/* Stepper for navigation */}
        <Box
          as="nav"
          display={{ base: "none", md: "block" }}
          width="200px"
          position="sticky"
          top="20px"
        >
          <Stepper
            index={activeStep}
            orientation="vertical"
            height="400px"
            gap="0"
          >
            {sections.map((section, index) => (
              <Step key={section.id}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box flexShrink="0">
                  <StepTitle>{section.label}</StepTitle>
                  <Badge
                    ml="2"
                    colorScheme={completedSections[index] ? "green" : "red"}
                  >
                    {completedSections[index] ? "Completed" : "Incomplete"}
                  </Badge>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Drawer for mobile */}
        <Box
          display={{ base: "block", md: "none" }}
          position="sticky"
          top="20px"
        >
          <IconButton
            ref={btnRef}
            icon={<HamburgerIcon />}
            onClick={onOpen}
            aria-label="Open menu"
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>
              <DrawerBody>
                <List spacing={3}>
                  {sections.map((section, index) => (
                    <ListItem key={section.id}>
                      <Button
                        variant="link"
                        onClick={() => setActiveStep(index)}
                        textDecoration={
                          activeStep === index ? "line-through" : "none"
                        }
                        fontWeight={activeStep === index ? "bold" : "normal"}
                      >
                        {section.label}
                        <Badge
                          ml="2"
                          colorScheme={
                            completedSections[index] ? "green" : "red"
                          }
                        >
                          {completedSections[index]
                            ? "Completed"
                            : "Incomplete"}
                        </Badge>
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>

        {/* Main form */}
        <VStack spacing={4} align="stretch" flex="1">
          {formError && (
            <Alert
              status="error"
              bg={colors.alertBgColor}
              color={colors.alertTextColor}
            >
              <AlertIcon />
              {formError}
            </Alert>
          )}
          {activeStep === 0 && (
            <Box key={sections[activeStep].id} display="block" py={3}>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Job Title:</FormLabel>
                <Input
                  id="job-position-title"
                  placeholder="Enter job position title"
                  height="50px"
                  value={formData["job-position-title"]}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Company:</FormLabel>
                <Input
                  id="company"
                  placeholder="Enter company name"
                  height="50px"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </FormControl>
              <HStack spacing={4} pb={4}>
                <FormControl isRequired>
                  <FormLabel fontWeight="bold">State:</FormLabel>
                  <Input
                    id="state"
                    placeholder="Enter state"
                    height="50px"
                    value={formData.state}
                    onChange={handleInputChange}
                  />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel fontWeight="bold">City:</FormLabel>
                  <Input
                    id="city"
                    placeholder="Enter city"
                    height="50px"
                    value={formData.city}
                    onChange={handleInputChange}
                  />
                </FormControl>
              </HStack>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Zipcode:</FormLabel>
                <Input
                  id="zipcode"
                  placeholder="Enter zipcode"
                  height="50px"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Experience Level:</FormLabel>
                <Select
                  id="experience-level"
                  placeholder="Select experience level"
                  height="50px"
                  value={formData["experience-level"]}
                  onChange={handleInputChange}
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </Select>
              </FormControl>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Job Type:</FormLabel>
                <Select
                  id="job-type"
                  placeholder="Select job type"
                  height="50px"
                  value={formData["job-type"]}
                  onChange={handleInputChange}
                >
                  <option value="Part-time">Part-time</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Volunteer">Internship</option>
                </Select>
              </FormControl>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Work Location:</FormLabel>
                <Select
                  id="work-location"
                  placeholder="Select work location"
                  height="50px"
                  value={formData["work-location"]}
                  onChange={handleInputChange}
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </Select>
              </FormControl>
            </Box>
          )}

          {activeStep === 1 && (
            <Box key={sections[activeStep].id} display="block" py={3}>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Company Size:</FormLabel>
                <Select
                  id="company-size"
                  placeholder="Select company size"
                  height="50px"
                  value={formData["company-size"]}
                  onChange={handleInputChange}
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-200 employees">51-200 employees</option>
                </Select>
              </FormControl>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Salary Range:</FormLabel>
                <HStack spacing={4}>
                  <Input
                    id="salary-min"
                    placeholder="Min"
                    height="50px"
                    value={formData["salary-min"]}
                    onChange={handleInputChange}
                  />
                  <Input
                    id="salary-max"
                    placeholder="Max"
                    height="50px"
                    value={formData["salary-max"]}
                    onChange={handleInputChange}
                  />
                </HStack>
              </FormControl>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Skills:</FormLabel>
                <Textarea
                  id="skills"
                  placeholder="List required skills"
                  value={formData.skills}
                  onChange={handleInputChange}
                />
              </FormControl>
              {/* <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Benefits:</FormLabel>
                <Textarea
                  id="benefits"
                  placeholder="List benefits"
                  value={formData.benefits}
                  onChange={handleInputChange}
                />
              </FormControl> */}
              {/* New benefits to turn into an array */}
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Benefits:</FormLabel>
                <Textarea
                  id="benefits"
                  placeholder="Enter benefits, separated by commas"
                  value={formData.benefits.join(", ")} // Join array elements into a string
                  onChange={handleBenefitsChange}
                />
              </FormControl>

              <FormControl pb={4}>
                <FormLabel fontWeight="bold">
                  Qualifications (Optional):
                </FormLabel>
                <Textarea
                  id="qualifications"
                  placeholder="List qualifications"
                  value={formData.qualifications}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>
          )}

          {activeStep === 2 && (
            <Box key={sections[activeStep].id} display="block" py={3}>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Job Description:</FormLabel>
                <Textarea
                  id="description"
                  placeholder="Enter job description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </FormControl>
              <FormControl pb={4}>
                <FormLabel fontWeight="bold">
                  Responsibilities (Optional):
                </FormLabel>
                <Textarea
                  id="responsibilities"
                  placeholder="List responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                />
              </FormControl>
            </Box>
          )}

          <HStack justify="space-between" pt={4}>
            <Button
              onClick={handlePrevStep}
              isDisabled={activeStep === 0}
              color={colors.buttonColor}
              backgroundColor={colors.buttonBgColor}
              _hover={{ bg: colors.buttonHoverColor }}
              size={["sm", "md", "lg"]}
            >
              Previous
            </Button>
            <Button
              onClick={handleCompleteSection}
              color={colors.buttonColor}
              backgroundColor={colors.buttonBgColor}
              _hover={{ bg: colors.buttonHoverColor }}
              size={["sm", "md", "lg"]}
            >
              {activeStep === sections.length - 1 ? "Submit" : "Next"}
            </Button>
          </HStack>
        </VStack>
      </HStack>
    </Container>
  );
};

export default JobPosting;
