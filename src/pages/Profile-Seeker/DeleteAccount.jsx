import { useState, useEffect } from "react";
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
  ChakraProvider
} from "@chakra-ui/react";

const DeleteAccount = () => {
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

    const handleDeleteAcc = async (e) => {
        e.preventDefault();
        console.log("Deleting Account");
         try {
            const res = await fetch("/", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if(!res.ok) {
                throw new Error("Failed to delete account");
            }
         } catch(err) {
            console.err("Error deleting account", err);
         }
        toggleModal();
    };
    
    return (
        <ChakraProvider>
            <div className="modal-btn-outside">
                <Text fontSize={20} mt={4} textAlign="center">More</Text>
                <Button mt={4} colorScheme="red" onClick={toggleModal}>Delete Account</Button>
            </div>
            <Modal isOpen={modal} onClose={toggleModal} size="sm">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Account?</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form>
                            <FormControl>
                                <Text fontSize={20} mt={4} textAlign="left">Deleting your profile will remove all your personal data. This cannot be undone.</Text>
                                <Button colorScheme='red' mt={4} onSubmit={handleDeleteAcc}>Delete</Button>
                            </FormControl>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </ChakraProvider>
    );
};

export default DeleteAccount;
