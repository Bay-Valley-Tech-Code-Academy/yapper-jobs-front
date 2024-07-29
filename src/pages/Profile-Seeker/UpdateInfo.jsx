import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  Box
} from "@chakra-ui/react";
import customColorMode from "../../../util/toggleColorMode";

function UpdateInfo() {
    const [modal, setModal] = useState(false);
    const { colorMode, toggleColorMode, colors } = customColorMode();
    
    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        if (modal) {
            document.body.classList.add('active-modal');
        } else {
            document.body.classList.remove('active-modal');
        }
    }, [modal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form data saved!");
        toggleModal(); // Close modal after saving
    };

    return (
        <>
            <div className="modal-btn-outside">
                <Button color={colors.buttonColor} bgColor={colors.buttonBgColor} onClick={toggleModal}>Edit Profile</Button>
            </div>
            <Modal isOpen={modal} onClose={toggleModal}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Profile</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <Box height={650} overflowY="auto">
                        <form onSubmit={handleSubmit}>
                            <FormControl>
                              <Text fontSize={20} textAlign="center">Intro</Text>
                                <FormLabel>First Name</FormLabel>
                                <Input type="text" name="firstname" placeholder="Your first name.." />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Last Name</FormLabel>
                                <Input type="text" name="lastname" placeholder="Your last name.." />
                            </FormControl>
                            <FormLabel>Residence</FormLabel>
                                <Input type="text" name="cityname" placeholder="City " />
                                <Input type="text" name="regionname" placeholder="Country/Region " />
                            <FormControl>
                                <FormLabel>Pronouns</FormLabel>
                                <Select name="pronouns" defaultValue="him">
                                    <option value="him">He / Him</option>
                                    <option value="her">She / Her</option>
                                    <option value="them">They /Them </option>
                                </Select>
                            </FormControl>
                            <FormControl>
                            <Text fontSize={20} textAlign="center">Experience</Text>
                                <FormLabel>Job Title</FormLabel>
                                <Input type="text" name="jobtitle" placeholder="Job Title" />
                                <FormLabel>Company</FormLabel>
                                <Input type="text" name="companyname" placeholder="Company Name" />
                            </FormControl>
                            <FormControl>
                            <Text fontSize={20} textAlign="center">Contact Info</Text>
                                <FormLabel>Email</FormLabel>
                                <Input type="text" name="email" placeholder="Email" />
                                <FormLabel>Phone Number</FormLabel>
                                <Input type="text" name="phone" placeholder="Phone Number" />
                                <FormLabel>LinkedIn</FormLabel>
                                <Input type="text" name="LinkedIn" placeholder="Profile URL"/>
                                <FormLabel>GitHub</FormLabel>
                                <Input type="text" name="GitHub" placeholder="Profile URL" />
                                <FormLabel>Website</FormLabel>
                                <Input type="text" name="phone" placeholder="Website URL" />
                                <FormLabel>Website Type</FormLabel>
                                <Select name="pronouns" defaultValue="personal">
                                    <option value="personal">Personal</option>
                                    <option value="company">Company</option>
                                    <option value="blog">Blog</option>
                                    <option value="portfolio">Portfolio</option>
                                    <option value="other">Other</option>
                                </Select>
                            </FormControl>
                        </form>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                    <Button colorScheme="purple" type="submit" onClick={toggleModal}>SAVE</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UpdateInfo;
