import { Button, Input, Stack, Text, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { Field, Form } from "react-final-form";
import { isRequired } from "../shared/validators";
import { FileUploader } from "./FileUploader";

interface IAddTrackForm {
  onSubmit: () => void;
}

export type TrackFormData = {
  filename: string;
  fileId: string;
};

const AddTrackForm = (props: IAddTrackForm) => {
  const handleFormSubmit = () => {
    props.onSubmit();
  };

  return (
    <Form<TrackFormData> onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <Stack spacing={8}>
            <Field name="filename" validate={isRequired}>
              {({ meta, input }) => (
                <Stack spacing={2}>
                  <Text>
                    Название:
                  </Text>
                  <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </Stack>
              )}
            </Field>

            <Field name="file" validate={isRequired}>
              {({ input, meta }) => (
                <Stack spacing={2}>
                  <Text>
                    Аудиофайл:
                  </Text>
                  <FileUploader name={input.name} onChange={input.onChange} />
                </Stack>
              )}
            </Field>

            <Button colorScheme='teal' mr={3} size="sm" onClick={handleSubmit}>
              Загрузить
            </Button>
          </Stack>
        )}
      </Form>
  );
};

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
