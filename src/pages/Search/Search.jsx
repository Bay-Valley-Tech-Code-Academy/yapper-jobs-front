import React from 'react'
import "./Search.css"

function Search() {
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
            <JobCard key={job.id} {...job} selectedJob={selectedJob} setSelectedJob={setSelectedJob}/>
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
  )
}

export default Search
