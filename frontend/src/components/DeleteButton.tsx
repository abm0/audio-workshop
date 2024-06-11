import { DeleteIcon } from "@chakra-ui/icons";
import { Button, ButtonProps } from "@chakra-ui/react";
import { useState } from "react";
import { trackDeleteFx } from "../models/track.effects";
import { Track } from "../models/track.types";


interface IDeleteButton {
  trackId: Track['id'];
  size?: ButtonProps['size'];
}

const DeleteButton = (props: IDeleteButton) => {
  const { trackId, size = 'xs' } = props;
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    await trackDeleteFx({ id: trackId });
    setIsLoading(false);
  };

  return (
    <Button size={size} isLoading={isLoading} onClick={handleClick}>
      <DeleteIcon color="red.400" />
    </Button>
  );
}

export { DeleteButton };

