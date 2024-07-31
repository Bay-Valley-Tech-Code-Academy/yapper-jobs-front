import { useState } from "react";
import { Reorder } from "framer-motion";
import jsPDF from "jspdf";
import CustomColorMode from "../../util/toggleColorMode";
import { 
  Box, 
  Text, 
  Flex, 
  VStack, 
  HStack, 
  Input, 
  Button, 
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';

function CreateResume() {
  const [section, setSection] = useState([
    "Work Experience",
    "Education",
    "Skills",
    "Certifications / Licenses",
    "Links",
    "Languages",
  ]);

  const [applicantName, setApplicantName] = useState("");
  const [applicantLocation, setApplicantLocation] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState(""); 
  const [applicantExperience, setApplicantExperience] = useState([{jobTitle: "", company: "", location: "", startDate: "", endDate: "", description: ""}]);
  const [applicantEducation, setApplicantEducation] = useState([{degree: "", school: "", startDate: "", endDate: ""}]);
  const [applicantCertifications, setApplicantCertifications] = useState([{certification: "", organization: ""}]);
  const [applicantSkills, setApplicantSkills] = useState([{skill: "", years: ""}]);
  const [applicantLanguages, setApplicantLanguages] = useState([{language: "", proficiency: ""}]);
  const { colors } = CustomColorMode();

  const handleInputChange = (setFunction, index, event) => {
    const { name, value } = event.target;
    setFunction(prevState => {
      const newState = [...prevState];
      newState[index] = { ...newState[index], [name]: value };
      return newState;
    });
  };

  const handleExperienceChange = (index, event) => handleInputChange(setApplicantExperience, index, event);
  const handleEducationChange = (index, event) => handleInputChange(setApplicantEducation, index, event);
  const handleCertificationChange = (index, event) => handleInputChange(setApplicantCertifications, index, event);
  const handleSkillChange = (index, event) => handleInputChange(setApplicantSkills, index, event);
  const handleLanguageChange = (index, event) => handleInputChange(setApplicantLanguages, index, event);

  const addItem = (setFunction, newItem) => {
    setFunction(prevState => [...prevState, newItem]);
  };

  const addJobExperience = () => addItem(setApplicantExperience, { jobTitle: "", company: "", location: "", startDate: "", endDate: "", description: "" });
  const addEducation = () => addItem(setApplicantEducation, { degree: "", school: "", startDate: "", endDate: "" });
  const addCertification = () => addItem(setApplicantCertifications, { certification: "", organization: "" });
  const addSkill = () => addItem(setApplicantSkills, { skill: "", years: "" });
  const addLanguage = () => addItem(setApplicantLanguages, { language: "", proficiency: "" });

  const removeItem = (setFunction, index) => {
    setFunction(prevState => prevState.filter((_, i) => i !== index));
  };

  const DownloadResume = () => {
    let doc = new jsPDF("p", "pt");
    doc.setFontSize(20);
    doc.text(applicantName, 50, 50);
    doc.setFontSize(12);
    doc.text(applicantLocation, 50, 70);
    doc.text(applicantEmail, 50, 90);
    doc.text(applicantPhone, 50, 110);
    doc.setFontSize(20);
    doc.text("Work Experience", 50, 130);
    doc.line(40, 135, 550, 135);

    applicantExperience.forEach((experience, index) => {
      const yOffset = 150 + index * 80;
      doc.text(experience.jobTitle, 50, yOffset);
      doc.text(experience.company, 50, yOffset + 20);
      doc.text(experience.location, 50, yOffset + 40);
      doc.text(experience.startDate + " - " + experience.endDate, 50, yOffset + 60);
      doc.text(experience.description, 50, yOffset + 80);
    });

    doc.save(`${applicantName}'s Yapper-Jobs-Resume.pdf`);
  };

  const handleSave = async () => {
    const resumeData = {
      summary: applicantName,
      education: applicantEducation,
      experience: applicantExperience,
      skill: applicantSkills,
      link: [], 
      publication: [], 
    };
  
    try {
      const response = await fetch('/resume/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      });
  
      const textResponse = await response.text();
      let jsonResponse;
      try {
        jsonResponse = JSON.parse(textResponse);
      } catch (jsonError) {
        console.error('Failed to parse JSON:', jsonError);
        jsonResponse = {};
      }
  
      if (response.ok) {
        console.log('Resume saved successfully:', jsonResponse);
      } else {
        console.error('Failed to save resume:', jsonResponse);
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  return (
    <Flex justify="center" align="center" minHeight="100vh">
      <Box width={800} bg={colors.pfSections} p={10} borderRadius="lg" boxShadow="md">
        <VStack spacing={5} align="stretch">
          <Text as={'header'} fontSize={45}>Build Resume</Text>
          <HStack spacing={4}>
            <Button colorScheme="purple" onClick={DownloadResume}>Download Resume</Button>
            <Button colorScheme="green" onClick={handleSave}>Save Resume</Button>
          </HStack>
          <Text as={'header'} fontSize={25}>Name</Text>
          <Input
            placeholder="Name"  
            width="full"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
          />
          <Input
            placeholder="Location"
            width="full"
            value={applicantLocation}
            onChange={(e) => setApplicantLocation(e.target.value)}
          />
          <Input
            placeholder="Phone Number"
            width="full"
            value={applicantPhone}
            onChange={(e) => setApplicantPhone(e.target.value)}
          />
          <Input
            placeholder="Email Address"
            width="full"
            value={applicantEmail}
            onChange={(e) => setApplicantEmail(e.target.value)}
          />
          <Text as={'header'} fontSize={25}>Work Experience</Text>
          {applicantExperience.map((experience, index) => (
            <Box key={index} p={2} borderRadius="md">
              <Input
                placeholder="Job Title"
                name="jobTitle"
                width="full"
                value={experience.jobTitle}
                onChange={(event) => handleExperienceChange(index, event)}
              />
              <Input
                placeholder="Company"
                name="company"
                width="full"
                mt={3}
                value={experience.company}
                onChange={(event) => handleExperienceChange(index, event)} 
              />
              <Input
                placeholder="Location"
                name="location"
                width="full"
                mt={3}
                value={experience.location}
                onChange={(event) => handleExperienceChange(index, event)}
              />
              <HStack>
                <Input
                  type="date"
                  name="startDate"
                  width="full"
                  mt={3}
                  value={experience.startDate}
                  onChange={(event) => handleExperienceChange(index, event)}
                />
                <Text>to</Text>
                <Input
                  type="date"
                  name="endDate"
                  width="full"
                  mt={3}
                  value={experience.endDate}
                  onChange={(event) => handleExperienceChange(index, event)}
                />
              </HStack>
              <Input
                placeholder="Description"
                name="description"
                width="full"
                mt={3}
                value={experience.description}
                onChange={(event) => handleExperienceChange(index, event)} 
              />
              <IconButton
                aria-label="Delete experience"
                icon={<DeleteIcon />}
                mt={3}
                onClick={() => removeItem(setApplicantExperience, index)}
              />
            </Box>
          ))}
          <Button colorScheme='purple' onClick={addJobExperience}>+ Add Work Experience</Button>
          <Text as={'header'} fontSize={25}>Education</Text>
          {applicantEducation.map((education, index) => (
            <Box key={index} p={2} borderRadius="md">
              <Input
                placeholder="Degree"
                name="degree"
                width="full"
                value={education.degree}
                onChange={(event) => handleEducationChange(index, event)}
              />
              <Input
                placeholder="School"
                name="school"
                width="full"
                mt={3}
                value={education.school}
                onChange={(event) => handleEducationChange(index, event)} 
              />
              <HStack mt={3}>
                <Input
                  type="date"
                  name="startDate"
                  width="full"
                  value={education.startDate}
                  onChange={(event) => handleEducationChange(index, event)}
                />
                <Text>to</Text>
                <Input
                  type="date"
                  name="endDate"
                  width="full"
                  value={education.endDate}
                  onChange={(event) => handleEducationChange(index, event)}
                />
              </HStack>
              <IconButton
                aria-label="Delete education"
                icon={<DeleteIcon />}
                mt={3}
                onClick={() => removeItem(setApplicantEducation, index)}
              />
            </Box>
          ))}
          <Button colorScheme='purple' onClick={addEducation}>+ Add Education</Button>
          <Text as={'header'} fontSize={25}>Certifications / Licenses</Text>
          {applicantCertifications.map((certification, index) => (
            <Box key={index} p={2} borderRadius="md">
              <Input
                placeholder="Certification"
                name="certification"
                width="full"
                value={certification.certification}
                onChange={(event) => handleCertificationChange(index, event)}
              />
              <Input
                placeholder="Organization"
                name="organization"
                width="full"
                mt={3}
                value={certification.organization}
                onChange={(event) => handleCertificationChange(index, event)} 
              />
              <IconButton
                aria-label="Delete certification"
                icon={<DeleteIcon />}
                mt={3}
                onClick={() => removeItem(setApplicantCertifications, index)}
              />
            </Box>
          ))}
          <Button colorScheme='purple' onClick={addCertification}>+ Add Certification</Button>
          <Text as={'header'} fontSize={25}>Skills</Text>
          {applicantSkills.map((skill, index) => (
            <Box key={index} p={2} borderRadius="md">
              <Input
                placeholder="Skill"
                name="skill"
                width="full"
                value={skill.skill}
                onChange={(event) => handleSkillChange(index, event)}
              />
              <IconButton
                aria-label="Delete skill"
                icon={<DeleteIcon />}
                mt={3}
                onClick={() => removeItem(setApplicantSkills, index)}
              />
            </Box>
          ))}
          <Button colorScheme='purple' onClick={addSkill}>+ Add Skill</Button>
          <Text as={'header'} fontSize={25}>Languages</Text>
          {applicantLanguages.map((language, index) => (
            <Box key={index} p={2} borderRadius="md">
              <Input
                placeholder="Language"
                name="language"
                width="full"
                value={language.language}
                onChange={(event) => handleLanguageChange(index, event)}
              />
              <IconButton
                aria-label="Delete language"
                icon={<DeleteIcon />}
                mt={3}
                onClick={() => removeItem(setApplicantLanguages, index)}
              />
            </Box>
          ))}
          <Button colorScheme='purple' onClick={addLanguage}>+ Add Language</Button>
        </VStack>
      </Box>
    </Flex>
  );
}

export default CreateResume;
