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

function UpdateEmployerInfo() {
    const [modal, setModal] = useState(false);
    
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
                <Button colorScheme="purple" onClick={toggleModal}>Edit Profile</Button>
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
                              <Text fontSize={20} textAlign="center"> Company Intro</Text>
                                <FormLabel>Company Name</FormLabel>
                                <Input type="text" name="co-name" placeholder="Company Name" />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Industry</FormLabel>
                                <Input type="text" name="industry" placeholder="Industry" />
                            </FormControl>
                            <FormLabel>Location</FormLabel>
                                <Input type="text" name="co-region" placeholder="City/Region" />
                                <Input type="text" name="co-country" placeholder="Country" />
                            <FormControl>
                                <FormLabel>Company Size</FormLabel>
                                <Select name="co-size" defaultValue="Startup">
                                    <option value="Startup"> Less than 12 </option>
                                    <option value="Small">13 - 50</option>
                                    <option value="Midsize">51 - 100</option>
                                    <option value="Large">101 - 1000</option>
                                    <option value="X-Large">More than 1000</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                            <Text fontSize={20} textAlign="center">Contact Info</Text>
                                <FormLabel>Email</FormLabel>
                                <Input type="text" name="email" placeholder="Email" />
                                <FormLabel>Phone Number</FormLabel>
                                <Input type="text" name="phone" placeholder="Phone Number" />
                                <FormLabel>LinkedIn</FormLabel>
                                <Input type="text" name="LinkedIn" placeholder="Profile URL"/>
                                <FormLabel>Website</FormLabel>
                                <Input type="text" name="phone" placeholder="Website URL" />
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

export default UpdateEmployerInfo;
