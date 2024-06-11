import { Button, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { AddSongForm } from "./AddSongForm";
import { useTranslation } from "react-i18next";

const AddSong = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { t } = useTranslation();
  
  return (
    <>
      <Button colorScheme="teal" size="sm" onClick={onOpen}>
        {t('upload_track')}
      </Button>
      
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent paddingBottom={4}>
          <ModalHeader>{t('modal_title__upload_track')}</ModalHeader>
          <ModalCloseButton />
          
          <ModalBody>
            <AddSongForm onSubmit={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export { AddSong };
