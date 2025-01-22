import React from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
    Text,
} from "@chakra-ui/react";

interface ModalDeleteProps {
    slug: string
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}

const ModalDelete: React.FC<ModalDeleteProps> = ({
    isOpen,
    onClose,
    onConfirm,
}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Are you sure you want to delete this news?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text>
                        This action cannot be undone, and the news will be permanently
                        removed.
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button variant="ghost" onClick={onClose} mr={3}>
                        Cancel
                    </Button>
                    <Button colorScheme="red" onClick={onConfirm}>
                        Yes, Delete
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default ModalDelete;
