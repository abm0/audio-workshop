import { Card, CardBody, CardHeader, Center, HStack, Heading, Stack, StackDivider, Text, VStack, Wrap } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { isEmpty, values } from "lodash";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { $songSearchQuery, $songs } from "../models/song";
import { AudioControls } from "./AudioControls";
import { DeleteButton } from "./DeleteButton";
import { useIsMobile } from "../shared/hooks";

const SongsList = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const songs = useUnit($songs);
  const searchValue = useUnit($songSearchQuery);

  const displayedSongs = useMemo(() => {
    const songsList = values(songs.byId);

    if (!isEmpty(searchValue)) {
      return songsList.filter((track) => track.title.includes(searchValue))
    }

    return songsList;
  }, [songs, searchValue]);

  if (isEmpty(songs.byId)) {
    return (
      <Center>
        <Text>
          {t('message__empty_tracks')}
        </Text>
      </Center>
    );
  }

  if (!isEmpty(songs.byId) && isEmpty(displayedSongs)) {
    return (
      <Center>
        <Text>
          {t('message__tracks_not_found')}
        </Text>
      </Center>
    );
  }

  const listElements = displayedSongs.map((song) => (
    <Card key={song.id} width={isMobile ? "auto" : "calc(50% - 0.25rem)"}>
      <Stack divider={<StackDivider />} spacing={2}>
        <CardHeader>
          <HStack justifyContent="space-between">
            <Heading size="md">{song.title}</Heading>
            <DeleteButton size="sm" songId={song.id} />
          </HStack>
        </CardHeader>
        <CardBody>
          <Stack spacing={2}>
            <HStack justifyContent="space-between">
              <Text size="xs">{t('tempo')}:</Text>
              <Text fontSize='sm' fontWeight="bold">
                {song.tempo}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text size="xs">{t('key')}:</Text>
              <Text fontSize='sm' fontWeight="bold">
                {t(song.key)}
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text size="xs">{t('source_track')}:</Text>
              <AudioControls tracks={song.source_tracks} />
            </HStack>
            <HStack justifyContent="space-between">
              <Text size="xs">{t('backing_track')}:</Text>
              <AudioControls tracks={song.backing_tracks} />
            </HStack>
            <HStack justifyContent="space-between">
              <Text size="xs">{t('vocals_track')}:</Text>
              <AudioControls tracks={song.vocals_tracks} />
            </HStack>
          </Stack>
        </CardBody>
      </Stack>
    </Card>
  ))
  
  
  
  if (isMobile) {
    return (
      <VStack gap={4} alignItems="stretch">
        {listElements}
      </VStack>
    );
  }

  return (
    <Wrap gap={4}>
      {listElements}
    </Wrap>
  )
}

export { SongsList };

