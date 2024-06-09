import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useState } from "react";
import { trackDeleteFx } from "../models/track.effects";
import { Track } from "../models/track.types";


interface IDeleteButton {
  trackId: Track['id'];
}

const DeleteButton = (props: IDeleteButton) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    setIsLoading(true);
    await trackDeleteFx({ id: props.trackId });
    setIsLoading(false);
  };

  return (
    <Button size="xs" isLoading={isLoading} onClick={handleClick}>
      <DeleteIcon color="red.400" />
    </Button>
  );
}

export { DeleteButton };

