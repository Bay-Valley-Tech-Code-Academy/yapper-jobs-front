import React, { useState } from "react";
import {
  Heading,
  Text,
  Flex,
  Box,
  Button,
} from "@chakra-ui/react";
import Searchbar from "../../components/Searchbar/Searchbar";
import JobSummary from "../../components/JobSummary/JobSummary";
import JobCard from "../../components/JobCard/JobCard";

function Search() {
  // Sample job data
  const jobs = [
    { id: 1, title: "Job 1", company: "Company A" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
    { id: 2, title: "Job 2", company: "Company B" },
  ];

  const [maxJobCards, setMaxJobCards] = useState(10);

  const handleShowMore = () => {
    setMaxJobCards((prevMax) => prevMax + 5);
  };

  const jobCards = jobs.slice(0, maxJobCards);

  return (
    <div style={{backgroundColor:"#F4F4F4", display: "flex", flexDirection: "column", height: "100%"}}>
      <Heading textAlign="center" m="4">
        Search Jobs
      </Heading>
      <Flex
        justifyContent="center"
        alignItems="center"
        width="80%"
        mx="auto"
        px="4"
        mb="4"
      >
        <Searchbar/>
      </Flex>
      <Flex maxW="90%" maxH="100vh" mx="auto" px="4">
        {/* SavedJob Component */}
        <Box width={{ base: "100%", sm: "40%" }} mr="4" overflow="auto">
          <Heading>Search Results</Heading>
          <Text>{jobs.length} jobs</Text>
          {/* Display JobCards */}
          {jobCards.map((job) => (
            <JobCard key={job.id} {...job} />
          ))}
          {jobs.length > maxJobCards && (
            <Button onClick={handleShowMore} mt="4">
              Show More
            </Button>
          )}
        </Box>
        {/* JobSummary Component */}
        <Box width={{ base: "0%", sm: "60%" }}>
          <JobSummary />
        </Box>
      </Flex>
    </div>
  );
}

export default Search;

