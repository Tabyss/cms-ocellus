import React from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
} from "@chakra-ui/react";

interface NewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  isActive: boolean;
}

const ModalActivate: React.FC<NewsModalProps> = ({ isOpen, onClose, onConfirm, isActive }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Are you sure you want to {isActive ? "activate" : "inactivate"} this news?
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            This news will {isActive ? "appear" : "no longer appear"} on the landing page.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={onClose} mr={3}>
            Cancel
          </Button>
          <Button
            colorScheme={isActive ? "blue" : "red"}
            onClick={() => {
            //   onConfirm();
              onClose();
            }}
          >
            {isActive ? "Activate news" : "Inactivate news"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalActivate;
