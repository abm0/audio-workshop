import { DeleteIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useState } from "react";
import { deleteSongFx } from "../models/song.effects";
import { Song } from "../models/song.types";


interface IDeleteButton {
  songId: Song['id'];
  size?: ButtonProps['size'];
}

const DeleteButton = (props: IDeleteButton) => {
  const { songId, size = 'xs' } = props;
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    await deleteSongFx({ id: songId });
    setIsLoading(false);
  };

  return (
    <Button size={size} isLoading={isLoading} onClick={handleClick}>
      <DeleteIcon color="red.400" />
    </Button>
  );
}

export { DeleteButton };

