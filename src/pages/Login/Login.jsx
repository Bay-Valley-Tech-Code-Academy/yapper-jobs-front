import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ChakraProvider, Box, Flex, Heading, Text, Button, Input, useColorMode, ColorModeScript, Link } from "@chakra-ui/react";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      navigate("/search");
    } catch(err) {
      console.log("Failed to sign in")
    }
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
      >
        <Flex direction="column" alignItems="center">
          <Box bg={colorMode === "light" ? "#FFFFFF" : "#0B1215"} p={4} borderRadius="md" width="50vw" minHeight="75vh">
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
            <Heading mb={4} ml={4}>Welcome 🗣️</Heading>
            <Heading mb={4} ml={4}>Sign in to Yapper Jobs</Heading>
              <Box flex={1} m={4} mt={10} position="relative">
                <Input
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  isRequired
                  _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  minWidth="30vw"
                />
              </Box>
              <Box flex={1} m={4} mt={10} position="relative">
                <Input
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  isRequired
                  _hover={{ bg: colorMode === "light" ? "gray.200" : "gray.800" }}
                  minWidth="30vw"
                />
              </Box>
              <Text mt={2} textAlign="center">
                <Link color="teal.500">Forgot Password?</Link>
              </Text>
              <Button
                mt={2}
                colorScheme="teal"
                width="100%"
                onClick={handleSubmit}
                backgroundColor={colorMode === "light" ? "#000000" : "#A96CDE"}
              >
                Sign In
              </Button>
              <Text mt={2} textAlign="center">
                Don't have an account with us? <Link color="teal.500" onClick={() => navigate("/register")}>Sign Up</Link>
              </Text>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider> 
  )
}

export default Login
