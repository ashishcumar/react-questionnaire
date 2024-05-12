import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

function ModalPreview() {
  return (
    <Modal isOpen={false} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          lorem ispum sdfdsf sdf sdfds adoasmd wkedwoc scowv wcop c
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={() => {}}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ModalPreview;
