import { HStack, Text } from "@chakra-ui/react";
import React from "react";

const ResumeSection = ({ section }) => {
  return (
    <HStack>
      <Text>{section}</Text>
    </HStack>
  );
};

export default ResumeSection;