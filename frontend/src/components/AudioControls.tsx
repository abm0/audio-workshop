import { HStack } from "@chakra-ui/react";
import { DownloadButton } from "./DownloadButton";
import { Player } from "./Player";
import { Track } from "../models/song.types";
import { useMemo } from "react";
import { isEmpty } from "lodash";
import { ApiPathNames, apiPaths } from "../shared/constants";
import { useIsMobile } from "../shared/hooks";


export const getSongUrl = (songPath: string) => 
  `${apiPaths.getPath(ApiPathNames.MEDIA)}${songPath}`;

interface IAudioControls {
  tracks: Track[];
  src?: string;
}

const AudioControls = ({ tracks }: IAudioControls) => {
  const isMobile = useIsMobile();
  
  const mp3Track = useMemo(() => {
    return tracks?.find((track) => track.extension === 'mp3')
  }, [tracks])
  
  if (tracks == null) return;
  
  if (isMobile) {
    return (
      <HStack gap={2}>
        {tracks.map((track) => (
          <DownloadButton key={track.type + track.extension} src={getSongUrl(track.file)} extension={track.extension} />
        ))}
        {!isEmpty(mp3Track) && (
          <Player src={getSongUrl(mp3Track.file)} />
        )}
      </HStack>
    );
  }
  
  return (
    <HStack gap={2}>
      {!isEmpty(mp3Track) && (
        <Player src={getSongUrl(mp3Track.file)} />
      )}
      {tracks.map((track) => (
        <DownloadButton key={track.type + track.extension} src={getSongUrl(track.file)} extension={track.extension} />
      ))}
    </HStack>
  );
}

export { AudioControls };
