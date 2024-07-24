import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomColorMode from "/util/toggleColorMode";
import useUserStore from '../store/user-store';
import {
  ChakraProvider,
  Box,
  ColorModeScript,
  Flex,
  Button,
  Heading,
  Input,
  Link,
  Text,
  useToast,
  Tooltip,
  Image
} from "@chakra-ui/react";

function ForgetPassword() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const { toggleColorMode, colors } = CustomColorMode();
  const { forgetPassword } = useUserStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emailRegex = new RegExp(`[^@]+@[^@]+[^@]+$`);

    // Checks if email has been filled out
    if (!email) {
      toast({
        title: "Error",
        description: "Please fill out email",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!emailRegex.test(email)) {
      toast({
        title: "Error",
        description: "Must be valid email format",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    try {
      const { token } = await forgetPassword(email);

      localStorage.setItem('token', token);
      
      toast({
        title: "Success",
        description: "Email sent",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Email not found",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <Box
        p={[2, 4, 6, 8]}
        maxWidth="100vw"
        minHeight="100vh"
        margin="auto"
        bgGradient={colors.bgGradient}
        color={colors.textColor}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Flex direction="column" alignItems="center">
          <Box
            bg={colors.boxColor}
            p={10}
            borderRadius="md"
            width={["90%", "80%", "90%"]}
            minWidth="300px"
            maxWidth="500px"
            minHeight="60vh"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Flex justifyContent="flex-end" width="100%">
              <Tooltip label={`Switch to ${colors.iconSupport} mode`} aria-label="Switch color theme button" openDelay={500} closeDelay={200}>
                <Button
                  onClick={toggleColorMode}
                  mr={2}
                  color={colors.buttonColor}
                  backgroundColor={colors.buttonBgColor}
                >
                  {colors.icon}
                </Button>
              </Tooltip>
            </Flex>
            <Flex mb={4} alignItems="center" justifyContent="center">
              <Image src={colors.logoSrc} alt="Yapper Jobs Logo" height="35px" />
            </Flex>
            <Heading pt={10} textAlign="center">
              Forgot Password?
            </Heading>
            <Heading pt={4} size="md" textAlign="center">
              Type in your email below and we&apos;ll send you a reset password link.
            </Heading>
            <Box mt={6} width="100%">
              <Input
                placeholder="Email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                _hover={{ bg: colors.bgHover }}
                width="100%"
                height="3rem"
              />
              <Button
                mt={6}
                width="100%"
                onClick={handleSubmit}
                backgroundColor={colors.buttonBgColor}
                color={colors.buttonColor}
                height="3rem"
              >
                Send Email
              </Button>
            </Box>
            <Text mt={6}>
              <Link color="teal.500" onClick={() => navigate("/")}>
                Go back to Login
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default ForgetPassword;
