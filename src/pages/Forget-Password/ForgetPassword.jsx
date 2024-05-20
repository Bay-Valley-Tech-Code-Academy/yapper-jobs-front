import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import customColorMode from '/util/toggleColorMode'
import { 
    ChakraProvider, 
    Box, 
    ColorModeScript, 
    Flex,
    Button,
    Heading,
    Input,
    Link,
    Text
} from "@chakra-ui/react";

function ForgetPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const { handleToggleColorMode, colors } = customColorMode();

    const handleSubmit = (e) => {
        e.preventDefault();


    }

  return (
    <ChakraProvider>
        <ColorModeScript initialColorMode="dark" />
        <Box
            p={[2, 4, 6, 8]}
            maxWidth="100vw"
            minHeight="100vh"
            margin="auto"
            bgGradient={colors.bgGradient}
            color={colors.textColor}
            display="flex"                justifyContent="center"
            alignItems="center"
        >
            {/* Light mode toggle for header for now, if needed, copy login or register page for formatting and layout */}
            <Flex direction="column" alignItems="center">
                <Box 
                    bg={colors.boxColor}
                    p={10} 
                    borderRadius="md" 
                    width="30vw" 
                    minHeight="65vh"
                >
                    <Flex justifyContent="flex-end">
                        <Button 
                            onClick={handleToggleColorMode} 
                            mr={2} 
                            color={colors.buttonColor} 
                            backgroundColor={colors.buttonBgColor}
                        >
                            Toggle {colors.text} Mode
                        </Button>
                    </Flex>
                    <Heading pt={10} ml={4} textAlign="center">Forget Password?</Heading>
                    <Heading pt={10} ml={4} size="md" textAlign="center">Type in your email below and we'll send you a reset password</Heading>
                    <Box flex={1} m={4} pt={10} position="relative">
                        <Input 
                            placeholder="email"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            _hover={{bg: colors.bgHover}}
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
                        <Link 
                            color="teal.500"
                            onClick={() => navigate("/")}
                        >
                            Go back to Login
                        </Link> 
                    </Text>
                </Box>
            </Flex>
        </Box>
    </ChakraProvider>
  )
}

export default ForgetPassword
