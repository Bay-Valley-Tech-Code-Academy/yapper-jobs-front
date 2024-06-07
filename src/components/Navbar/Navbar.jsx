import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  Link as ChakraLink,
  Image,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon, SunIcon, MoonIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import customColorMode from '../../../util/toggleColorMode';

function NavBar() {
  const navigate = useNavigate();
  const [isLargerThanMobile] = useMediaQuery("(min-width: 829px)"); // Width when the hamburger menu appears
  const [isOpen, setIsOpen] = useState(false);
  const { colorMode, toggleColorMode, colors } = customColorMode();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = () => {
    if (!isLargerThanMobile) {
      setIsOpen(false);
    }
  };

  return (
    <Box bg="#A96CDE" color="white" p="4" height="74px"
      width="100%" overflowX="hidden" position="relative">
      <Flex justify="space-between" align="center" position="relative">
        <Flex align="center">
          <Image src={colors.logoSrc} alt="Yapper Jobs Logo" height="35px" 
            onClick={() => navigate("/search")} 
            cursor="pointer" 
          />
          <Tooltip
            label={`Switch to ${colorMode === 'light' ? 'dark' : 'light'} mode`}
            aria-label="A tooltip"
            openDelay={500}
            closeDelay={200}
            ml={4}
          >
            <Button
              onClick={toggleColorMode}
              color={colors.buttonColor}
              backgroundColor="#A96CDE"
              border={`1px solid ${colors.buttonBorderColor}`}
              _hover={{ 
                backgroundColor: colors.buttonHoverBgColor 
              }}
              size="sm"
              ml={4} // Distance away from Yapper Logo
            >
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Tooltip>
        </Flex>
        {isLargerThanMobile ? (
          <Flex flex="2" justify="flex-end">
            {/* For Seekers */}
            <Flex mr="4">
              <ChakraLink as={Link} to="/saved-jobs"
                mr="4" onClick={handleLinkClick}>
                Your Jobs
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/resume-builder"
                mr="4"
                onClick={handleLinkClick}
              >
                Resume Builder
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/profile-seeker"
                onClick={handleLinkClick}
              >
                Profile
              </ChakraLink>
              {/* <Box as="button" onClick={apiService.logout} mr="4">
                <ChakraLink>Logout</ChakraLink>
              </Box> */}
            </Flex>
            {/* For Employers */}
            <Flex>
              <ChakraLink
                as={Link}
                to="/post-job"
                mr="4"
                onClick={handleLinkClick}
              >
                Post Job
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/applications"
                mr="4"
                onClick={handleLinkClick}
              >
                View Applications
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/profile-employer"
                onClick={handleLinkClick}
              >
                Profile
              </ChakraLink>
              {/* <Box as="button" onClick={apiService.logout} mr="4">
                <ChakraLink>Logout</ChakraLink>
              </Box> */}
            </Flex>
          </Flex>
        ) : (
          <IconButton
            aria-label="Open Menu"
            size="sm"
            icon={<HamburgerIcon />}
            onClick={handleToggle}
            mr="2"
          />
        )}
        <Drawer
          placement="right"
          onClose={() => setIsOpen(false)}
          isOpen={isOpen}
        >
          <DrawerOverlay />
          <DrawerContent bg="#A96CDE">
            {" "}
            {/* Drawer BG Color */}
            <DrawerCloseButton />
            <DrawerBody>
              <ChakraLink as={Link} to="/saved-jobs" 
                onClick={() => { setIsOpen(false); handleLinkClick(); }} pb="2"
                display="block" my="4" fontSize="xl" borderBottom="1px solid #EDF6F9"
                color="#EDF6F9"
                _hover={{
                  textDecoration: "none",
                  color: "#0E1428",
                  borderBottom: "1px solid #0E1428",
                }}
              >
                Your Jobs
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/resume-builder"
                onClick={() => {
                  setIsOpen(false);
                  handleLinkClick();
                }}
                pb="2"
                display="block"
                my="4"
                fontSize="xl"
                borderBottom="1px solid #EDF6F9"
                color="#EDF6F9"
                _hover={{
                  textDecoration: "none",
                  color: "#0E1428",
                  borderBottom: "1px solid #0E1428",
                }}
              >
                Resume Builder
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/profile-seeker"
                onClick={() => {
                  setIsOpen(false);
                  handleLinkClick();
                }}
                pb="2"
                display="block"
                my="4"
                fontSize="xl"
                borderBottom="1px solid #EDF6F9"
                color="#EDF6F9"
                _hover={{
                  textDecoration: "none",
                  color: "#0E1428",
                  borderBottom: "1px solid #0E1428",
                }}
              >
                Profile
              </ChakraLink>
              {/* <Box
                as="button"
                onClick={() => {
                  apiService.logout();
                  setIsOpen(false);
                }}
                pb="2"
                display="block"
                my="4"
                fontSize="xl"
                borderBottom="1px solid #EDF6F9" // Color of border in hamburger menu
                color="#EDF6F9" // Color of text in hamburger menu
                _hover={{
                  // On hover change to these settings
                  textDecoration: "none",
                  color: "#0E1428",
                  borderBottom: "1px solid #0E1428",
                }}
              >
                Logout
              </Box> */}
              <ChakraLink
                as={Link}
                to="/post-job"
                onClick={() => {
                  setIsOpen(false);
                  handleLinkClick();
                }}
                pb="2"
                display="block"
                my="4"
                fontSize="xl"
                borderBottom="1px solid #EDF6F9"
                color="#EDF6F9"
                _hover={{
                  textDecoration: "none",
                  color: "#0E1428",
                  borderBottom: "1px solid #0E1428",
                }}
              >
                Post Job
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/applications"
                onClick={() => {
                  setIsOpen(false);
                  handleLinkClick();
                }}
                pb="2"
                display="block"
                my="4"
                fontSize="xl"
                borderBottom="1px solid #EDF6F9"
                color="#EDF6F9"
                _hover={{
                  textDecoration: "none",
                  color: "#0E1428",
                  borderBottom: "1px solid #0E1428",
                }}
              >
                View Applications
              </ChakraLink>
              <ChakraLink
                as={Link}
                to="/profile-employer"
                onClick={() => {
                  setIsOpen(false);
                  handleLinkClick();
                }}
                pb="2"
                display="block"
                my="4"
                fontSize="xl"
                borderBottom="1px solid #EDF6F9"
                color="#EDF6F9"
                _hover={{
                  textDecoration: "none",
                  color: "#0E1428",
                  borderBottom: "1px solid #0E1428",
                }}
              >
                Profile
              </ChakraLink>
              {/* <Box
                as="button"
                onClick={() => {
                  apiService.logout();
                  setIsOpen(false);
                }}
                pb="2"
                display="block"
                my="4"
                fontSize="xl"
                borderBottom="1px solid #EDF6F9" // Color of border in hamburger menu
                color="#EDF6F9" // Color of text in hamburger menu
                _hover={{
                  // On hover change to these settings
                  textDecoration: "none",
                  color: "#0E1428",
                  borderBottom: "1px solid #0E1428",
                }}
              >
                Logout
              </Box> */}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Box>
  );
}

export default NavBar;
