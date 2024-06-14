import { useNavigate } from "react-router-dom"
import customColorMode from '/util/toggleColorMode'
import "./ConfirmPassword.css"
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

function ConfirmPassword() {
  const navigate = useNavigate();
  const { handleToggleColorMode, colors } = customColorMode();

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
                    <Heading pt={10} ml={4} textAlign="center">Reset Password</Heading>
                    <Heading pt={10} ml={4} size="md" textAlign="center">Create a new password. Must be at least 12 characters, must include at least 1 numeric value and 1 special character.</Heading>
                    <Box flex={1} m={4} pt={6} position="relative">
                        <Input 
                            placeholder="password"
                            type="password"
                            _hover={{bg: colors.bgHover}}
                            minWidth="20vw"
                            height="3rem"
                        />
                        <Input 
                            mt={4}
                            placeholder="verify password"
                            type="password"
                            _hover={{bg: colors.bgHover}}
                            minWidth="20vw"
                            height="3rem"
                        />
                        <Button
                            mt={8}
                            minWidth="24.2vw"
                            backgroundColor={colors.buttonBgColor}
                            color={colors.buttonColor}
                            height="3rem"
                        >
                            Reset Password
                        </Button>
                    </Box>
                    <Text mt={8} display="flex" justifyContent="center">
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

export default ConfirmPassword
