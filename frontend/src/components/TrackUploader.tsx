import { Box, Button } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-final-form';
import { TrackFormData } from './AddTrack';
import { uploadTrack } from '../api/uploadTrack';

interface ITrackUploader {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TrackUploader = (props: ITrackUploader) => {
  const { name, onChange } = props;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formApi = useForm<TrackFormData>();

  const [trackId, setTrackId] = useState('');

  const handleFileInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file == null) return;
    
    // formApi.change('filename', file.name);
    const formData = new FormData();
    formData.append('source_file', file);
    formData.append('title', file.name);
    
    const response = await uploadTrack(formData);

    console.log(response.track_id);

    setTrackId(response.track_id);
  };

  return (
    <Box>
      <Button colorScheme="teal" size="sm" onClick={() => fileInputRef.current?.click()}>Выбрать файл</Button>
      <input
        type="file"
        ref={fileInputRef}
        hidden
        onChange={handleFileInputChange}
      />
      <input
        type="text"
        name={name}
        value={trackId}
        hidden
        onChange={onChange}
      />
    </Box>
  );
};

export { TrackUploader as FileUploader };
