import { Flex, Box, VStack, HStack, Text, Tooltip, IconButton, Select } from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import useUserStore from "../store/user-store";

const JobPostCard = (props) => {
  return (
    <Box mt={5} mx={5} p={4} border="1px solid #ccc" borderRadius="md">
      <VStack align="start" spacing={2}>
        <Flex justify="space-between" w="100%">
          <Text fontWeight="bold" fontSize="large">{props.title}</Text>
          <HStack spacing={3}>
            <Tooltip label="Edit" fontSize="md">
              <IconButton icon={<EditIcon />} size="sm" />
            </Tooltip>
            <Tooltip label="Delete" fontSize="md">
              <IconButton icon={<DeleteIcon />} size="sm" />
            </Tooltip>
          </HStack>
        </Flex>
        <Text>Location: {props.isRemote ? "Remote" : `${props.city}, ${props.state}`}</Text>
        <Text>Experience: {props.experience_level}</Text>
        <Text>Posted: 2 days ago</Text>
        <Select placeholder="Select status" mt={2} w="200px">
          <option value="open">Open</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </Select>
      </VStack>
      <Box borderBottom="1px solid #ccc" mt={4} />
    </Box>
  );
};

export default JobPostCard;
