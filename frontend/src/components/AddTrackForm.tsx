import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { Field, Form } from 'react-final-form';
import { isRequired } from '../shared/validators';
import { FileUploader } from './TrackUploader';
import { updateTrack } from '../api/updateTrack';
import { useUnit } from 'effector-react';
import { $user } from '../models/user';

interface IAddTrackForm {
  onSubmit: () => void;
}

export type TrackFormData = {
  title: string;
  trackId: string;
};

const AddTrackForm = (props: IAddTrackForm) => {
  const user = useUnit($user);
  
  const handleFormSubmit = async (values: TrackFormData) => {
    console.log(values);

    if (user == null) return;
    
    const response = updateTrack({
      id: values.trackId,
      userId: user.id,
      title: values.title
    });

    console.log(response);
    
    props.onSubmit();
  };

  return (
    <Form<TrackFormData> onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <Stack spacing={8}>
            <Field name="title" validate={isRequired}>
              {({ meta, input }) => (
                <Stack spacing={2}>
                  <Text>
                    Название:
                  </Text>
                  <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </Stack>
              )}
            </Field>

            <Field name="trackId" validate={isRequired}>
              {({ meta }) => (
                <Stack spacing={2}>
                  <Text>
                    Аудиофайл:
                  </Text>
                  <FileUploader error={meta.touched && meta.error} />
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

export { AddTrackForm };