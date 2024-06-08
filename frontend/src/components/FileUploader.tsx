import { Box, Button } from '@chakra-ui/react';
import { ChangeEvent, useRef, useState } from 'react';
import { useForm } from 'react-final-form';
import { TrackFormData } from './AddTrack';

interface IFileUploader {
  name: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader = (props: IFileUploader) => {
  const { name, onChange } = props;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const formApi = useForm<TrackFormData>();

  const [fileId, setFileId] = useState('');

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file == null) return;
    
    formApi.change('filename', file.name);
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
        value={fileId}
        hidden
        onChange={onChange}
      />
    </Box>
  );
};

export { FileUploader };
