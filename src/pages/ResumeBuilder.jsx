import React, { useState, useRef } from "react";
import { Flex, Heading, Box, Text, Button, IconButton, HStack, VStack, Image, Center, Input} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import CreateResume from "./CreateResume";

function ResumeBuilder() {
  const inputRef = useRef(null);
  const [resume, setResume] = useState("");
  const navigate = useNavigate();

  const goToCreateResume = () => {
    navigate("/create-resume");
  }
 
  const handleResumeClick = () => {
    inputRef.current.click();
};

const uploadResume = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (file.type.startsWith('image/')) {
            setResume(file);
        } else {
            alert('Please select a valid image file');
        }
    }
};
  
  return (
    <Flex width={"100vw"} height={"70vh"} alignContent={"center"} justifyContent={"center"}>
          <Center>
            <VStack>
            <Heading>Free and Easy Online Resume Builder</Heading>
            <Text>Create your resume with Yapper Jobs free resume builder. Download it to your computer or use it to apply for any job here on yapper Jobs</Text>
            <Text>Or upload your existing resume here</Text>
            <HStack>
              <Button colorScheme='purple' onClick={handleResumeClick}>Upload Resume</Button>
                <Input
                  type="file"
                  ref={inputRef}
                  onChange={uploadResume}
                  display="none"
                  aria-hidden="true"
              />
              <Button colorScheme='purple' onClick={goToCreateResume}>Build Resume</Button>
            </HStack>
            </VStack>
          </Center>        
      </Flex>
  )
}

export default ResumeBuilder