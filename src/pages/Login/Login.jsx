import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomColorMode from '/util/toggleColorMode';
import { usePasswordToggle } from '/util/passwordUtils';
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
  FormControl,
  useToast 
} from '@chakra-ui/react';

function Login() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const { showPassword, togglePasswordVisibility } = usePasswordToggle();
  const [isEmployer, setIsEmployer] = useState(false);
  const { handleToggleColorMode, colors } = CustomColorMode();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !pass) {
      toast({
        title: 'Error',
        description: 'Please fill out login information',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, pass }),
      });

      if (!response.ok) throw new Error('Sign in request failed');

      const data = await response.json();
      console.log('User logged in successfully:', data);

      toast({
        title: 'Success',
        description: 'Login success',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate(data.role === 'employer' ? '/employer-main' : '/search');
      setIsEmployer(data.role === 'employer');

      return data;
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to login',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Failed to log in', err);
    }
  };

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
                {colors.icon}
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
                  value={pass}
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => setPass(e.target.value)}
                  _hover={{ bg: colors.bgHover }}
                  isRequired
                  minWidth="30vw"
                  height="3rem"
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
            </Box>
            <Text mt={6} textAlign="center">
              <Link color="teal.500" onClick={() => navigate('/forget-password')}>Forgot Password?</Link>
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
              <Link color="teal.500" onClick={() => navigate('/register')}>
                &nbsp;Sign Up
              </Link>
            </Text>
          </Box>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default Login;
