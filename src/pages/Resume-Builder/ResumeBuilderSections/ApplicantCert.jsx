import React from "react";
import { Box, Editable,EditableInput,EditablePreview, HStack,Text } from "@chakra-ui/react";

function Certifications() {
    return (
        <Box>
        <Editable defaultValue='Certification'mt={1} ml={5} fontSize={15}>
            <EditablePreview />
            <EditableInput />
        </Editable>
        <HStack>
        <Editable defaultValue='Start Date (MM/YYYY) 'mt={1} ml={5} fontSize={15}>
            <EditablePreview />
            <EditableInput />
        </Editable>
            <Text fontSize={15}> - </Text>
        <Editable defaultValue='End Date (MM/YYYY)'mt={1} ml={5} fontSize={15}>
            <EditablePreview />
            <EditableInput />
        </Editable>
        </HStack>
  </Box>
    )
}

export default Certifications