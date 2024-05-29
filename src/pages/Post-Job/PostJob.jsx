import React from 'react';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  HStack,
  VStack,
  Container,
  Tooltip,
} from '@chakra-ui/react';

const JobPosting = () => {
  return (
    <Container maxW="container.md" p={4}>
      <Heading as="h1" mb={6}>
        Create Posting
      </Heading>
      <VStack spacing={4} align="stretch">
        <FormControl id="job-position-name" isRequired>
          <FormLabel fontWeight="bold">Job Position Name</FormLabel>
          <Input placeholder="Enter job position name" />
        </FormControl>

        <FormControl fontWeight="bold" id="company" isRequired>
          <FormLabel fontWeight="bold">Company</FormLabel>
          <Input placeholder="Enter company name" />
        </FormControl>

        <FormControl id="job-type" isRequired>
          <FormLabel fontWeight="bold">Job Type</FormLabel>
          <HStack spacing={4}>
            <Select placeholder="Select job type">
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </Select>
            <Select placeholder="Select work location">
              <option value="remote">Remote</option>
              <option value="onsite">Onsite</option>
              <option value="hybrid">Hybrid</option>
            </Select>
          </HStack>
        </FormControl>

        <FormControl id="salary" isRequired>
          <FormLabel fontWeight="bold">Salary</FormLabel>
          <HStack spacing={4}>
            <Input placeholder="Min salary" />
            <Input placeholder="Max salary" />
          </HStack>
        </FormControl>

        <FormControl id="location" isRequired>
          <FormLabel fontWeight="bold">Location</FormLabel>
          <Input placeholder="Enter job location" />
        </FormControl>

        <FormControl id="company-size" isRequired>
          <FormLabel fontWeight="bold">Company Size</FormLabel>
          <Select placeholder="Select company size">
            <option value="1">1 Employee</option>
            <option value="5+">5+ Employees</option>
            <option value="25+">25+ Employees</option>
            <option value="100+">100+ Employees</option>
          </Select>
        </FormControl>

        <FormControl id="industry" isRequired>
          <FormLabel fontWeight="bold">Industry</FormLabel>
          <Select placeholder="Select industry" fontWeight="bold">
            <option value="Technology">Technology</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance</option>
            <option value="Education">Education</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <FormControl id="skills" isRequired>
          <FormLabel fontWeight="bold">Skills</FormLabel>
          <Tooltip label="List required skills separated by commas">
            <Input placeholder="Enter required skills" />
          </Tooltip>
        </FormControl>

        <FormControl id="benefits" isRequired>
          <FormLabel fontWeight="bold">Benefits</FormLabel>
          <Tooltip label="List Benefits (separated by commas)">
            <Input placeholder="Enter benefits" />
          </Tooltip>
        </FormControl>

        <FormControl id="job-description" isRequired>
          <FormLabel fontWeight="bold">Job Description</FormLabel>
          <Input placeholder="Enter job description" />
        </FormControl>
      </VStack>
    </Container>
  );
};

export default JobPosting;