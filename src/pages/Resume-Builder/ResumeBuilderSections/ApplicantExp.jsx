import React from "react";
import { Box, Editable,EditableInput,EditablePreview } from "@chakra-ui/react";

function WorkExperience() {
    return(
        <Box>
        <Editable defaultValue='Position'mt={1} ml={5} fontSize={15}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue='Company Name'mt={1} mb={0} ml={5} fontSize={15}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue='Location'mt={1} mb={0} ml={5} fontSize={15}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue='Job Description'mt={1} mb={0} ml={5} fontSize={15}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      </Box>
    )
}

export default WorkExperience