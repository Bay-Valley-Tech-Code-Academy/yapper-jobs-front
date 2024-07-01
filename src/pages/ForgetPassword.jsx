import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomColorMode from "/util/toggleColorMode";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    //checks if email has been filled out
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
  
    try {
      const { token } = await apiService.forgetPassword(email);

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
            width="30vw"
            minHeight="65vh"
          >
            <Flex justifyContent="flex-end">
            <Tooltip label={`Switch to ${colors.iconSupport} mode`} aria-label="A tooltip" openDelay={500} closeDelay={200}>
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
            <Heading pt={10} ml={4} textAlign="center">
              Forget Password?
            </Heading>
            <Heading pt={10} ml={4} size="md" textAlign="center">
              Type in your email below and we&apos;ll send you a reset password
            </Heading>
            <Box flex={1} m={4} pt={10} position="relative">
              <Input
                placeholder="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                _hover={{ bg: colors.bgHover }}
                minWidth="20vw"
                height="3rem"
              />
              <Button
                mt={10}
                minWidth="24.2vw"
                onClick={handleSubmit}
                backgroundColor={colors.buttonBgColor}
                color={colors.buttonColor}
                height="3rem"
              >
                Send Email
              </Button>
            </Box>
            <Text mt={10} display="flex" justifyContent="center">
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