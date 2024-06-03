import React, { useRef, useEffect, useState } from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  HStack,
  VStack,
  Container,
  Tooltip,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure,
  IconButton,
  List,
  ListItem,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { HamburgerIcon, SunIcon, MoonIcon } from '@chakra-ui/icons'; 
import customColorMode from '../../../util/toggleColorMode';

const sections = [
  { id: 'job-position-name', label: 'Job Position:' },
  { id: 'company', label: 'Company:' },
  { id: 'location', label: 'Location:' },
  { id: 'job-type', label: 'Job Type:' },
  { id: 'salary', label: 'Salary:' },
  { id: 'industry', label: 'Industry:' },
  { id: 'skills', label: 'Skills:' },
  { id: 'benefits', label: 'Benefits:' },
  { id: 'company-size', label: 'Company Size:' },
  { id: 'job-description', label: 'Job Description:' },
];

const JobPosting = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const [activeSection, setActiveSection] = useState(null);
  const { colorMode, toggleColorMode, colors } = customColorMode();

  const sectionRefs = useRef(
    sections.reduce((acc, section) => {
      acc[section.id] = React.createRef();
      return acc;
    }, {})
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.7,
      }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const handleJumpToSection = (id) => {
    sectionRefs.current[id].current.scrollIntoView({ behavior: 'smooth' });
    onClose(); // Close drawer when clicked
  };

  return (
    <Container maxW="container.md" p={4}>
      <Flex justifyContent="flex-end">
        <Tooltip label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`} aria-label="A tooltip" openDelay={500} closeDelay={200}>
          <Button
            onClick={toggleColorMode}
            mr={2}
            color={colors.buttonColor}
            backgroundColor={colors.buttonBgColor}
            _hover={{ bg: colors.buttonHoverColor }}
            size={["sm", "md", "lg"]}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Tooltip>
      </Flex>
      <Heading as="h1" mb={6}>
        Create Job Posting
      </Heading>
      <HStack align="start" spacing={4}>
        {/* Sidebar of Contents */}
        <Box as="nav" display={{ base: 'none', md: 'block' }} width="200px" position="sticky" top="20px">
          <List spacing={3}>
            {sections.map((section) => (
              <ListItem key={section.id}>
                <Button
                  variant="link"
                  onClick={() => handleJumpToSection(section.id)}
                  textDecoration={activeSection === section.id ? 'line-through' : 'none'}
                  fontWeight={activeSection === section.id ? 'bold' : 'normal'}
                >
                  {section.label}
                </Button>
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider orientation="vertical" />

        {/* Drawer for mobile */}
        <Box display={{ base: 'block', md: 'none' }} position="sticky" top="20px">
          <IconButton
            ref={btnRef}
            icon={<HamburgerIcon />}
            onClick={onOpen}
            aria-label="Open menu"
          />
          <Drawer
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            finalFocusRef={btnRef}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Menu</DrawerHeader>

              <DrawerBody>
                <List spacing={3}>
                  {sections.map((section) => (
                    <ListItem key={section.id}>
                      <Button
                        variant="link"
                        onClick={() => handleJumpToSection(section.id)}
                        textDecoration={activeSection === section.id ? 'line-through' : 'none'}
                        fontWeight={activeSection === section.id ? 'bold' : 'normal'}
                      >
                        {section.label}
                      </Button>
                    </ListItem>
                  ))}
                </List>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Box>

        {/* Main form */}
        <VStack spacing={4} align="stretch" flex="1">
          {sections.map((section, index) => (
            <React.Fragment key={section.id}>
              <Box ref={sectionRefs.current[section.id]} id={section.id} py={3}>
                <FormControl isRequired>
                  <FormLabel fontWeight="bold">{section.label}</FormLabel>
                  {section.id === 'job-type' ? (
                    <HStack spacing={4}>
                      <Select placeholder="Select job type" height="60px">
                        <option value="full-time">Full Time</option>
                        <option value="part-time">Part Time</option>
                        <option value="contract">Contract</option>
                      </Select>
                      <Select placeholder="Select work location" height="60px">
                        <option value="remote">Remote</option>
                        <option value="onsite">Onsite</option>
                        <option value="hybrid">Hybrid</option>
                      </Select>
                    </HStack>
                  ) : section.id === 'salary' ? (
                    <HStack spacing={4}>
                      <Input placeholder="Min salary" height="60px" />
                      <Input placeholder="Max salary" height="60px" />
                    </HStack>
                  ) : section.id === 'company-size' ? (
                    <Select placeholder="Select company size" height="60px">
                      <option value="1">1 Employee</option>
                      <option value="5+">5+ Employees</option>
                      <option value="25+">25+ Employees</option>
                      <option value="100+">100+ Employees</option>
                    </Select>
                  ) : section.id === 'industry' ? (
                    <Select placeholder="Select industry" height="50px">
                      <option value="Technology">Technology</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Finance">Finance</option>
                      <option value="Education">Education</option>
                      <option value="Other">Other</option>
                    </Select>
                  ) : section.id === 'skills' || section.id === 'benefits' ? (
                    <Tooltip label={section.id === 'skills' ? 'List required skills separated by commas' : 'List Benefits (separated by commas)'}>
                      <Input placeholder={`Enter ${section.label.toLowerCase()}`} height="50px" />
                    </Tooltip>
                  ) : section.id === 'job-description' ? (
                    <Textarea placeholder="Enter job description" resize="vertical" />
                  ) : (
                    <Input placeholder={`Enter ${section.label.toLowerCase()}`} height="50px" />
                  )}
                </FormControl>
              </Box>
              {index !== sections.length - 1 && <Divider />} {/* Divider between every section */}
            </React.Fragment>
          ))}
        </VStack>
      </HStack>
    </Container>
  );
};

export default JobPosting;
