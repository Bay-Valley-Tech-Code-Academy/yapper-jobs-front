import { Box, Text } from '@chakra-ui/react';

const InterviewCard = ({ interview }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <Text fontWeight="bold">{interview.job_title}</Text>
      <Text>{interview.candidate_name}</Text>
      <Text>{interview.interview_date}</Text>
      <Text>Status: {interview.status}</Text>
    </Box>
  );
};

export default InterviewCard;
