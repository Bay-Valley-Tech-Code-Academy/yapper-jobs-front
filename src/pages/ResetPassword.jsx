import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePasswordToggle } from '/util/passwordUtils';
import CustomColorMode from '/util/toggleColorMode';
import { 
  ChakraProvider,
  Box,
  ColorModeScript,
  Flex,
  Button,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Text,
  useToast,
  Tooltip,
  Image
} from '@chakra-ui/react';

function ResetPassword() {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [token, setToken] = useState('');
  const { showPassword, togglePasswordVisibility } = usePasswordToggle();
  const { showPassword: showVerifiedPassword, togglePasswordVisibility: toggleVerifiedPasswordVisibility } = usePasswordToggle();
  const { toggleColorMode, colors } = CustomColorMode();
  const toast = useToast();

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      setToken(tokenFromLocalStorage);
    } else {
      console.log('Error, token not found');
    }
  }, []);

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const specialChar = new RegExp(`[!@#$%^&*()+=.-_]+`);

    let errorType = null;

    if(!newPassword || !verifyPassword) {
      errorType = 'EMPTY_FIELDS';
    } else if (newPassword.length < 12) {
      errorType = 'SHORT_PASSWORD';
    } else if (newPassword !== verifyPassword) {
      errorType = 'MISMATCH_PASSWORDS';
    } else if (!specialChar.test(newPassword)) {
      errorType = 'NO_SPECIAL_CHAR';
    }
  
    switch (errorType) {
      case 'EMPTY_FIELDS':
        toast({
          title: 'Error',
          description: 'Please fill out the information',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      case 'SHORT_PASSWORD':
        toast({
          title: 'Error',
          description: 'Password must be at least 12 characters long',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      case 'MISMATCH_PASSWORDS':
        toast({
          title: 'Error',
          description: 'Passwords do not match',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;
      case 'NO_SPECIAL_CHAR':
        toast({
          title: 'Error',
          description: 'Password must have at least one special character',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        return;

      default:
        try {
          await apiService.resetPassword(newPassword, token);
  
          toast({
            title: 'Success',
            description: 'Password reset',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });

          localStorage.removeItem('token');
          navigate('/');
    
        } catch (err) {
          toast({
            title: 'Error',
            description: 'Failed to reset password',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      }
  };

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
            <Heading pt={5} ml={4} textAlign="center">Reset Password</Heading>
            <Heading pt={5} ml={4} size="md" textAlign="center">Create a new password. Must be at least 12 characters and must include at least 1 special character.</Heading>
            <Box flex={1} m={4} pt={6} position="relative">
              <InputGroup>
                <Input 
                  placeholder="password"
                  value={newPassword}
                  type={showPassword ? 'text' : 'password'}
                  _hover={{bg: colors.bgHover}}
                  minWidth="20vw"
                  height="3rem"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputRightElement flex={1} m={1} width="5rem">
                  <Button 
                    id="check"
                    type="checkbox"
                    onClick={togglePasswordVisibility}
                    _hover={{ bg: colors.buttonHoverColor }}
                    backgroundColor={colors.buttonBgColor}
                    color={colors.buttonColor}
                    cursor="pointer"
                    size="md"
                    height="2rem"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </Button> 
                </InputRightElement>
              </InputGroup>
              <InputGroup>
                <Input 
                  mt={4}
                  placeholder="verify password"
                  value={verifyPassword}
                  type={showVerifiedPassword ? 'text' : 'password'}
                  _hover={{bg: colors.bgHover}}
                  minWidth="20vw"
                  height="3rem"
                  onChange={(e) => setVerifyPassword(e.target.value)}
                />
                <InputRightElement flex={1} m={1} width="5rem">
                  <Button 
                    id="check"
                    type="checkbox"
                    onClick={toggleVerifiedPasswordVisibility}
                    _hover={{ bg: colors.buttonHoverColor }}
                    backgroundColor={colors.buttonBgColor}
                    color={colors.buttonColor}
                    cursor="pointer"
                    size="md"
                    height="2rem"
                    marginTop="2rem"
                  >
                    {showVerifiedPassword ? 'Hide' : 'Show'}
                  </Button> 
                </InputRightElement>
              </InputGroup>
              <Button
                mt={8}
                minWidth="24.2vw"
                backgroundColor={colors.buttonBgColor}
                color={colors.buttonColor}
                height="3rem"
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </Box>
            <Text mt={8} display="flex" justifyContent="center">
              <Link 
                color="teal.500"
                onClick={() => navigate('/')}
              >
                Go back to Login
              </Link> 
            </Text>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default ResetPassword;