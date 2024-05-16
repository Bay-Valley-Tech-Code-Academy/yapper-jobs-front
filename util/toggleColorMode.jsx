import { useColorMode } from '@chakra-ui/react'

function customColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();

    const colors = {
        light: {
            bgGradient: 'linear(to-l, #663399, #D5B4F2)',
            boxColor: '#FFFFFF',
            textColor: '#000000',
            buttonColor: '#FFFFFF',
            buttonBgColor: "#000000",
            bgHover: 'gray.200',
            text: 'light',
        },
        dark: {
            bgGradient: '#0B1215',
            boxColor: '#0B1215',
            textColor: '#F3F3F3',
            buttonColor: '#000000',
            buttonBgColor: '#A96CDE',
            bgHover: 'gray.800',
            text: 'dark',
        },
    };

    const handleToggleColorMode = () => {
        toggleColorMode();
      };

    const currentColors = colors[colorMode];

    return { colorMode, handleToggleColorMode, colors: currentColors };
}

export default customColorMode
