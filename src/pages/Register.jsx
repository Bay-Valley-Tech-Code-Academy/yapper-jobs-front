import { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { apiService } from '../services/apiRequests';
import useUserStore from '../store/user-store';
import CustomColorMode from '/util/toggleColorMode';
import { usePasswordToggle } from '/util/passwordUtils';
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
  Tooltip,
  ColorModeScript,
  Link as ChakraLink,
  Image,
  useToast,
  extendTheme,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

const Register = () => {
  const { colorMode, toggleColorMode, colors } = CustomColorMode();
  const [selectedRole, setSelectedRole] = useState("");
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [showMainFields, setShowMainFields] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [industry, setIndustry] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [businessWebsite, setBusinessWebsite] = useState("");
  const { showPassword, togglePasswordVisibility } = usePasswordToggle();
  const { showPassword: showVerifiedPassword, togglePasswordVisibility: toggleVerifiedPasswordVisibility } = usePasswordToggle();
  const { register } = useUserStore();
  const toast = useToast();
  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const handleNext = () => {
    if (!selectedRole || !firstName || !lastName || !email || !pass || !verifyPassword) {
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

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      if (!firstName || !lastName || !email || !pass || !verifyPassword) {
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

      const payload = {
        firstName, 
        lastName,
        email, 
        pass,
        mobile: phoneNumber,
        company: selectedRole === "employer" ? businessName : undefined,
        website: selectedRole === "employer" ? businessWebsite : undefined,
        industry,
      };

      apiService.register(selectedRole, payload);

      console.log("Form submitted");
      navigate("/");
    } catch(err) {
      toast({
        title: "Error",
        description: err.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error('Error during registration:', err);
    }
  };

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
        bgGradient={colors.bgGradient}
        color={colors.textColor}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Flex direction="column" alignItems="center" width="100%">
          <Box
            bg={colors.boxColor}
            p={[4, 6, 8]}
            borderRadius="md"
            width={["90%", "80%", "70%", "60%"]}
            maxWidth="800px"
          >
            <Flex justifyContent="flex-end">
              <Tooltip label={`Switch to ${colors.iconSupport} mode`} aria-label="A tooltip" openDelay={500} closeDelay={200}>
                <Button
                  onClick={toggleColorMode}
                  mr={2}
                  color={colors.buttonColor}
                  backgroundColor={colors.buttonBgColor}
                  _hover={{ bg: colors.buttonHoverColor }}
                  size={["sm", "md", "lg"]}
                >
                  {colors.icon}
                </Button>
              </Tooltip>
            </Flex>
            {showMainFields && (
              <>
                <Flex mb={4} alignItems="center" justifyContent="center">
                  <Image src={colors.logoSrc} alt="Yapper Jobs Logo" height="35px" />
                </Flex>
                <Flex alignItems="center" justifyContent="center">
                  <Text mb={4} fontSize="lg" color={colors.textColor}>Sign Up</Text>
                </Flex>
                <FormControl mb={4} isRequired>
                  <FormLabel color={colors.textColor} fontWeight="bold">User Type</FormLabel>
                  <Tooltip label="Select if you're seeking a job or an employer" openDelay={900} closeDelay={100}>
                    <Select
                      placeholder="Select option"
                      value={selectedRole}
                      onChange={handleRoleChange}
                      _hover={{ bg: colors.bgHover }}
                    >
                      <option value="job-seeker">Job Seeker</option>
                      <option value="employer">Employer</option>
                    </Select>
                  </Tooltip>
                </FormControl>
                <Flex mb={4} justifyContent="space-between">
                  <FormControl isRequired>
                    <FormLabel color={colors.textColor} fontWeight="bold">First Name</FormLabel>
                    <Input
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      _hover={{ bg: colors.bgHover }}
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel color={colors.textColor} fontWeight="bold">Last Name</FormLabel>
                    <Input
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      _hover={{ bg: colors.bgHover }}
                  />
                </FormControl>
              </Flex>
              <FormControl mb={4} isRequired>
                <FormLabel color={colors.textColor} fontWeight="bold">Email</FormLabel>
                <Input
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  _hover={{ bg: colors.bgHover }}
                />
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel color={colors.textColor} fontWeight="bold">Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    type={showPassword ? "text" : "password"}
                    _hover={{ bg: colors.bgHover }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button 
                      id="check"
                      type="checkbox"
                      h="1.75rem" 
                      size="sm" 
                      onClick={togglePasswordVisibility}
                      _hover={{ bg: colors.buttonHoverColor }}
                      backgroundColor={colors.buttonBgColor}
                      color={colors.buttonColor}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel color={colors.textColor} fontWeight="bold">Verify Password</FormLabel>
                <InputGroup>
                  <Input
                    placeholder="Verify Password"
                    value={verifyPassword}
                    onChange={(e) => setVerifyPassword(e.target.value)}
                    type={showVerifiedPassword ? "text" : "password"}
                    _hover={{ bg: colors.bgHover }}
                  />
                  <InputRightElement width="4.5rem">
                    <Button 
                      h="1.75rem" 
                      size="sm" 
                      onClick={toggleVerifiedPasswordVisibility}
                      _hover={{ bg: colors.buttonHoverColor }}
                      backgroundColor={colors.buttonBgColor}
                      color={colors.buttonColor}
                    >
                      {showVerifiedPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Flex justifyContent="center">
                <Tooltip label="Continue to the next page" openDelay={500} closeDelay={200}>
                  <Button
                    onClick={handleNext}
                    color={colors.buttonColor}
                    backgroundColor={colors.buttonBgColor}
                    size={["sm", "md", "lg"]}
                    width={["200px", "300px"]}
                    _hover={{ bg: colors.buttonHoverColor }}
                  >
                    Next
                  </Button>
                </Tooltip>
              </Flex>
            </>
          )}
          {showAdditionalFields && (
            <>
              <Flex mb={4} alignItems="center" justifyContent="center">
                <Image src={colors.logoSrc} alt="Yapper Jobs Logo" height="35px" />
              </Flex>
              {selectedRole === "employer" && (
                <>
                  <Text fontWeight="bold" fontSize="lg" color={colors.textColor}>We see you&apos;re an employer,</Text>
                  <Text mb={4} color={colors.textColor}>Please fill out the additional information below to finish.</Text>
                  <FormControl mb={4} isRequired>
                    <FormLabel color={colors.textColor} fontWeight="bold">Business Name</FormLabel>
                    <Input
                      placeholder="Business Name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      _hover={{ bg: colors.bgHover }}
                      textTransform="capitalize"
                    />
                  </FormControl>
                  <FormControl mb={4} isRequired>
                    <FormLabel color={colors.textColor} fontWeight="bold">Business Website</FormLabel>
                    <Input
                      placeholder="Business Website"
                      value={businessWebsite}
                      onChange={(e) => setBusinessWebsite(e.target.value)}
                      _hover={{ bg: colors.bgHover }}
                    />
                  </FormControl>
                </>
              )}
              {selectedRole === "job-seeker" && (
                <>
                  <Text mb={4} fontWeight="bold" fontSize="lg" color={colors.textColor}>We see you&apos;re a job seeker,</Text>
                  <Text mb={4} color={colors.textColor}>Please fill out the additional information below to finish.</Text>
                </>
              )}
              <FormControl mb={4} isRequired>
                <FormLabel color={colors.textColor} fontWeight="bold">Industry</FormLabel>
                <Select
                  placeholder="Select Industry"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  _hover={{ bg: colors.bgHover }}
                >
                  <option value="Technology">Technology</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Finance">Finance</option>
                  <option value="Education">Education</option>
                  <option value="Other">Other</option>
                </Select>
              </FormControl>
              <FormControl mb={4} isRequired>
                <FormLabel color={colors.textColor} fontWeight="bold">Phone Number</FormLabel>
                <Input
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => handlePhoneNumberChange(e.target.value)}
                  _hover={{ bg: colors.bgHover }}
                />
              </FormControl>
              <Flex justifyContent="space-between">
                <Button
                  onClick={handleBack}
                  color={colors.buttonColor}
                  backgroundColor={colors.buttonBgColor}
                  _hover={{ bg: colors.buttonHoverColor }}
                  size={["sm", "md", "lg"]}
                  width={["200px", "300px"]}
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  color={colors.buttonColor}
                  backgroundColor={colors.buttonBgColor}
                  _hover={{ bg: colors.buttonHoverColor }}
                  size={["sm", "md", "lg"]}
                  width={["200px", "300px"]}
                >
                  Submit
                </Button>
              </Flex>
            </>
          )}
          <Flex justifyContent="center" mt={4}>
            <ChakraLink as={RouterLink} to="/" 
              color={colors.hyperlinkColor}
              textDecoration={colors.hyperlinkTextDecoration}
              >
            Already have an account? Login
            </ChakraLink>
          </Flex>
        </Box>
      </Flex>
    </Box>
  </ChakraProvider>
);
};

export default Register;