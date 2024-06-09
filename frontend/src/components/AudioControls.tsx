import { HStack } from "@chakra-ui/react";
import { DownloadButton } from "./DownloadButton";
import { Player } from "./Player";

interface IAudioControls {
  src?: string;
}

const AudioControls = ({ src }: IAudioControls) => {
  if (src == null) return;
  
  return (
    <HStack gap={2}>
      <Player src={src} />
      <DownloadButton src={src} />
    </HStack>
  );
}

export { AudioControls };
