import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import customColorMode from '/util/toggleColorMode'
import { 
  ChakraProvider, 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  Input, 
  ColorModeScript, 
  Link, 
  InputGroup, 
  InputRightElement,
  FormControl 
} from "@chakra-ui/react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmployer, setIsEmployer] = useState(false);
  const { handleToggleColorMode, colors } = customColorMode();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
        alert("Please fill out login information");
        return;
    }

    const response = await fetch("", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok)
        throw new Error("Sign in request failed", response);

    const data = await response.json();
    console.log("User logged in successfully:", data);

    navigate("/search");

    if(data.role === "employer") {
      navigate("/employer-main");
      setIsEmployer(true);
    } else {
      navigate("/search");
      setIsEmployer(false);
    }

    return data;
}

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="light" />
      <Box
        p={[2, 4, 6, 8]}
        bgGradient={colors.bgGradient}
        color={colors.textColor}
        maxWidth="100vw"
        minHeight="100vh"
        margin="auto"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Flex direction="column" alignItems="center">
          <Box 
            bg={colors.boxColor} 
            p={10} 
            borderRadius="md" 
            width="35vw" 
            minHeight="65vh"
          >
            <Flex justifyContent="flex-end">
              <Button
                mr={2}
                onClick={handleToggleColorMode}
                color={colors.buttonColor}
                backgroundColor={colors.buttonBgColor}
              >
                Toggle {colors.text} Mode
              </Button>
            </Flex>
            <Heading mb={4} ml={4}>Welcome 🗣️</Heading>
            <Heading mb={4} ml={4}>Sign in to Yapper Jobs</Heading>
              <Box flex={1} m={4} mt={10} position="relative">
                <FormControl isRequired>
                  <Input
                    placeholder="email"
                    value={email}
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    _hover={{ bg: colors.bgHover }}
                    minWidth="30vw"
                    height="3rem"
                  />
                </FormControl>
              </Box>
              <Box flex={1} m={4} mt={5} position="relative">
                <InputGroup>
                  <Input
                    placeholder="password"
                    value={password}
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
                    _hover={{ bg: colors.bgHover }}
                    isRequired
                    minWidth="30vw"
                    height="3rem"
                  />
                  <InputRightElement flex={1} m={1} width="5rem">
                    <Button 
                      id="check"
                      type="checkbox"
                      value={showPassword}
                      onClick={() => setShowPassword((prev) => !prev)}
                      cursor="pointer"
                      size="md"
                      height="2rem"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button> 
                  </InputRightElement>
                </InputGroup>
              </Box>
              <Text mt={6} textAlign="center">
                <Link color="teal.500" onClick={() => navigate("/forget-password")}>Forgot Password?</Link>
              </Text>
              <Button
                ml={4}
                mt={8}
                colorScheme="teal"
                minWidth="30vw"
                onClick={handleSubmit}
                backgroundColor={colors.buttonBgColor}
                height="3rem"
              >
                Sign In
              </Button>
              <Text mt={8} textAlign="center">
                Don't have an account with us? 
                <Link 
                  color="teal.500" 
                  onClick={() => navigate("/register")}
                >
                 &nbsp;Sign Up
                </Link>
              </Text>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider> 
  )
}

export default Login
