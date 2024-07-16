import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  Text,
  ChakraProvider,
} from "@chakra-ui/react";

const DeleteAccount = () => {
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

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

    const handleDeleteAcc = async (e) => {
        e.preventDefault();
        console.log("Deleting Account");

        try {
            const response = await fetch('/delete-user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-Type': 'application/json'
                }
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const result = await response.json();
                if (response.ok) {
                    alert('Delete link sent to your email');
                    localStorage.removeItem("jwt");
                    localStorage.removeItem("savedJobs");
                    navigate('/');
                } else {
                    alert(`Error: ${result.error}`);
                }
            } else {
                const text = await response.text();
                console.error('Unexpected response:', text);
                alert('An unexpected error occurred. Please try again.');
            }
        } catch (error) {
            console.error('Error deleting account:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <ChakraProvider>
            <div className="modal-btn-outside">
                <Text fontSize={20} mt={4} textAlign="center">More</Text>
                <Button mt={4} colorScheme="red" onClick={toggleModal}>Delete Account</Button>
            </div>
            <Modal isOpen={modal} onClose={toggleModal} size="sm" isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Account?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={handleDeleteAcc}>
                            <FormControl>
                                <Text fontSize={20} mt={4} textAlign="left">Deleting your profile will remove all your personal data. We will send you an email to confirm your deletion.</Text>
                                <Button colorScheme='red' mt={4} type="submit">Delete</Button>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default DeleteAccount;
