import React from 'react'
import { Flex, Heading, Box, Text } from '@chakra-ui/react';

function AppliedJobCard(props) {

  //change font color based on font color
  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return 'green';
      case 'Viewed':
        return 'yellow';
      case 'Declined':
        return 'red';
      default:
        return 'black';
    }
  };

  return (
    <Flex>
    <Box p={4} m={2}>
        <Heading as="h2" size="lg" cursor="pointer">
            {props.title}
        </Heading>
        <Text>{props.company} | {props.location}</Text>
        <Text><strong>Status:</strong> <span style={{color: getStatusColor(props.status)}}>{props.status}</span></Text>
    </Box>
</Flex>
  )
}

export default AppliedJobCard
