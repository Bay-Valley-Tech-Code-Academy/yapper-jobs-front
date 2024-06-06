import { useColorMode } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

function customColorMode() {
  const { colorMode, toggleColorMode } = useColorMode();

  const colors = {
    light: {
      bgGradient: 'linear(to-l, #663399, #D5B4F2)',
      boxColor: '#FFFFFF',
      textColor: '#000000',
      buttonColor: '#FFFFFF',
      buttonBgColor: '#000000',
      buttonBorderColor: '#FFFFFF', // Added border color for light mode
      bgHover: 'gray.300',
      logoSrc: '/yapperjoblogo.png',
      buttonHoverColor: '#A96CDE',
      buttonHoverBgColor: '#333333',
      hyperlinkColor: '#3182CE',
      hyperlinkTextDecoration: 'underline',
      dividerColor: 'gray.200',
      alertBgColor: 'red.500',
      alertTextColor: 'black.300',
      icon: <MoonIcon />
    },
    dark: {
      bgGradient: '#0B1215',
      boxColor: '#0B1215',
      textColor: '#F3F3F3',
      buttonColor: '#000000',
      buttonBgColor: '#A96CDE',
      buttonBorderColor: '#000000', // Added border color for dark mode
      bgHover: 'gray.800',
      logoSrc: '/yapperjoblogo-dark.png',
      buttonHoverColor: '#FFFFFF',
      buttonHoverBgColor: '#FFFFFF',
      hyperlinkColor: 'cyan',
      hyperlinkTextDecoration: 'underline',
      dividerColor: 'gray.700',
      alertBgColor: 'red.900',
      alertTextColor: 'red.100',
      icon: <SunIcon />
    },
  };

  const currentColors = colors[colorMode];

  return { colorMode, toggleColorMode, colors: currentColors };
}

export default customColorMode;
