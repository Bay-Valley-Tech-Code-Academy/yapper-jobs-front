import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import { ChakraProvider, Box, Flex, Heading, Text, Select, Button, Input, useColorMode, ColorModeScript, Link } from "@chakra-ui/react";

const Register = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showMainFields, setShowMainFields] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [industry, setIndustry] = useState("");
  const [phoneNumber, setPhoneNumberValue] = useState(""); // Renamed state variable
  const [businessName, setBusinessName] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleNext = () => {
    // Check if all required fields are filled
    if (!selectedRole || !firstName || !lastName || !email || !password || !verifyPassword) {
      console.error("Please fill out all required fields.");
      return;
    }
    
    // Switch state to additional fields
    setShowMainFields(false);
    setShowAdditionalFields(true);
  };

  const handleBack = () => {
    setShowMainFields(true);
    setShowAdditionalFields(false);
  };

  const handlePhoneNumberChange = (value) => { // Renamed function
    // Remove any non-numeric characters from the input value
    const numericValue = value.replace(/[^\d]/g, '');
    // If the numericValue is empty or exceeds 10 characters, do not update the state
    if (numericValue.length > 10) return;
    // Update the phone number state with the formatted numericValue
    setPhoneNumberValue(numericValue);
  };
  
  const handleSubmit = () => {
    // Check if first page fields are filled
    if (!firstName || !lastName || !email || !password || !verifyPassword) {
      console.error("Please fill out all required fields.");
      return;
    }
  
    // Check if additional required fields are filled in
    if (selectedRole === "employer" && (!businessName || !businessWebsite || !phoneNumber || !industry)) {
      console.error("Please fill out all required additional fields for employer.");
      return;
    }
    if (selectedRole === "job-seeker" && (!industry || !phoneNumber)) {
      console.error("Please fill out all required additional fields for job seeker.");
      return;
    }
  
    // Validate phone number length
    if (phoneNumber.length !== 10) {
      console.error("Phone number must be 10 characters long.");
      return;
    }
  
    // If all fields are correct proceed with submission
    console.log("Form submitted");
  };  

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };  

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      <Box
        p={[2, 4, 6, 8]}
        maxWidth="100vw"
        minHeight="100vh"
        margin="auto"
        // bg={colorMode === "light" ? "#663399" : "#0B1215"}
        bgGradient={colorMode === "light" ? 'linear(to-l, #663399, #D5B4F2)' : '#0B1215'}
        color={colorMode === "light" ? "#000000" : "#F3F3F3"}
      >
        <Flex direction="column" alignItems="center">
          <Box bg={colorMode === "light" ? "#FFFFFF" : "#0B1215"} p={4} borderRadius="md" width="50vw">
            <Flex justifyContent="flex-end">
              <Button
                onClick={toggleColorMode}
                mr={2}
                color={colorMode === "light" ? "#FFFFFF" : "#000000"}
                backgroundColor={colorMode === "light" ? "#000000" : "#A96CDE"}
              >
                Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
              </Button>
            </Flex>
            {showMainFields && (
              <>
                <Heading mb={4}>Sign Up 🗣️</Heading>
                <Text fontWeight="bold">User Type:</Text>
                <Select 
                  placeholder="Select option"
                  value={selectedRole}
                  onChange={handleRoleChange}
                  mt={2} mb={4}
                  _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                >
                  <option value="job-seeker">Job Seeker</option>
                  <option value="employer">Employer</option>
                </Select>

                <Box flex={1} mr={4} position="relative">
                  <Text fontSize="sm">First Name</Text>
                  <Input 
                    placeholder="First Name" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    isRequired 
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  />
                  <Text ml={1} color="red" position="absolute" bottom="10px" right="0">*</Text>
                </Box>
                <Box flex={1} position="relative">
                  <Text fontSize="sm">Last Name</Text>
                  <Input 
                    placeholder="Last Name" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    isRequired 
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  />
                  <Text ml={1} color="red" position="absolute" bottom="10px" right="0">*</Text>
                </Box>
                <Text fontSize="sm">Email Address</Text>
                <Box display="flex" alignItems="center">
                  <Input 
                    placeholder="Email Address" mt={2} 
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    isRequired 
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  />
                  <Text ml={1} color="red">*</Text>
                </Box>
                <Text fontSize="sm">Password</Text>
                <Box display="flex" alignItems="center">
                  <Input 
                    type="password" 
                    placeholder="Password" mt={2} 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    isRequired 
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  />
                  <Text ml={1} color="red">*</Text>
                </Box>
                <Text fontSize="sm">Verify Password</Text>
                <Box display="flex" alignItems="center">
                  <Input 
                    type="password" 
                    placeholder="Verify Password" mt={2} 
                    value={verifyPassword} 
                    onChange={(e) => setVerifyPassword(e.target.value)} 
                    isRequired 
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  />
                  <Text ml={1} color="red">*</Text>
                </Box>
                <Button
                  mt={4}
                  colorScheme="teal"
                  width="100%"
                  onClick={handleNext}
                  color={colorMode === "light" ? "#FFFFFF" : "#000000"}
                  backgroundColor={colorMode === "light" ? "#000000" : "#A96CDE"}
                >
                  Next
                </Button>
                <Text mt={2} textAlign="center">
                  Already have an account? <Link color="teal.500">Sign In</Link>
                </Text>
              </>
            )}
            {showAdditionalFields && (
              <>
                <Heading mb={4}>Additional Information</Heading>
                {selectedRole === "employer" ? (
                  <>
                    <Text mb={4}>We see you're an employer. Please fill out the additional information below about your business:</Text>
                    <Box flex={1} position="relative">
                      <Text fontSize="sm">Business Name</Text>
                      <Input
                        placeholder="Business Name"
                        mt={2}
                        value={businessName}
                        onChange={(e) => setBusinessName(capitalizeFirstLetter(e.target.value))}
                        isRequired
                        _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                      />
                      <Text ml={1} color="red" position="absolute" top="50%" right="0" transform="translateY(-50%)">*</Text>
                    </Box>
                    <Box flex={1} position="relative">
                      <Text fontSize="sm">Business Website</Text>
                      <Input
                        placeholder="Business Website"
                        mt={2}
                        value={businessWebsite}
                        onChange={(e) => setBusinessWebsite(e.target.value)}
                        isRequired
                        _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                      />
                      <Text ml={1} color="red" position="absolute" top="50%" right="0" transform="translateY(-50%)">*</Text>
                    </Box>
                    <Box flex={1} position="relative">
                      <Text fontSize="sm">Phone Number</Text>
                      <Input
                        placeholder="Phone Number"
                        mt={2}
                        value={phoneNumber}
                        onChange={(e) => handlePhoneNumberChange(e.target.value)} // Changed here
                        isRequired
                        _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                      />
                      <Text ml={1} color="red" position="absolute" top="50%" right="0" transform="translateY(-50%)">*</Text>
                    </Box>
                    <Box flex={1} position="relative">
                      <Text fontSize="sm">Industry</Text>
                      <Select
                        placeholder="Select Industry"
                        mt={2}
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        isRequired
                        _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                      >
                        <option value="Healthcare">Healthcare</option>
                        <option value="Information Technology">Information Technology</option>
                        <option value="Finance">Finance</option>
                        <option value="Retail">Retail</option>
                        <option value="Manufacturing">Manufacturing</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Education">Education</option>
                        <option value="Hospitality">Hospitality</option>
                        <option value="Construction">Construction</option>
                        <option value="Energy">Energy</option>
                        <option value="Agriculture">Agriculture</option>
                        <option value="Automotive">Automotive</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Transportation and Logistics">Transportation and Logistics</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Other">Other</option>
                      </Select>
                      <Text ml={1} color="red" position="absolute" top="50%" right="0" transform="translateY(-50%)">*</Text>
                    </Box>
                  </>
                ) : (
                  <>
                    <Text mb={4}>We see you're searching for a job! Please fill out the additional information below:</Text>
                    <Box flex={1} mr={4} position="relative">
                      <Text fontSize="sm">First Name</Text>
                      <Input 
                        placeholder="First Name" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        isRequired 
                        _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                      />
                      <Text ml={1} color="red" position="absolute" bottom="10px" right="0">*</Text>
                    </Box>
                  </>
                )}
                <Button
                  mt={4}
                  colorScheme="teal"
                  width="100%"
                  onClick={handleBack}
                  backgroundColor={colorMode === "light" ? "#000000" : "#A96CDE"}
                >
                  Back
                </Button>
                <Button
                  mt={2}
                  colorScheme="teal"
                  width="100%"
                  onClick={handleSubmit}
                  backgroundColor={colorMode === "light" ? "#000000" : "#A96CDE"}
                >
                  Register
                </Button>
                <Text mt={2} textAlign="center">
                  Already have an account? <Link color="teal.500" onClick={() => navigate("/")}>Sign In</Link>
                </Text>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Register;