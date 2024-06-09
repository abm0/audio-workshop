import { Button, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { AddTrackForm } from "./AddTrackForm";
import { useTranslation } from "react-i18next";

const AddTrack = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { t } = useTranslation();
  
  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={onOpen}>
        {t('upload_track')}
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{t('modal_title__upload_track')}</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <AddTrackForm onSubmit={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { AddTrack };
