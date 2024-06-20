import React from "react";
import { Box, Editable,EditableInput,EditablePreview } from "@chakra-ui/react";

function Education() {
    return (
        <Box>
        <Editable defaultValue='School'mt={1} ml={5} fontSize={15}>
            <EditablePreview />
            <EditableInput />
        </Editable>
        <Editable defaultValue='Degree'mt={1} ml={5} fontSize={15}>
            <EditablePreview />
            <EditableInput />
        </Editable>
        <Editable defaultValue='Field of Study'mt={1} ml={5} fontSize={15}>
            <EditablePreview />
            <EditableInput />
        </Editable>
        <Editable defaultValue='Location'mt={1} ml={5} fontSize={15}>
            <EditablePreview />
            <EditableInput />
        </Editable>
        <Editable defaultValue='Attendance'mt={1} ml={5} fontSize={15}>
            <EditablePreview />
            <EditableInput />
        </Editable>
  </Box>
    )
}

export default Education