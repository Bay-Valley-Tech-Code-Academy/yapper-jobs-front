import CustomColorMode from '/util/toggleColorMode';
import { 
  ChakraProvider,
  Box,
  ColorModeScript,
  Flex,
  Button,
  Heading,
  Tooltip,
  Image
} from '@chakra-ui/react';

const DeleteConfirmation = () => {
    const { toggleColorMode, colors } = CustomColorMode();

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
            <Heading pt={5} ml={4} textAlign="center">Delete Confirmation</Heading>
            <Heading pt={5} ml={4} size="md" textAlign="center">We&apos;re sad to see you go, your account has been deleted.</Heading>
        </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}

export default DeleteConfirmation
