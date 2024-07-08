// import React, { useRef, useState } from "react";
// import {
//   Box,
//   Heading,
//   FormControl,
//   FormLabel,
//   Input,
//   Select,
//   Textarea,
//   HStack,
//   VStack,
//   Container,
//   Drawer,
//   DrawerBody,
//   DrawerHeader,
//   DrawerOverlay,
//   DrawerContent,
//   DrawerCloseButton,
//   Button,
//   useDisclosure,
//   IconButton,
//   List,
//   ListItem,
//   Stepper,
//   Step,
//   StepIndicator,
//   StepStatus,
//   StepTitle,
//   StepSeparator,
//   StepIcon,
//   StepNumber,
//   Badge,
//   Alert,
//   AlertIcon,
//   useToast,
// } from "@chakra-ui/react";
// import { HamburgerIcon } from "@chakra-ui/icons";
// import customColorMode from "../../util/toggleColorMode";

// const sections = [
//   {
//     id: "basic-information",
//     label: "Basic Information",
//     fields: [
//       "title",
//       "company",
//       "state",
//       "city",
//       "zipcode",
//       "experienceLevel",
//       "employmentType",
//       "isRemote",
//     ],
//   },
//   {
//     id: "additional-details",
//     label: "Additional Details",
//     fields: ["companySize", "salaryLow", "salaryHigh", "benefits", "skills"],
//     optionalFields: ["certifications"],
//   },
//   {
//     id: "description",
//     label: "Description",
//     fields: ["jobDescription"],
//     optionalFields: ["responsibilities"],
//   },
// ];

// const JobPosting = () => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const btnRef = useRef();
//   const [completedSections, setCompletedSections] = useState({});
//   const { colorMode, toggleColorMode, colors } = customColorMode();
//   const toast = useToast();

//   const [activeStep, setActiveStep] = useState(0);
//   const [formData, setFormData] = useState({
//     title: "",
//     company: "",
//     state: "",
//     city: "",
//     zipcode: "",
//     "experienceLevel": "",
//     "employmentType": "",
//     isRemote: null,
//     "salaryLow": "",
//     "salaryHigh": "",
//     "companySize": "",
//     benefits: [],
//     skills: "",
//     certifications: "",
//     responsibilities: "",
//     jobDescription: "",
//   });
//   const [formError, setFormError] = useState("");

//   const handleInputChange = (e) => {
//     const { id, value } = e.target;

//     // Capitalize the first letter of the company name
//     if (id === "company") {
//       const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
//       setFormData({
//         ...formData,
//         [id]: capitalizedValue,
//       });

//       return;
//     }

//     // Validation for zipcode
//     if (id === "zipcode") {
//       if (!/^\d*$/.test(value)) {
//         setFormError("Zipcode cannot contain letters");
//         return;
//       }
//       if (value.length > 5) {
//         setFormError("Zipcode cannot be longer than 5 digits");
//         return;
//       }
//     }

//     // Handle the isRemote property
//     if (id === "work-location") {
//       setFormData({
//         ...formData,
//         isRemote: value === "Remote",
//       });
//       return;
//     }

//     setFormData({
//       ...formData,
//       [id]: value,
//     });
//     setFormError(""); // Clear error message on input change
//   };

//   const handleNextStep = () => {
//     if (activeStep < sections.length - 1) {
//       setActiveStep(activeStep + 1);
//     }
//   };

//   const handlePrevStep = () => {
//     const currentSection = sections[activeStep];
//     const isSectionCompleted = currentSection.fields.every(
//       (field) => formData[field] && formData[field].trim() !== ""
//     );

//     if (!isSectionCompleted) {
//       setCompletedSections({
//         ...completedSections,
//         [activeStep]: false,
//       });
//     }

//     if (activeStep > 0) {
//       setActiveStep(activeStep - 1);
//     }
//   };

//   // Handle benefits input separately to split comma-separated values
//   const handleBenefitsChange = (e) => {
//     const { value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       benefits: value.split(",").map((benefit) => benefit.trim()), // Split comma-separated values and trim whitespace
//     }));
//   };

//    // Handle certifications input separately to split comma-separated values
//    const handleCertificationsChange = (e) => {
//     const { value } = e.target;
//     setFormData((prevState) => ({
//       ...prevState,
//       certifications: value.split(",").map((certification) => certification.trim()), // Split comma-separated values and trim whitespace
//     }));
//   };

//   const handleCompleteSection = () => {
//     const currentSection = sections[activeStep];
//     const requiredFields = currentSection.fields.filter(
//       (field) =>
//         !currentSection.optionalFields || !currentSection.optionalFields.includes(field)
//     );
  
//     const isSectionCompleted = requiredFields.every((field) => {
//       const value = formData[field];
//       return value !== undefined && value !== null && value !== "" && (Array.isArray(value) ? value.length > 0 : true);
//     });

//     console.log(formData);
  
//     if (!isSectionCompleted) {
//       setFormError("Please complete all required fields in the current section before proceeding.");
//       toast({
//         title: "Error",
//         description: "Please complete all required fields in the current section before proceeding.",
//         status: "error",
//         duration: 1000,
//         isClosable: true,
//       });
//       return;
//     }
  
//     setCompletedSections({
//       ...completedSections,
//       [activeStep]: true,
//     });
  
//     setFormError(""); // Clear error message on section complete
  
//     if (activeStep === sections.length - 1) {
//       // Mark the last step as completed
//       toast({
//         title: "Success",
//         description: "Job posting created successfully!",
//         status: "success",
//         duration: 5000,
//         isClosable: true,
//       });
//     } else {
//       handleNextStep();
//     }
//   };
  
//   return (
//     <Container maxW="container.md" p={4}>
//       <Heading as="h1" mb={6}>
//         Create Job Posting
//       </Heading>
//       <HStack align="start" spacing={4}>
//         {/* Stepper for navigation */}
//         <Box
//           as="nav"
//           display={{ base: "none", md: "block" }}
//           width="200px"
//           position="sticky"
//           top="20px"
//         >
//           <Stepper
//             index={activeStep}
//             orientation="vertical"
//             height="400px"
//             gap="0"
//           >
//             {sections.map((section, index) => (
//               <Step key={section.id}>
//                 <StepIndicator>
//                   <StepStatus
//                     complete={<StepIcon />}
//                     incomplete={<StepNumber />}
//                     active={<StepNumber />}
//                   />
//                 </StepIndicator>
//                 <Box flexShrink="0">
//                   <StepTitle>{section.label}</StepTitle>
//                   <Badge
//                     ml="2"
//                     colorScheme={completedSections[index] ? "green" : "red"}
//                   >
//                     {completedSections[index] ? "Completed" : "Incomplete"}
//                   </Badge>
//                 </Box>
//                 <StepSeparator />
//               </Step>
//             ))}
//           </Stepper>
//         </Box>

//         {/* Drawer for mobile */}
//         <Box
//           display={{ base: "block", md: "none" }}
//           position="sticky"
//           top="20px"
//         >
//           <IconButton
//             ref={btnRef}
//             icon={<HamburgerIcon />}
//             onClick={onOpen}
//             aria-label="Open menu"
//           />
//           <Drawer
//             isOpen={isOpen}
//             placement="left"
//             onClose={onClose}
//             finalFocusRef={btnRef}
//           >
//             <DrawerOverlay />
//             <DrawerContent>
//               <DrawerCloseButton />
//               <DrawerHeader>Menu</DrawerHeader>
//               <DrawerBody>
//                 <List spacing={3}>
//                   {sections.map((section, index) => (
//                     <ListItem key={section.id}>
//                       <Button
//                         variant="link"
//                         onClick={() => setActiveStep(index)}
//                         textDecoration={
//                           activeStep === index ? "line-through" : "none"
//                         }
//                         fontWeight={activeStep === index ? "bold" : "normal"}
//                       >
//                         {section.label}
//                         <Badge
//                           ml="2"
//                           colorScheme={
//                             completedSections[index] ? "green" : "red"
//                           }
//                         >
//                           {completedSections[index]
//                             ? "Completed"
//                             : "Incomplete"}
//                         </Badge>
//                       </Button>
//                     </ListItem>
//                   ))}
//                 </List>
//               </DrawerBody>
//             </DrawerContent>
//           </Drawer>
//         </Box>

//         {/* Main form */}
//         <VStack spacing={4} align="stretch" flex="1">
//           {formError && (
//             <Alert
//               status="error"
//               bg={colors.alertBgColor}
//               color={colors.alertTextColor}
//             >
//               <AlertIcon />
//               {formError}
//             </Alert>
//           )}
//           {activeStep === 0 && (
//             <Box key={sections[activeStep].id} display="block" py={3}>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Job Title:</FormLabel>
//                 <Input
//                   id="title"
//                   placeholder="Enter job position title"
//                   height="50px"
//                   value={formData["title"]}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Company:</FormLabel>
//                 <Input
//                   id="company"
//                   placeholder="Enter company name"
//                   height="50px"
//                   value={formData.company}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//               <HStack spacing={4} pb={4}>
//                 <FormControl isRequired>
//                   <FormLabel fontWeight="bold">State:</FormLabel>
//                   <Input
//                     id="state"
//                     placeholder="Enter state"
//                     height="50px"
//                     value={formData.state}
//                     onChange={handleInputChange}
//                   />
//                 </FormControl>
//                 <FormControl isRequired>
//                   <FormLabel fontWeight="bold">City:</FormLabel>
//                   <Input
//                     id="city"
//                     placeholder="Enter city"
//                     height="50px"
//                     value={formData.city}
//                     onChange={handleInputChange}
//                   />
//                 </FormControl>
//               </HStack>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Zipcode:</FormLabel>
//                 <Input
//                   id="zipcode"
//                   placeholder="Enter zipcode"
//                   height="50px"
//                   value={formData.zipcode}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Experience Level:</FormLabel>
//                 <Select
//                   id="experienceLevel"
//                   placeholder="Select experience level"
//                   height="50px"
//                   value={formData["experienceLevel"]}
//                   onChange={handleInputChange}
//                 >
//                   <option value="Entry Level">Entry Level</option>
//                   <option value="Mid Level">Mid Level</option>
//                   <option value="Senior Level">Senior Level</option>
//                 </Select>
//               </FormControl>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Employment Type:</FormLabel>
//                 <Select
//                   id="employmentType"
//                   placeholder="Select employment type"
//                   height="50px"
//                   value={formData["employmentType"]}
//                   onChange={handleInputChange}
//                 >
//                   <option value="Part-time">Part-time</option>
//                   <option value="Full-time">Full-time</option>
//                   <option value="Contract">Contract</option>
//                   <option value="Volunteer">Internship</option>
//                 </Select>
//               </FormControl>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Is Remote</FormLabel>
//                 <Select
//                   id="work-location"
//                   placeholder="Is this position remote?"
//                   height="50px"
//                   value={formData["wisRemote"]}
//                   onChange={handleInputChange}
//                 >
//                   <option value="Remote">Yes</option>
//                   <option value="On-site">No</option>
//                 </Select>
//               </FormControl>
//             </Box>
//           )}

//           {activeStep === 1 && (
//             <Box key={sections[activeStep].id} display="block" py={3}>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Company Size:</FormLabel>
//                 <Select
//                   id="companySize"
//                   placeholder="Select company size"
//                   height="50px"
//                   value={formData["companySize"]}
//                   onChange={handleInputChange}
//                 >
//                   <option value="1-10 employees">1-10 employees</option>
//                   <option value="11-50 employees">11-50 employees</option>
//                   <option value="51-200 employees">51-200 employees</option>
//                 </Select>
//               </FormControl>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Salary Range:</FormLabel>
//                 <HStack spacing={4}>
//                   <Input
//                     id="salaryLow"
//                     placeholder="Min"
//                     height="50px"
//                     value={formData["salaryLow"]}
//                     onChange={handleInputChange}
//                   />
//                   <Input
//                     id="salaryHigh"
//                     placeholder="Max"
//                     height="50px"
//                     value={formData["salaryHigh"]}
//                     onChange={handleInputChange}
//                   />
//                 </HStack>
//               </FormControl>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Skills:</FormLabel>
//                 <Textarea
//                   id="skills"
//                   placeholder="List required skills"
//                   value={formData.skills}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//               {/* <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Benefits:</FormLabel>
//                 <Textarea
//                   id="benefits"
//                   placeholder="List benefits"
//                   value={formData.benefits}
//                   onChange={handleInputChange}
//                 />
//               </FormControl> */}
//               {/* New benefits to turn into an array */}
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Benefits:</FormLabel>
//                 <Textarea
//                   id="benefits"
//                   placeholder="Enter benefits, separated by commas"
//                   value={formData.benefits.join(", ")} // Join array elements into a string
//                   onChange={handleBenefitsChange}
//                 />
//               </FormControl>

//               <FormControl pb={4}>
//                 <FormLabel fontWeight="bold">
//                   Certifications (Optional):
//                 </FormLabel>
//                 <Textarea
//                   id="certifications"
//                   placeholder="List certifications"
//                   value={formData.certifications}
//                   onChange={handleCertificationsChange}
//                 />
//               </FormControl>
//             </Box>
//           )}

//           {activeStep === 2 && (
//             <Box key={sections[activeStep].id} display="block" py={3}>
//               <FormControl isRequired pb={4}>
//                 <FormLabel fontWeight="bold">Job Description:</FormLabel>
//                 <Textarea
//                   id="jobDescription"
//                   placeholder="Enter job description"
//                   value={formData.jobDescription}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//               <FormControl pb={4}>
//                 <FormLabel fontWeight="bold">
//                   Responsibilities (Optional):
//                 </FormLabel>
//                 <Textarea
//                   id="responsibilities"
//                   placeholder="List responsibilities"
//                   value={formData.responsibilities}
//                   onChange={handleInputChange}
//                 />
//               </FormControl>
//             </Box>
//           )}

//           <HStack justify="space-between" pt={4}>
//             <Button
//               onClick={handlePrevStep}
//               isDisabled={activeStep === 0}
//               color={colors.buttonColor}
//               backgroundColor={colors.buttonBgColor}
//               _hover={{ bg: colors.buttonHoverColor }}
//               size={["sm", "md", "lg"]}
//             >
//               Previous
//             </Button>
//             <Button
//               onClick={handleCompleteSection}
//               color={colors.buttonColor}
//               backgroundColor={colors.buttonBgColor}
//               _hover={{ bg: colors.buttonHoverColor }}
//               size={["sm", "md", "lg"]}
//             >
//               {activeStep === sections.length - 1 ? "Submit" : "Next"}
//             </Button>
//           </HStack>
//         </VStack>
//       </HStack>
//     </Container>
//   );
// };

// export default JobPosting;

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
import { HamburgerIcon } from "@chakra-ui/icons";
import customColorMode from "../../util/toggleColorMode";

const sections = [
  {
    id: "basic-information",
    label: "Basic Information",
    fields: [
      "title",
      // "company",
      "state",
      "city",
      // "zipcode",
      "experienceLevel",
      "employmentType",
      "isRemote",
    ],
  },
  {
    id: "additional-details",
    label: "Additional Details",
    fields: ["companySize", "salaryLow", "salaryHigh", "benefits"
      // , "skills"
    ],
    optionalFields: ["certifications"],
  },
  {
    id: "description",
    label: "Description",
    fields: ["jobDescription"],
    // optionalFields: ["responsibilities"],
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
    title: "",
    // company: "",
    state: "",
    city: "",
    // zipcode: "",
    "experienceLevel": "",
    "employmentType": "",
    isRemote: null,
    "salaryLow": "",
    "salaryHigh": "",
    "companySize": "",
    benefits: [],
    // skills: "",
    certifications: "",
    // responsibilities: "",
    jobDescription: "",
    questions: null,
  });
  const [formError, setFormError] = useState("");

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    // // Capitalize the first letter of the company name
    // if (id === "company") {
    //   const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    //   setFormData({
    //     ...formData,
    //     [id]: capitalizedValue,
    //   });

    //   return;
    // }

    // Validation for zipcode
    // if (id === "zipcode") {
    //   if (!/^\d*$/.test(value)) {
    //     setFormError("Zipcode cannot contain letters");
    //     return;
    //   }
    //   if (value.length > 5) {
    //     setFormError("Zipcode cannot be longer than 5 digits");
    //     return;
    //   }
    // }

    // Handle the isRemote property
    if (id === "work-location") {
      setFormData({
        ...formData,
        isRemote: value === "Remote",
      });
      return;
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

   // Handle certifications input separately to split comma-separated values
   const handleCertificationsChange = (e) => {
    const { value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      certifications: value.split(",").map((certification) => certification.trim()), // Split comma-separated values and trim whitespace
    }));
  };

  const handleSubmit = async () => {
    // Calculate expiry date 1 month from today
    const today = new Date();
    const expiryDate = new Date(today.setMonth(today.getMonth() + 1));
  
    // Format expiry date as YYYY-MM-DD
    const formattedExpiryDate = `${expiryDate.getFullYear()}-${(expiryDate.getMonth() + 1).toString().padStart(2, '0')}-${expiryDate.getDate().toString().padStart(2, '0')}`;
    // Prepare formData with the calculated expiry date
    const formDataWithExpiry = {
      ...formData,
      expDate: formattedExpiryDate,
    };

    console.log(formDataWithExpiry)
  
    try {
      const jwt = localStorage.getItem("jwt");

      const response = await fetch("/job/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(formDataWithExpiry),
      });
  
      if (!response.ok) {
        throw new Error("Failed to add job");
      }
  
      const data = await response.json();
      console.log("Job added successfully:", data);
      toast({
        title: "Success",
        description: "Job posting created successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding job:", error);
      toast({
        title: "Error",
        description: "Failed to create job posting",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  const handleCompleteSection = () => {
    const currentSection = sections[activeStep];
    const requiredFields = currentSection.fields.filter(
      (field) =>
        !currentSection.optionalFields ||
        !currentSection.optionalFields.includes(field)
    );

    const isSectionCompleted = requiredFields.every((field) => {
      const value = formData[field];
      return (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        (Array.isArray(value) ? value.length > 0 : true)
      );
    });

    if (!isSectionCompleted) {
      setFormError(
        "Please complete all required fields in the current section before proceeding."
      );
      toast({
        title: "Error",
        description:
          "Please complete all required fields in the current section before proceeding.",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
      return;
    }

    setCompletedSections({
      ...completedSections,
      [activeStep]: true,
    });

    setFormError(""); // Clear error message on section complete

    if (activeStep === sections.length - 1) {
      // Mark the last step as completed
      handleSubmit(); // Call handleSubmit to send data to backend
    } else {
      handleNextStep();
    }
  };
  
  return (
    <Container maxW="container.md" p={4}>
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
                  id="title"
                  placeholder="Enter job position title"
                  height="50px"
                  value={formData["title"]}
                  onChange={handleInputChange}
                />
              </FormControl>
              {/* <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Company:</FormLabel>
                <Input
                  id="company"
                  placeholder="Enter company name"
                  height="50px"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </FormControl> */}
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
              {/* <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Zipcode:</FormLabel>
                <Input
                  id="zipcode"
                  placeholder="Enter zipcode"
                  height="50px"
                  value={formData.zipcode}
                  onChange={handleInputChange}
                />
              </FormControl> */}
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Experience Level:</FormLabel>
                <Select
                  id="experienceLevel"
                  placeholder="Select experience level"
                  height="50px"
                  value={formData["experienceLevel"]}
                  onChange={handleInputChange}
                >
                  <option value="Entry Level">Entry Level</option>
                  <option value="Mid Level">Mid Level</option>
                  <option value="Senior Level">Senior Level</option>
                </Select>
              </FormControl>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Employment Type:</FormLabel>
                <Select
                  id="employmentType"
                  placeholder="Select employment type"
                  height="50px"
                  value={formData["employmentType"]}
                  onChange={handleInputChange}
                >
                  <option value="Part-time">Part-time</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Volunteer">Internship</option>
                </Select>
              </FormControl>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Is Remote</FormLabel>
                <Select
                  id="work-location"
                  placeholder="Is this position remote?"
                  height="50px"
                  value={formData["wisRemote"]}
                  onChange={handleInputChange}
                >
                  <option value="Remote">Yes</option>
                  <option value="On-site">No</option>
                </Select>
              </FormControl>
            </Box>
          )}

          {activeStep === 1 && (
            <Box key={sections[activeStep].id} display="block" py={3}>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Company Size:</FormLabel>
                <Select
                  id="companySize"
                  placeholder="Select company size"
                  height="50px"
                  value={formData["companySize"]}
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
                    id="salaryLow"
                    placeholder="Min"
                    height="50px"
                    value={formData["salaryLow"]}
                    onChange={handleInputChange}
                  />
                  <Input
                    id="salaryHigh"
                    placeholder="Max"
                    height="50px"
                    value={formData["salaryHigh"]}
                    onChange={handleInputChange}
                  />
                </HStack>
              </FormControl>
              {/* <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Skills:</FormLabel>
                <Textarea
                  id="skills"
                  placeholder="List required skills"
                  value={formData.skills}
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
                  Certifications (Optional):
                </FormLabel>
                <Textarea
                  id="certifications"
                  placeholder="List certifications"
                  value={formData.certifications}
                  onChange={handleCertificationsChange}
                />
              </FormControl>
            </Box>
          )}

          {activeStep === 2 && (
            <Box key={sections[activeStep].id} display="block" py={3}>
              <FormControl isRequired pb={4}>
                <FormLabel fontWeight="bold">Job Description:</FormLabel>
                <Textarea
                  id="jobDescription"
                  placeholder="Enter job description"
                  value={formData.jobDescription}
                  onChange={handleInputChange}
                />
              </FormControl>
              {/* <FormControl pb={4}>
                <FormLabel fontWeight="bold">
                  Responsibilities (Optional):
                </FormLabel>
                <Textarea
                  id="responsibilities"
                  placeholder="List responsibilities"
                  value={formData.responsibilities}
                  onChange={handleInputChange}
                />
              </FormControl> */}
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
