import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { Field, Form } from 'react-final-form';
import { isRequired } from '../shared/validators';
import { FileUploader } from './FileUploader';
import { useUnit } from 'effector-react';
import { $profile } from '../models/user';
import { songUploadFx } from '../models/song.effects';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';

interface IAddTrackForm {
  onSubmit: () => void;
}

export type SongFormData = {
  title: string;
  sourceFile: string | Blob;
};

const AddSongForm = (props: IAddTrackForm) => {
  const { t } = useTranslation();
  
  const toast = useToast()

  const profile = useUnit($profile);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFormSubmit = async (values: SongFormData) => {
    if (profile == null) return;
    
    setIsSubmitting(true);
    
    try {
      await songUploadFx(values);

      setIsSubmitting(false);
      
      props.onSubmit();
    } catch (e) {
      setIsSubmitting(false);

      toast({
        title: 'Что то пошло не так',
        description: "При загрузке трека произошла ошибка",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Form<SongFormData> onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <Stack spacing={8}>
            <Field name="title" validate={isRequired}>
              {({ meta, input }) => (
                <Stack spacing={2}>
                  <Text>
                    {t('title')}:
                  </Text>
                  <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </Stack>
              )}
            </Field>

            <Field name="sourceFile">
              {({ meta }) => (
                <Stack spacing={2}>
                  <Text>
                    {t('audio_file')}:
                  </Text>
                  <FileUploader error={meta.touched && meta.error} />
                </Stack>
              )}
            </Field>

            <Button loadingText={`${t('message__analysis_in_progess')}...`} isLoading={isSubmitting} colorScheme='teal' mr={3} size="sm" onClick={handleSubmit}>
              {t('upload')}
            </Button>
          </Stack>
        )}
      </Form>
  );
};

export { AddSongForm };
