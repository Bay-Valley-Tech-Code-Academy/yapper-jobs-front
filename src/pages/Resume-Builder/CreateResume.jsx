import { Box, Text, Heading, Flex, VStack, HStack, Switch, FormControl,FormLabel,List, ListItem, Center, ChakraProvider, Checkbox, Button} from "@chakra-ui/react";
import React, {useState} from "react";
import { Reorder } from "framer-motion";
import ResumeSection from "./ResumeSection";
import { FocusLock } from "@chakra-ui/react";

function CreateResume() {
    const [section,setSection] = useState([
        "Name",
        "Personal Info",
        "Professional Summary",
        "Links",
        "Work Experience",
        "Skills",
        "Languages",
        "Education",
        "Certifications / Licenses",
    ]);
    const variants = {
        notDragging: {
          zIndex: 0,
          boxShadow: "none",
          background: "var(--chakra-colors-gray-100)",
        },
        dragging: {
          zIndex: 1,
          boxShadow: "var(--chakra-shadows-lg)",
          background: "var(--chakra-colors-purple-400)",
        },
      };
      
      return (
        <Flex>
          <VStack>
            <Box width={450} height={75}>
              <Text>Re-order the sections of your resume or toggle their visibility</Text>
            </Box>
          <List
            as={Reorder.Group}
            spacing={1}
            ml={5}
            axis="y"
            values={section}
            onReorder={setSection}
          >
            <Box width={450} height={75}>
            {section.map((item) => (
              <ListItem
                key={item}
                as={Reorder.Item}
                value={item}
                p={2}
                bg="gray.100"
                rounded="xl"
                dragTransition={{
                  bounceStiffness: 600,
                }}
                variants={variants}
                initial="notDragging"
                whileDrag="dragging"
                position="relative"
                cursor="move"
              >
                <ResumeSection section={item} />
                <HStack>
                <Switch></Switch>
                </HStack>
              </ListItem>   
            ))}
            </Box>
          </List>
      </VStack>
      <HStack>
            <Box height={500} width={300} bg={'grey'}>
              
            </Box>
            <Button>Download Resume</Button>
          </HStack>
      </Flex>
      );
}

export default CreateResume