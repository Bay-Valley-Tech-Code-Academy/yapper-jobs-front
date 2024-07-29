import { Box, Text } from '@chakra-ui/react';

const ApplicationCard = ({ application }) => {
  return (
    <Box borderWidth="1px" borderRadius="lg" p={4} mb={4}>
      <Text fontWeight="bold">{application.job_title}</Text>
      <Text>{application.applicant_name}</Text>
      <Text>{application.application_date}</Text>
      <Text>Status: {application.status}</Text>
    </Box>
  );
};

export default ApplicationCard;
