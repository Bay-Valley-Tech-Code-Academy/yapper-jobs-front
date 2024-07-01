import React, { useState } from 'react';
import {
  Box,
  Heading,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import CustomColorMode from '../../util/toggleColorMode';

// Initial application data
const initialApplications = [
  { id: 1, jobTitle: 'Software Engineer', applicantName: 'John Doe', status: 'Submitted' },
  { id: 2, jobTitle: 'Product Manager', applicantName: 'Jane Smith', status: 'Viewed' },
  { id: 3, jobTitle: 'UX Designer', applicantName: 'Alice Johnson', status: 'Declined' }
];

function Applications() {
  const { colors } = CustomColorMode();
  const [applications, setApplications] = useState(initialApplications);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Function to handle status change
  const handleStatusChange = (id, newStatus) => {
    setApplications((prevApplications) =>
      prevApplications.map((app) =>
        app.id === id ? { ...app, status: newStatus } : app
      )
    );
  };

  const handleViewApplication = (app) => {
    setSelectedApplication(app);
    onOpen();
  };

  return (
    <Box bg={colors.bgGradient} color={colors.textColor} minHeight="100vh" p={4}>
      <Flex justifyContent="center">
        <Box width="80%" mt={8} mb={16}>
          <Heading mb={8} textAlign="center">Applications</Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Job Title</Th>
                <Th>Applicant Name</Th>
                <Th>View Application</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {applications.map((app) => (
                <Tr key={app.id}>
                  <Td>{app.jobTitle}</Td>
                  <Td>{app.applicantName}</Td>
                  <Td>
                    <Button colorScheme="purple" onClick={() => handleViewApplication(app)}>View</Button>
                  </Td>
                  <Td>
                    <Select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                    >
                      <option value="Submitted">Accepted</option>
                      <option value="Declined">Declined</option>
                    </Select>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Application Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedApplication && (
              <>
                <p><strong>Job Title:</strong> {selectedApplication.jobTitle}</p>
                <p><strong>Applicant Name:</strong> {selectedApplication.applicantName}</p>
                <p><strong>Status:</strong> {selectedApplication.status}</p>
                {/* Add other application details as necessary */}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="purple" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Applications;
