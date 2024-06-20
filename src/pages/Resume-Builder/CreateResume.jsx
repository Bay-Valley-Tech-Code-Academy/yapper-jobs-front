import { Box, Text, Heading, Flex, VStack, HStack, Switch, FormControl,FormLabel,List, ListItem, Highlight, Center, ChakraProvider, Checkbox, Button,  Editable, EditableInput, EditableTextarea, EditablePreview,} from "@chakra-ui/react";
import React, {useState} from "react";
import { Reorder } from "framer-motion";
import { FocusLock } from "@chakra-ui/react";

import ResumeSection from "./ResumeSection";
import PersonalInfo from "./ResumeBuilderSections/ApplicantInfo";
import WorkExperience from "./ResumeBuilderSections/ApplicantExp";
import Language from "./ResumeBuilderSections/ApplicantLang";
import Certifications from "./ResumeBuilderSections/ApplicantCert";
import Education from "./ResumeBuilderSections/ApplicantEducation";
import AppSkill from "./ResumeBuilderSections/ApplicantSkill";

function CreateResume() {
    const [section,setSection] = useState([
        "Work Experience",
        "Education",
        "Skills",
        "Certifications / Licenses",
        "Links",
        "Languages",
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
            <Box height={800} width={600} bg={'#EDF2F7'} mt={50} ml={250} overflow={'scroll'}>
              <PersonalInfo/>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Work Experience</Text>
              <WorkExperience/>
              <Button ml={7}> + Add Work Experience</Button>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Education</Text>
              <Education/>
              <Button ml={7}> + Add Education</Button>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Certifications / Licenses </Text>
              <Certifications/>
              <Button ml={7}> + Add Certifications / Licenses</Button>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Languages</Text>
              <Language/>
              <Button ml={7}> + Add Language </Button>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Skills</Text>
              <AppSkill/>
              <Button ml={7}> + Add Skill </Button>
            </Box>
            <Button ml={400} mb={750} colorScheme="purple">Download Resume</Button>
          </HStack>
      </Flex>
      );
}

export default CreateResume