import React from "react";
import { Box, Editable,EditableInput,EditablePreview, HStack } from "@chakra-ui/react";
  
function AppSkill() {
    return (
        <HStack>
            <Editable defaultValue='Skill'mt={1} mb={0} ml={5} fontSize={15}>
                <EditablePreview />
                <EditableInput />
            </Editable>
            <Editable defaultValue= 'Years of Experience' mt={1} mb={0} ml={5} fontSize={15}>
                <EditablePreview />
                <EditableInput />
            </Editable>
        </HStack>
    )
}

export default AppSkill