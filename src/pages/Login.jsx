import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePasswordToggle } from '/util/passwordUtils';
import CustomColorMode from '/util/toggleColorMode';
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
  useToast, 
  Tooltip
} from '@chakra-ui/react';
import useUserStore from '../store/user-store';

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [isEmployer, setIsEmployer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { showPassword, togglePasswordVisibility } = usePasswordToggle();
  const { toggleColorMode, colors } = CustomColorMode();
  // const { login } = useUserStore();
  const { fetchSeeker, fetchEmployer } = useUserStore(); // Destructure the fetchSeeker function from the user store
  
  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    // Fetch user data when the component mounts (application initializes)
    const fetchUserData = async () => {
      if(jwt){
        const seekerData = await fetchSeeker();
        if(!seekerData) {
          await fetchEmployer();
          navigate('/employer-main');
        } else {
          navigate('/search');
        }
      }
    };

    fetchUserData();
  }, []); // Ensure useEffect runs only once

  const toggleUserType = () => {
    setIsEmployer(!isEmployer);
  };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

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
  
    setIsLoading(true);
  
    try {
      const { loginSeeker, loginEmployer } = useUserStore.getState();
      const data = await Promise.all([
        isEmployer ? loginEmployer(email, pass) : loginSeeker(email, pass),
        delay(1000),
      ]).then((values) => values[0]);
  
      if (!data || !data.role) {
        throw new Error('Failed to retrieve user role');
      }
  
      if (isEmployer && data.role !== 'employer') {
        throw new Error('Role mismatch: Logged in as seeker but expected employer');
      }
  
      if (!isEmployer && data.role !== 'seeker') {
        throw new Error('Role mismatch: Logged in as employer but expected seeker');
      }
  
      navigate(data.role === 'employer' ? '/employer-main' : '/search');
      setIsEmployer(data.role === 'employer');
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to login: ' + err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Failed to log in', err);
    } finally {
      setIsLoading(false);
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
            width="30vw"
            minHeight="65vh"
          >
            <Flex justifyContent="flex-end">
            <Tooltip label={`Switch to ${colors.iconSupport} mode`} aria-label="A tooltip" openDelay={500} closeDelay={200}>
                <Button
                  mr={2}
                  onClick={toggleColorMode}
                  color={colors.buttonColor}
                  backgroundColor={colors.buttonBgColor}
                >
                  {colors.icon}
                </Button>
              </Tooltip>
            </Flex>
            <Text mb={4} ml={4} fontSize="3xl">Welcome {isEmployer ? "Employer" : "Seeker"}</Text>
            <Heading mb={4} ml={4} fontSize="3xl">Sign in to Yapper Jobs</Heading>
            <Button
              onClick={toggleUserType}
              mt={4}
              ml={4}
              backgroundColor={colors.buttonBgColor}
              color={colors.buttonColor}
            >
              {isEmployer ? 'Switch to Seeker' : 'Switch to Employer'}
            </Button>
            <Box flex={1} m={4} mt={6} position="relative">
              <FormControl isRequired>
                <Input
                  placeholder="email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  _hover={{ bg: colors.bgHover }}
                  minWidth="20vw"
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
                  minWidth="20vw"
                  height="3rem"
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
            </Box>
            <Text mt={5} textAlign="center">
              <Link color="teal.500" onClick={() => navigate('/forget-password')}>Forgot Password?</Link>
            </Text>
            <Box flex={1} ml={4} position="relative">
              <Button
                mt={8}
                minWidth="24.2vw"
                onClick={handleSubmit}
                backgroundColor={colors.buttonBgColor}
                color={colors.buttonColor}
                height="3rem"
                isLoading={isLoading}
                loadingText="Signing In..."
              >
                Sign In as {isEmployer ? 'Employer' : 'Seeker'}
              </Button>
            </Box>
            <Text mt={8} textAlign="center">
              Don&apos;t have an account with us?
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