import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import {
  ChakraProvider,
  Box,
  Flex,
  Text,
  Select,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  useColorMode,
  useColorModeValue,
  Tooltip,
  ColorModeScript,
  Link as ChakraLink,
  Image,
  useToast,
  extendTheme,
} from "@chakra-ui/react";

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
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleNext = () => {
    if (!selectedRole || !firstName || !lastName || !email || !password || !verifyPassword) {
      toast({
        title: "Error",
        description: "Please fill out all required fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setShowMainFields(false);
    setShowAdditionalFields(true);
  };

  const handleBack = () => {
    setShowMainFields(true);
    setShowAdditionalFields(false);
  };

  const handlePhoneNumberChange = (value) => {
    const numericValue = value.replace(/[^\d]/g, '');
    if (numericValue.length > 10) return;
    setPhoneNumber(numericValue);
  };

  const handleSubmit = () => {
    if (!firstName || !lastName || !email || !password || !verifyPassword) {
      toast({
        title: "Error",
        description: "Please fill out all fields.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (selectedRole === "employer" && (!businessName || !businessWebsite || !phoneNumber || !industry)) {
      toast({
        title: "Error",
        description: "Please fill out all additional fields for an employer.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (selectedRole === "job-seeker" && (!industry || !phoneNumber)) {
      toast({
        title: "Error",
        description: "Please fill out all additional fields for a job seeker.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    if (phoneNumber.length !== 10) {
      toast({
        title: "Error",
        description: "Phone number must be 10 characters long.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    console.log("Form submitted");
    navigate("/login");
  };

  const buttonColor = useColorModeValue("#000000", "#A96CDE");
  const iconColor = useColorModeValue("#FFFFFF", "#000000");
  const textColor = useColorModeValue("gray.800", "white");
  const logoSrc = colorMode === 'light' ? '/yapperjoblogo.png' : '/yapperjoblogo-dark.png';

  const toastTheme = extendTheme({
    components: {
      Toast: {
        baseStyle: (props) => ({
          container: {
            color: props.colorMode === "dark" ? "white" : "black",
            bg: props.colorMode === "dark" ? "gray.800" : "white",
          },
        }),
      },
    },
  });

  return (
    <ChakraProvider theme={toastTheme}>
      <ColorModeScript initialColorMode="dark" />
      <Box
        p={[4, 6]}
        maxWidth="100vw"
        minHeight="100vh"
        margin="auto"
        bgGradient={colorMode === "light" ? 'linear(to-l, #663399, #D5B4F2)' : '#0B1215'}
        color={colorMode === "light" ? "#000000" : "#F3F3F3"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Flex direction="column" alignItems="center" width="100%">
          <Box
            bg={colorMode === "light" ? "#FFFFFF" : "#0B1215"}
            p={[4, 6, 8]}
            borderRadius="md"
            width={["90%", "80%", "70%", "60%"]}
            maxWidth="800px"
          >
            <Flex justifyContent="flex-end">
              <Tooltip label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`} aria-label="A tooltip" openDelay={500} closeDelay={200}>
                <Button
                  onClick={toggleColorMode}
                  mr={2}
                  color={iconColor}
                  backgroundColor={buttonColor}
                  _hover={{ color: iconColor, backgroundColor: buttonColor }}
                  size="sm"
                >
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
              </Tooltip>
            </Flex>
            {showMainFields && (
              <>
                <Flex mb={4} alignItems="center" justifyContent="center">
                  <Image src={logoSrc} alt="Yapper Jobs Logo" height="35px" />
                </Flex>
                <Flex alignItems="center" justifyContent="center">
                  <Text mb={4} fontSize="lg" color={textColor}>Sign Up</Text>
                </Flex>
                <Text fontWeight="bold" color={textColor}>User Type:</Text>
                <Tooltip label="Select which type of user you are" openDelay={500} closeDelay={200}>
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
                </Tooltip>
                <Flex mb={4} justifyContent="space-between">
                  <Box flex={1} mr={2} position="relative">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">First Name:</Text>
                    <Input
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      isRequired
                      _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                    />
                    <Text ml={1} color="red" position="absolute" top="30px" right="-8px" transform="translateY(-50%)">*</Text>
                  </Box>
                  <Box flex={1} ml={2} position="relative">
                    <Text fontSize="sm" color={textColor} fontWeight="bold">Last Name:</Text>
                    <Input
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      isRequired
                      _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                    />
                    <Text ml={1} color="red" position="absolute" top="30px" right="-8px" transform="translateY(-50%)">*</Text>
                  </Box>
                </Flex>
                <Text fontSize="sm" color={textColor} fontWeight="bold">Email Address:</Text>
                <Box display="flex" alignItems="center" position="relative">
                  <Input
                    placeholder="Email Address" mt={2}
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    isRequired
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  />
                  <Text ml={1} color="red" position="absolute" top="20px" right="-8px" transform="translateY(-50%)">*</Text>
                </Box>
                <Text mt={4} fontSize="sm" color={textColor} fontWeight="bold">Password:</Text>
                <Box flex={1} mt={2} position="relative">
                  <InputGroup>
                    <Input
                      placeholder="Password"
                      value={password}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                      isRequired
                    />
                    <InputRightElement>
                      <Button
                        id="check"
                        onClick={() => setShowPassword((prev) => !prev)}
                        cursor="pointer"
                        size="sm"
                        color={iconColor}
                        backgroundColor={buttonColor}
                        _hover={{ color: iconColor, backgroundColor: buttonColor }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text ml={1} color="red" position="absolute" top="9px" right="-8px" transform="translateY(-50%)">*</Text>
                </Box>
                <Text mt={4} fontSize="sm" color={textColor} fontWeight="bold">Verify Password:</Text>
                <Box flex={1} mt={2} position="relative">
                  <InputGroup>
                    <Input
                      placeholder="Verify Password"
                      value={verifyPassword}
                      type={showPassword ? "text" : "password"}
                      onChange={(e) => setVerifyPassword(e.target.value)}
                      _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                      isRequired
                    />
                    <InputRightElement>
                      <Button
                        onClick={() => setShowPassword((prev) => !prev)}
                        cursor="pointer"
                        size="sm"
                        color={iconColor}
                        backgroundColor={buttonColor}
                        _hover={{ color: iconColor, backgroundColor: buttonColor }}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <Text ml={1} color="red" position="absolute" top="9px" right="-8px" transform="translateY(-50%)">*</Text>
                </Box>
                <Box mt={4} mb={4} textAlign="center">
                  <Button onClick={handleNext} color="#F3F3F3" bg="#A96CDE" _hover={{ bg: "#663399" }} width={["80%", "60%", "50%", "40%"]}>
                    Next
                  </Button>
                </Box>
                <Flex alignItems="center" justifyContent="center" mt={4}>
                  <Text mr={1} color={textColor}>Already have an account?</Text>
                  <ChakraLink as={RouterLink} to="/login" color={buttonColor}>Login</ChakraLink>
                </Flex>
              </>
            )}
            {showAdditionalFields && (
              <Box>
                <Flex mb={4} alignItems="center" justifyContent="center">
                  <Image src={logoSrc} alt="Yapper Jobs Logo" height="35px" />
                </Flex>
                <Flex mb={2} alignItems="center" justifyContent="center">
                  <Text fontSize="lg" fontWeight="bold" color={textColor}>Additional Information</Text>
                </Flex>
                <Text fontSize="sm" mt={4} fontWeight="bold" color={textColor}>Industry:</Text>
                <Box display="flex" alignItems="center" position="relative">
                  <Select
                    placeholder="Select Industry" mt={2}
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    isRequired
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  >
                    <option value="Technology">Technology</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Education">Education</option>
                    <option value="Other">Other</option>
                  </Select>
                  <Text ml={1} color="red" position="absolute" top="20px" right="-8px" transform="translateY(-50%)">*</Text>
                </Box>
                <Text fontSize="sm" mt={4} fontWeight="bold" color={textColor}>Phone Number:</Text>
                <Tooltip label="Enter a 10-digit Phone Number" openDelay={500} closeDelay={200}>
                <Box display="flex" alignItems="center" position="relative">
                  <Input
                    placeholder="Phone Number" mt={2}
                    value={phoneNumber}
                    onChange={(e) => handlePhoneNumberChange(e.target.value)}
                    isRequired
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  />
                  <Text ml={1} color="red" position="absolute" top="20px" right="-8px" transform="translateY(-50%)">*</Text>
                </Box>
                </Tooltip>
                {selectedRole === "employer" && (
                  <>
                    <Text fontSize="sm" mt={4} fontWeight="bold" color={textColor}>Business Name:</Text>
                    <Box display="flex" alignItems="center" position="relative">
                      <Input
                        placeholder="Business Name" mt={2}
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        isRequired
                        _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                      />
                      <Text ml={1} color="red" position="absolute" top="20px" right="-8px" transform="translateY(-50%)">*</Text>
                    </Box>
                    <Text fontSize="sm" mt={4} fontWeight="bold" color={textColor}>Business Website:</Text>
                    <Box display="flex" alignItems="center" position="relative">
                      <Input
                        placeholder="Business Website" mt={2}
                        value={businessWebsite}
                        onChange={(e) => setBusinessWebsite(e.target.value)}
                        isRequired
                        _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                      />
                      <Text ml={1} color="red" position="absolute" top="20px" right="-8px" transform="translateY(-50%)">*</Text>
                    </Box>
                  </>
                )}
                <Flex justifyContent="space-between" mt={4}>
                  <Button onClick={handleBack} color="#F3F3F3" bg="#A96CDE" _hover={{ bg: "#663399" }} width={["60%", "40%"]}>
                    Back
                  </Button>
                  <Button onClick={handleSubmit} color="#F3F3F3" bg="#A96CDE" _hover={{ bg: "#663399" }} width={["60%", "40%"]}>
                    Submit
                  </Button>
                </Flex>
              </Box>
            )}
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default Register;