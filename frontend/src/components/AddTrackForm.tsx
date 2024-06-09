import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { Field, Form } from 'react-final-form';
import { isRequired } from '../shared/validators';
import { FileUploader } from './TrackUploader';
import { useUnit } from 'effector-react';
import { $user } from '../models/user';
import { trackProcessFx } from '../models/track.effects';
import { useState } from 'react';

interface IAddTrackForm {
  onSubmit: () => void;
}

export type TrackFormData = {
  title: string;
  trackId: string;
};

const AddTrackForm = (props: IAddTrackForm) => {
  const user = useUnit($user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFormSubmit = async (values: TrackFormData) => {
    if (user == null) return;
    
    setIsSubmitting(true);
    
    await trackProcessFx({
      id: values.trackId,
      userId: user.id,
      title: values.title
    });

    setIsSubmitting(false);
    
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

            <Button loadingText="Идёт загрузка.." isLoading={isSubmitting} colorScheme='teal' mr={3} size="sm" onClick={handleSubmit}>
              Загрузить
            </Button>
          </Stack>
        )}
      </Form>
  );
};

export { AddTrackForm };
