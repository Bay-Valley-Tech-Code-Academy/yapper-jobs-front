import { Box, Text, Heading, Flex, VStack, HStack, Switch, FormControl,FormLabel,List, ListItem, Highlight, Center, ChakraProvider, Checkbox, Button,  Editable, EditableInput, EditableTextarea, EditablePreview, Input,} from "@chakra-ui/react";
import React, {useState} from "react";
import { Reorder } from "framer-motion";
import { FocusLock } from "@chakra-ui/react";
import jsPDF from "jspdf";


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

      // State variables for the applicant's information
      const [applicantName, setApplicantName] = useState("");
      const [applicantLocation, setApplicantLocation] = useState("");
      const [applicantEmail, setApplicantEmail] = useState("");
      const [applicantPhone, setApplicantPhone] = useState(""); 
      const [applicantExperience, setApplicantExperience] = useState([{jobTitle: "", company: "", location: "", startDate: "", endDate: "", description: ""}]);
      const [applicantEducation, setApplicantEducation] = useState([{degree: "", school: "", startDate: "", endDate: ""}]);
      const [applicantCertifications, setApplicantCertifications] = useState([{certification: "", organization: "",}]);
      const [ApplicantSkills, setApplicantSkills] = useState([{skill: "", years: ""}]);

      // Function to handle changes to the applicant's information
      const handleExperienceChange = (index, event) => {
        const {name, value} = event.target;
        let newExperience = [...applicantExperience];
        newExperience[index] = {...newExperience[index], [name]: value};
        setApplicantExperience(newExperience);
      };

      //Add a new job experience
      const addJobExperience = () => {
        setApplicantExperience([...applicantExperience, {jobTitle: "", company: "", location: "", startDate: "", endDate: "", description: ""}]);
      };
      //Add a new education
      const addEducation = () => {
        setApplicantEducation([...applicantEducation, {degree: "", school: "", startDate: "", endDate: ""}]);
      };
      //Add a new certification
      const addCertification = () => {
        setApplicantCertifications([...applicantCertifications, {certification: "", organization: ""}]);
      };
      //Add a new skill
      const addSkill = () => {
        setApplicantSkills([...ApplicantSkills, {skill: "", years: ""}]);
      };

      //Generate resume
      const DownloadResume = () => {
        // Create a new jsPDF instance
        let doc = new jsPDF("p", "pt");

        //Creates the header of the resume
        doc.setFontSize(20);
        doc.text(applicantName, 50, 50);
        
        doc.setFontSize(12);
        doc.text(applicantLocation, 50, 70);
        doc.text(applicantEmail, 50, 90);
        doc.text(applicantPhone, 50, 110);
        
        //Creates the sections of the resume

        //Work Experience section
        doc.setFontSize(20);
        doc.text("Work Experience", 50, 130);
        doc.line(40, 135, 550, 135);

        applicantExperience.forEach((experience) => {
        doc.text(experience.jobTitle, 50, 150);
        doc.text(experience.company, 50, 170);
        doc.text(experience.location, 50, 190);
        doc.text(experience.startDate + " - " + experience.endDate, 50, 210);
        doc.text(experience.description, 50, 230);
        });    

        doc.setFontSize(20);
        doc.text("Education", 50, 150);

        doc.setFontSize(20);
        doc.text("Certifications / Licenses", 50, 170);
        
        doc.setFontSize(20);
        doc.text("Skills", 50, 190);
        
        doc.setFontSize(20);
        doc.text("Languages", 50, 210);
        
        doc.save(`${applicantName}'s Yapper-Jobs-Resume.pdf`);
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
              <Box>
                <Input
                  placeholder="Name"
                  mt={5}
                  ml={5}
                  fontSize={25}
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                />
                <Input
                  placeholder="Location"
                  mt={1}
                  mb={0}
                  ml={5}
                  fontSize={15}
                  value={applicantLocation}
                  onChange={(e) => setApplicantLocation(e.target.value)}
                />
                <Input
                  placeholder="Phone Number"
                  mt={1}
                  mb={0}
                  ml={5}
                  fontSize={15}
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                />
                <Input
                  placeholder="Email Address"
                  mt={1}
                  mb={0}
                  ml={5}
                  fontSize={15}
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                />
              </Box>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Work Experience</Text>
              <Box>
                {applicantExperience.map((experience, index) => (
                  <Box key={index}>
                    <Input
                      placeholder="Job Title"
                      mt={1}
                      ml={5}
                      fontSize={15}
                      value={experience.jobTitle}
                      onChange={(event) => handleExperienceChange(index, event)}
                    />
                    <Input
                      placeholder="Company"
                      mt={1}
                      ml={5}
                      fontSize={15}
                      value={experience.company}
                      onChange={(event) => handleExperienceChange(index, event)} 
                      />
                    <Input
                      placeholder="Location"
                      mt={1}
                      ml={5}
                      fontSize={15}
                      value={experience.location}
                      onChange={(event) => handleExperienceChange(index, event)}
                    />
                    <HStack>
                      <Input
                        placeholder="Start Date (MM/YYYY)"
                        mt={1}
                        ml={5}
                        fontSize={15}
                        value={experience.startDate}
                        onChange={(event) => handleExperienceChange(index, event)}
                      />
                      <Text fontSize={15}> - </Text>
                      <Input
                        placeholder="End Date (MM/YYYY)"
                        mt={1}
                        ml={5}
                        fontSize={15}
                        value={experience.endDate}
                        onChange={(event) => handleExperienceChange(index, event)}
                      />
                    </HStack>
                    <Input
                      placeholder="Description"
                      mt={1}
                      ml={5}
                      fontSize={15}
                      value={experience.description}
                      onChange={(e) => handleExperienceChange(index, e)} 
                    />
                  </Box>
                ))}
              </Box>
              <Button ml={7} onClick={addJobExperience}>+ Add Work Experience</Button>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Education</Text>
              <Box>
                <Editable defaultValue='School' mt={1} ml={5} fontSize={15}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <Editable defaultValue='Degree' mt={1} ml={5} fontSize={15}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <Editable defaultValue='Field of Study' mt={1} ml={5} fontSize={15}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <Editable defaultValue='Location' mt={1} ml={5} fontSize={15}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <Editable defaultValue='Attendance' mt={1} ml={5} fontSize={15}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Box>
              <Button ml={7}>+ Add Education</Button>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Certifications / Licenses</Text>
              <Box>
                <Editable defaultValue='Certification' mt={1} ml={5} fontSize={15}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <HStack>
                  <Editable defaultValue='Start Date (MM/YYYY)' mt={1} ml={5} fontSize={15}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                  <Text fontSize={15}> - </Text>
                  <Editable defaultValue='End Date (MM/YYYY)' mt={1} ml={5} fontSize={15}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </HStack>
              </Box>
              <Button ml={7}>+ Add Certifications / Licenses</Button>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Skills</Text>
              <HStack>
                <Editable defaultValue='Skill' mt={1} mb={0} ml={5} fontSize={15}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <Editable defaultValue='Years of Experience' mt={1} mb={0} ml={5} fontSize={15}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </HStack>
              <Button ml={7}>+ Add Skill</Button>
              <Text as={'header'} ml={5} mt={5} fontSize={25}>Languages</Text>
              <Button ml={7}>+ Add Language</Button>
            </Box>
            <Button ml={400} mb={750} colorScheme="purple" onClick={DownloadResume}>Download Resume</Button>
          </HStack>
        </Flex>
      );
}      

export default CreateResume