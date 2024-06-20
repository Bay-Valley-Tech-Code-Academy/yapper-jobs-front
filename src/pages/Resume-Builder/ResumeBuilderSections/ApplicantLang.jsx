import React from "react";
import { Box, Editable,EditableInput,EditablePreview, HStack } from "@chakra-ui/react";

function Language() {
    return (
        <Box>
            <HStack>
            <Editable defaultValue='Enter Language'mt={5} ml={5} fontSize={15}>
                <EditablePreview />
                <EditableInput />
            </Editable>
            <Editable defaultValue='Proficiency'mt={5} ml={5} fontSize={15}>
                <EditablePreview />
                <EditableInput />
            </Editable>
            </HStack>
      </Box>
    )
}

export default Language