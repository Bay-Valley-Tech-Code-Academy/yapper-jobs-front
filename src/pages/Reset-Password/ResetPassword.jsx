import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePasswordToggle } from '/util/passwordUtils';
import CustomColorMode from '/util/toggleColorMode';
import { apiService } from '../../services/apiRequests';
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
  useToast 
} from '@chakra-ui/react';

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const { showPassword, togglePasswordVisibility } = usePasswordToggle();
  const { showPassword: showVerifiedPassword, togglePasswordVisibility: toggleVerifiedPasswordVisibility } = usePasswordToggle();
  const { handleToggleColorMode, colors } = CustomColorMode();
  const toast = useToast();

  const handleSubmit = async(e) => {
    e.preventDefault();
  
    const specialChar = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@#$%^&*]).{12,}$');
  
    if (!password || !verifyPassword) {
      toast({
        title: 'Error',
        description: 'Please fill out the information',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
  
    if (password.length < 12) {
      toast({
        title: 'Error',
        description: 'Password must be at least 12 characters long',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else if (password !== verifyPassword) {
      toast({
        title: 'Error',
        description: 'Passwords do not match',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else if (!specialChar.test(password)) {
      toast({
        title: 'Error',
        description: 'Password must have at least one special character',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      try {
        await apiService.resetPassword(password);
  
        toast({
          title: 'Success',
          description: 'Password reset',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
  
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
              <Button 
                onClick={handleToggleColorMode} 
                mr={2} 
                color={colors.buttonColor} 
                backgroundColor={colors.buttonBgColor}
              >
                {colors.icon}
              </Button>
            </Flex>
            <Heading pt={10} ml={4} textAlign="center">Reset Password</Heading>
            <Heading pt={10} ml={4} size="md" textAlign="center">Create a new password. Must be at least 12 characters and must include at least 1 special character.</Heading>
            <Box flex={1} m={4} pt={6} position="relative">
              <InputGroup>
                <Input 
                  placeholder="password"
                  value={password}
                  type={showPassword ? 'text' : 'password'}
                  _hover={{bg: colors.bgHover}}
                  minWidth="20vw"
                  height="3rem"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement flex={1} m={1} width="5rem">
                  <Button 
                    id="check"
                    type="checkbox"
                    onClick={togglePasswordVisibility}
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
