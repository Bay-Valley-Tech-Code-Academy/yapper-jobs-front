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
import { jobs } from "../../jobs";

function Search() {
  const [selectedJob, setSelectedJob] = useState("")
  const [maxJobCards, setMaxJobCards] = useState(10); //shows up to 10 job cards initially

  //add 5 more job cards on click
  const handleShowMore = () => {
    setMaxJobCards((prevMax) => prevMax + 5);
  };

  //gets the max cards depending on the value of the state variable
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
        {/* JobCards Component */}
        <Box width={{ base: "100%", sm: "40%" }} mr="4" overflow="auto">
          <Heading>Search Results</Heading>
          <Text>{jobs.length} jobs</Text>
          {/* Display JobCards */}
          {jobCards.map((job) => (
            <JobCard key={job.id} {...job} setSelectedJob={setSelectedJob}/>
          ))}
          {/* Get more Jobs */}
          {jobs.length > maxJobCards && (
            <Button onClick={handleShowMore} mt="4">
              Show More
            </Button>
          )}
        </Box>
        {/* JobSummary Component */}
        <Box width={{ base: "0%", sm: "60%" }}>
          <JobSummary selectedJob={selectedJob}/>
        </Box>
      </Flex>
    </div>
  );
}

export default Search;

