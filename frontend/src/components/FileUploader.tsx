import { Box, Button, Text } from '@chakra-ui/react';
import { ChangeEvent, useRef } from 'react';
import { useForm } from 'react-final-form';
import { SongFormData } from './AddSongForm';
import { trimExtension } from '../shared/utils';
import { useTranslation } from 'react-i18next';

interface ISongsUploader {
  error?: string;
}

const FileUploader = (props: ISongsUploader) => {
  const { error } = props;

  const { t } = useTranslation();

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const formApi = useForm<SongFormData>();

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file == null) return;
    
    formApi.resetFieldState('sourceFile');
    
    formApi.change('sourceFile', file);

    if (formApi.getState().values.title == null) {
      formApi.change('title', trimExtension(file.name));
    }
  };

  return (
    <Box>
      <Button 
        colorScheme="teal"
        size="sm"
        onClick={() => fileInputRef.current?.click()}
      >
        {t('select_file')}
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept=".mp3,.wav"
        onChange={handleFileInputChange}
      />
      <Text size="xs" color="red" hidden={error == null}>
        {error}
      </Text>
    </Box>
  );
};

export { FileUploader };
