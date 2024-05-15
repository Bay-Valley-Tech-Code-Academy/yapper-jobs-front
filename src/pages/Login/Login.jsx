import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { 
  ChakraProvider, 
  Box, 
  Flex, 
  Heading, 
  Text, 
  Button, 
  Input, 
  useColorMode, 
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
  const { colorMode, toggleColorMode } = useColorMode();
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

    navigate("/search"); //comment out the rest of code if u wanna test the routing

    return data;
}

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode="dark" />
      <Box
        p={[2, 4, 6, 8]}
        maxWidth="100vw"
        minHeight="100vh"
        margin="auto"
        bgGradient={colorMode === "light" ? 'linear(to-l, #663399, #D5B4F2)' : '#0B1215'}
        color={colorMode === "light" ? "#000000" : "#F3F3F3"}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Flex direction="column" alignItems="center">
          {/* idk how to make login box responsive */}
          <Box 
            bg={colorMode === "light" ? "#FFFFFF" : "#0B1215"} 
            p={10} 
            borderRadius="md" 
            width="35vw" 
            minHeight="65vh"
          >
            <Flex justifyContent="flex-end">

              {/* change light/dark mode button layout to match w/ register */}
              <Button
                onClick={toggleColorMode}
                mr={2}
                color={colorMode === "light" ? "#FFFFFF" : "#000000"}
                backgroundColor={colorMode === "light" ? "#000000" : "#A96CDE"}
              >
                Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
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
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
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
                    isRequired
                    _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                    minWidth="30vw"
                    height="3rem"
                  />
                  {/* hide and show password :D */}
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
                backgroundColor={colorMode === "light" ? "#000000" : "#A96CDE"}
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
