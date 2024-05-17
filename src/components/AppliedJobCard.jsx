import React from 'react'
import { Flex, Heading, Box, Text } from '@chakra-ui/react';

function AppliedJobCard(props) {
  return (
    <Flex>
    <Box p={4} m={2}>
        <Heading as="h2" size="lg" cursor="pointer">
            {props.title}
        </Heading>
        <Text>{props.company} | {props.location}</Text>
        <Text><strong>Status:</strong> Submitted</Text>
    </Box>
</Flex>
  )
}

export default AppliedJobCard
