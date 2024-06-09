import { Box, Button, Text } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-final-form';
import { TrackFormData } from './AddTrackForm';
import * as trackApi from '../api/track';
import { trimExtension } from '../shared/utils';

interface ITrackUploader {
  error?: string;
}

const TrackUploader = (props: ITrackUploader) => {
  const { error } = props;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  
  const formApi = useForm<TrackFormData>();

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file == null) return;
    
    formApi.resetFieldState('trackId');
    
    const formData = new FormData();
    formData.append('source_file', file);
    formData.append('title', file.name);
    
    const response = await trackApi.uploadTrack(formData);

    formApi.change('trackId', response.track_id);

    if (formApi.getState().values.title == null) {
      formApi.change('title', trimExtension(file.name));
    }
  };

  return (
    <Box>
      <Button colorScheme="teal" size="sm" onClick={() => fileInputRef.current?.click()}>Выбрать файл</Button>
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

export { TrackUploader as FileUploader };
