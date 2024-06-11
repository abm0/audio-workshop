import { Box, Card, CardBody, CardHeader, Center, HStack, Heading, Stack, StackDivider, Tbody, Text, VStack } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { isEmpty, values } from "lodash";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { $trackSearchQuery, $tracks } from "../models/track";
import { trackFetchListFx } from "../models/track.effects";
import { getTrackUrl } from "../shared/utils";
import { AudioControls } from "./AudioControls";
import { DeleteButton } from "./DeleteButton";

const TracksListMobile = () => {
  const { t } = useTranslation();

  const tracks = useUnit($tracks);
  const searchValue = useUnit($trackSearchQuery);

  useEffect(() => {
    trackFetchListFx();
  }, []);

  const displayedTracks = useMemo(() => {
    const tracksList = values(tracks.byId);

    if (!isEmpty(searchValue)) {
      return tracksList.filter((track) => track.title.includes(searchValue))
    }

    return tracksList;
  }, [tracks, searchValue]);

  if (isEmpty(tracks.byId)) {
    return (
      <Center>
        <Text>
          {t('message__empty_tracks')}
        </Text>
      </Center>
    );
  }

  if (!isEmpty(tracks.byId) && isEmpty(displayedTracks)) {
    return (
      <Center>
        <Text>
          {t('message__tracks_not_found')}
        </Text>
      </Center>
    );
  }

  return (
    <VStack gap={4} alignItems="stretch">
      {displayedTracks.map((track) => (
        <Card key={track.id}>
          <Stack divider={<StackDivider />} spacing={2}>
            <CardHeader>
              <HStack justifyContent="space-between">
                <Heading size="md">{track.title}</Heading>
                <DeleteButton size="sm" trackId={track.id} />
              </HStack>
            </CardHeader>
            <CardBody>
              <Stack spacing={2}>
                <HStack justifyContent="space-between">
                  <Text size="xs">{t('tempo')}:</Text>
                  <Text fontSize='sm' fontWeight="bold">
                    {track.tempo}
                  </Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text size="xs">{t('key')}:</Text>
                  <Text fontSize='sm' fontWeight="bold">
                    {track.key}
                  </Text>
                </HStack>
                <HStack justifyContent="space-between">
                  <Text size="xs">{t('source_track')}:</Text>
                  <AudioControls src={getTrackUrl(track.source_file)} />
                </HStack>
                <HStack justifyContent="space-between">
                  <Text size="xs">{t('backing_track')}:</Text>
                  <AudioControls src={getTrackUrl(track.backing_track_file)} />
                </HStack>
                <HStack justifyContent="space-between">
                  <Text size="xs">{t('vocals_track')}:</Text>
                  <AudioControls src={getTrackUrl(track.vocals_file)} />
                </HStack>
              </Stack>
            </CardBody>
          </Stack>
        </Card>
      ))}
    </VStack>
  );
}

export { TracksListMobile };

