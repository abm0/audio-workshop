import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { Field, Form } from 'react-final-form';
import { isRequired } from '../shared/validators';
import { FileUploader } from './FileUploader';
import { useUnit } from 'effector-react';
import { $profile } from '../models/user';
import { uploadSongFx } from '../models/song.effects';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';

interface IAddSongForm {
  onSubmit: () => void;
}

export type SongFormData = {
  title: string;
  sourceFile: string | Blob;
};

const AddSongForm = (props: IAddSongForm) => {
  const { t } = useTranslation();
  
  const toast = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFormSubmit = async (values: SongFormData) => {    
    setIsSubmitting(true);
    
    try {
      await uploadSongFx(values);

      setIsSubmitting(false);
      
      toast({
        title: t('success'),
        description: t('message__file_uploaded'),
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      
      props.onSubmit();
    } catch (e) {
      setIsSubmitting(false);

      toast({
        title: t('something_wrong'),
        description: t('message__file_upload_failed'),
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
