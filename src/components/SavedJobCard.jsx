import React from "react";
import { Flex, Heading, Box, Text, Button, IconButton } from "@chakra-ui/react";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function SavedJobCard(props) {
  const navigate = useNavigate();

  return (
    <Flex>
      <Box p={4} m={2}>
        <Heading
          as="h2"
          size="lg"
          cursor="pointer"
          onClick={() => navigate(`../apply/${props.id}`)}
        >
          {props.title}
        </Heading>
        <Text fontSize="md">
          {props.company} | {props.location}
        </Text>
        <Text>{props.status}</Text>
        <Button
          colorScheme="purple"
          onClick={() => navigate(`../apply/${props.id}`)}
        >
          Apply Now
        </Button>
        <IconButton
          aria-label="Unsave"
          icon={<MdFavorite />}
          colorScheme="purple"
          variant="ghost"
          size="sm"
          onClick={() => props.handleRemoveJob(props.id)}
        />
      </Box>
    </Flex>
  );
}

export default SavedJobCard;
