import { Center, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { isEmpty, values } from "lodash";
import React, { useMemo } from "react";
import { $songSearchQuery, $songs } from "../models/song";
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
        <Td>{t(song.key)}</Td>
        <Td columnGap={4}>
          <AudioControls tracks={song.source_tracks} />
        </Td>
        <Td>
          <AudioControls tracks={song.backing_tracks} />
        </Td>
        <Td>
          <AudioControls tracks={song.vocals_tracks} />
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

