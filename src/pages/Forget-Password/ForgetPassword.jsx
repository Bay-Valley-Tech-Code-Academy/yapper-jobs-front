// import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { 
    ChakraProvider, 
    Box, 
    ColorModeScript, 
    Flex,
    Button,
    useColorMode

} from "@chakra-ui/react";

function ForgetPassword() {
    // const navigate = useNavigate();
    const { colorMode, toggleColorMode } = useColorMode();

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
            display="flex"                justifyContent="center"
            alignItems="center"
        >
            {/* Light mode toggle for header for now, if needed, copy login or register page for formatting and layout */}
            <Flex direction="column" alignItems="center">
                <Box bg={colorMode === "light" ? "#FFFFFF" : "#0B1215"} p={4} borderRadius="md" width="35vw" minHeight="60vh">
                    <Flex justifyContent="flex-end">
                        <Button onClick={toggleColorMode} mr={2} color={colorMode === "light" ? "#FFFFFF" : "#000000"} backgroundColor={colorMode === "light" ? "#000000" : "#A96CDE"}>
                            Toggle {colorMode === "light" ? "Dark" : "Light"} Mode
                        </Button>
                    </Flex>
                </Box>
            </Flex>
        </Box>
    </ChakraProvider>
  )
}

export default ForgetPassword
