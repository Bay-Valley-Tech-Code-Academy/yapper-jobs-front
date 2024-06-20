import React from "react";
import { Box, Editable,EditableInput, EditablePreview } from "@chakra-ui/react";

function PersonalInfo () {
    return (
        <Box>
        <Editable defaultValue='Name'mt={5} ml={5} fontSize={25}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue='Location'mt={1} mb={0} ml={5} fontSize={15}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue='Phone Number'mt={1} mb={0} ml={5} fontSize={15}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      <Editable defaultValue='Email Address'mt={1} mb={0} ml={5} fontSize={15}>
        <EditablePreview />
        <EditableInput />
      </Editable>
      </Box>
    )
}

export default PersonalInfo