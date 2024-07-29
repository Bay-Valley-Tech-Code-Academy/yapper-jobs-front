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
import { BASE_URL } from "../store/config";
import { useNavigate } from 'react-router-dom';

const DeleteConfirmation = () => {
    const { toggleColorMode, colors } = CustomColorMode();
    const navigate = useNavigate();

    const confirmDelete = async () => {
      const params = new URLSearchParams(window.location.search);
      const token = params.get("token");
      const url = (
        `${BASE_URL}/delete?token=` + token
      );
      console.log(url)
      try {
        const response = await fetch(url, {
            method: 'delete',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-Type': 'application/json'
            }
        });

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            const result = await response.json();
            if (response.ok) {
                alert('Account deleted');
                localStorage.removeItem("jwt");
                localStorage.removeItem("savedJobs");
                localStorage.removeItem("token");
                navigate('/');
            } else {
                alert(`Error: ${result.error}`);
            }
        } else {
            const text = await response.text();
            console.error('Unexpected response:', text);
            alert('An unexpected error occurred. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting account:', error);
        alert('An error occurred. Please try again.');
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
            <Heading pt={5} ml={4} textAlign="center">Delete Your Account?</Heading>
            <Heading pt={5} ml={4} size="md" textAlign="center">We&apos;re sad to see you go{/*, your account has been deleted.*/}</Heading>
            <Flex justifyContent="center" mt={4}>
              <Tooltip label={`Delete confirmation button`} aria-label="Delete confirmation button" openDelay={500} closeDelay={200}>
                <Button 
                  onClick={confirmDelete} 
                  color={colors.buttonColor} 
                  backgroundColor={colors.buttonBgColor}
                >
                  DELETE
                </Button>
              </Tooltip>
            </Flex>
        </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  )
}

export default DeleteConfirmation
