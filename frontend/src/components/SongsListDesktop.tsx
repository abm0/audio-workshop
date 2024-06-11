import { Center, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { isEmpty, values } from "lodash";
import React, { useEffect, useMemo } from "react";
import { $songSearchQuery, $songs } from "../models/song";
import { songsFetchFx } from "../models/song.effects";
import { getSongUrl } from "../shared/utils";
import { AudioControls } from "./AudioControls";
import { DeleteButton } from "./DeleteButton";
import { useTranslation } from "react-i18next";

interface IEmptyRow {
  children: React.ReactNode;
}

const EmptyRow = ({ children }: IEmptyRow) => (
  <Tr>
    <Td colSpan={7}>
      <Center>
        {children}
      </Center>
    </Td>
  </Tr>
);

const SongsListDesktop = () => {
  const { t } = useTranslation();
  
  const songs = useUnit($songs);
  const searchValue = useUnit($songSearchQuery);

  useEffect(() => {
    songsFetchFx();
  }, []);

  const displayedSongs = useMemo(() => {
    const songsList = values(songs.byId);
    
    if (!isEmpty(searchValue)) {
      return songsList.filter((song) => song.title.includes(searchValue))
    }

    return songsList;
  }, [songs, searchValue]);

  const renderBody = () => {
    if (isEmpty(songs.byId)) {
      return (
        <EmptyRow>
          <Text>
            {t('message__empty_tracks')}
          </Text>
        </EmptyRow>
      );
    }

    if (!isEmpty(songs.byId) && isEmpty(displayedSongs)) {
      return (
        <EmptyRow>
          <Text>
            {t('message__tracks_not_found')}
          </Text>
        </EmptyRow>
      );
    }

    return displayedSongs.map((song) => (
      <Tr key={song.id}>
        <Td>{song.title}</Td>
        <Td>{song.tempo}</Td>
        <Td>{song.key}</Td>
        <Td columnGap={4}>
          <AudioControls src={getSongUrl(song.source_track)} />
        </Td>
        <Td>
          <AudioControls src={getSongUrl(song.backing_track)} />
        </Td>
        <Td>
          <AudioControls src={getSongUrl(song.vocals_track)} />
        </Td>
        <Td>
          <DeleteButton songId={song.id} />
        </Td>
      </Tr>
    ))
  };

  return (
    <TableContainer>
      <Table>
        <Thead>
          <Tr>
            <Th>
              {t('title')}
            </Th>
            <Th>
              {t('tempo')}
            </Th>
            <Th>
              {t('key')}
            </Th>
            <Th>
              {t('source_track')}
            </Th>
            <Th>
              {t('backing_track')}
            </Th>
            <Th>
              {t('vocals_track')}
            </Th>
            <Th />
          </Tr>
        </Thead>
        <Tbody>
          {renderBody()}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export { SongsListDesktop };

