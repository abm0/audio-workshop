import { Button, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { AddTrackForm } from "./AddTrackForm";

const AddTrack = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={onOpen}>
        Загрузить трек
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Загрузить свой трек</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <AddTrackForm onSubmit={onClose} />
          </ModalBody>

          <ModalFooter>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export { AddTrack };
