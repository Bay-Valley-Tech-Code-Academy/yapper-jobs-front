// import { useState } from 'react';
// import {
//   Box,
//   Heading,
//   Flex,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Button,
//   Select,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure
// } from "@chakra-ui/react";
// import CustomColorMode from '../../util/toggleColorMode';

// // Initial application data
// const initialApplications = [
//   { id: 1, jobTitle: 'Software Engineer', applicantName: 'John Doe', status: 'Submitted' },
//   { id: 2, jobTitle: 'Product Manager', applicantName: 'Jane Smith', status: 'Viewed' },
//   { id: 3, jobTitle: 'UX Designer', applicantName: 'Alice Johnson', status: 'Declined' }
// ];

// function Applications() {
//   const { colors } = CustomColorMode();
//   const [applications, setApplications] = useState(initialApplications);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedApplication, setSelectedApplication] = useState(null);

//   // Function to handle status change
//   const handleStatusChange = (id, newStatus) => {
//     setApplications((prevApplications) =>
//       prevApplications.map((app) =>
//         app.id === id ? { ...app, status: newStatus } : app
//       )
//     );
//   };

//   const handleViewApplication = (app) => {
//     setSelectedApplication(app);
//     onOpen();
//   };

//   return (
//     <Box bg={colors.bgGradient} color={colors.textColor} minHeight="100vh" p={4}>
//       <Flex justifyContent="center">
//         <Box width="80%" mt={8} mb={16}>
//           <Heading mb={8} textAlign="center">Applications</Heading>
//           <Table variant="simple">
//             <Thead>
//               <Tr>
//                 <Th>Job Title</Th>
//                 <Th>Applicant Name</Th>
//                 <Th>View Application</Th>
//                 <Th>Status</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {applications.map((app) => (
//                 <Tr key={app.id}>
//                   <Td>{app.jobTitle}</Td>
//                   <Td>{app.applicantName}</Td>
//                   <Td>
//                     <Button colorScheme="purple" onClick={() => handleViewApplication(app)}>View</Button>
//                   </Td>
//                   <Td>
//                     <Select
//                       value={app.status}
//                       onChange={(e) => handleStatusChange(app.id, e.target.value)}
//                     >
//                       <option value="Submitted">Accepted</option>
//                       <option value="Declined">Declined</option>
//                     </Select>
//                   </Td>
//                 </Tr>
//               ))}
//             </Tbody>
//           </Table>
//         </Box>
//       </Flex>
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Application Details</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {selectedApplication && (
//               <>
//                 <p><strong>Job Title:</strong> {selectedApplication.jobTitle}</p>
//                 <p><strong>Applicant Name:</strong> {selectedApplication.applicantName}</p>
//                 <p><strong>Status:</strong> {selectedApplication.status}</p>
//                 {/* Add other application details as necessary */}
//               </>
//             )}
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="purple" mr={3} onClick={onClose}>
//               Close
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// }

// export default Applications

import { useState, useEffect } from 'react';
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
  useDisclosure,
  Divider
} from "@chakra-ui/react";
import CustomColorMode from '../../util/toggleColorMode';

// Remove initialApplications as it will be fetched from the backend
function Applications() {
  const { colors } = CustomColorMode();
  const [applications, setApplications] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedApplication, setSelectedApplication] = useState(null);

  // Function to fetch application data from the backend
  const fetchApplications = async () => {
    try {
      const response = await fetch('http://localhost:3000/job/applications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (data.success) {
        setApplications(data.apps);
      } else {
        console.error('Failed to fetch applications:', data.error);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

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
                  <Td>{app.title}</Td>
                  <Td>{app.first_name} {app.last_name}</Td>
                  <Td>
                    <Button colorScheme="purple" onClick={() => handleViewApplication(app)}>View</Button>
                  </Td>
                  <Td>
                    <Select
                      value={app.status}
                      onChange={(e) => handleStatusChange(app.id, e.target.value)}
                      style={{ 
                        color: app.status === 'Declined' ? 'gray' : 'inherit', 
                        fontStyle: app.status === 'Declined' ? 'italic' : 'normal' }}
                    >
                      <option value="Submitted">Submitted</option> {/* This was left out */}
                      <option value="Viewed">Viewed</option> {/* This was left out */}
                      <option value="Declined">Declined</option>
                      <option value="Accepted">Accepted</option>
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
          <ModalHeader textAlign="center">Application Details</ModalHeader>
          <Divider width="90%" mx="auto" mb="20px" />
          <ModalCloseButton />
          <ModalBody ml="10px">
            {selectedApplication && (
              <>
                <p><strong>Job Title:</strong> {selectedApplication.jobTitle}</p>
                <p><strong>Applicant Name:</strong> {selectedApplication.applicantName}</p>
                <p><strong>Status:</strong> <span style={{ color: selectedApplication.status === 'Declined' ? 'gray' : 'inherit', fontStyle: selectedApplication.status === 'Declined' ? 'italic' : 'normal' }}>{selectedApplication.status}</span></p>
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
