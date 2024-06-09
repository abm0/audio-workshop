import { Center, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { isEmpty, values } from "lodash";
import React, { useEffect, useMemo } from "react";
import { $trackSearchQuery, $tracks } from "../models/track";
import { trackFetchListFx } from "../models/track.effects";
import { getTrackUrl } from "../shared/utils";
import { AudioControls } from "./AudioControls";
import { DeleteButton } from "./DeleteButton";

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

const TracksList = () => {
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

  const renderBody = () => {
    if (isEmpty(tracks.byId)) {
      return (
        <EmptyRow>
          <Text>
            Вы пока не добавили ни одного трека
          </Text>
        </EmptyRow>
      );
    }

    if (!isEmpty(tracks.byId) && isEmpty(displayedTracks)) {
      return (
        <EmptyRow>
          <Text>
            Треков с таким названием не найдено
          </Text>
        </EmptyRow>
      );
    }

    return displayedTracks.map((track) => (
      <Tr key={track.id}>
        <Td>{track.title}</Td>
        <Td>{track.tempo}</Td>
        <Td>{track.key}</Td>
        <Td columnGap={4}>
          <AudioControls src={getTrackUrl(track.source_file)} />
        </Td>
        <Td>
          <AudioControls src={getTrackUrl(track.backing_track_file)} />
        </Td>
        <Td>
          <AudioControls src={getTrackUrl(track.vocals_file)} />
        </Td>
        <Td>
          <DeleteButton trackId={track.id} />
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
              Название
            </Th>
            <Th>
              Темп
            </Th>
            <Th>
              Тональность
            </Th>
            <Th>
              Оригинальная дорожка
            </Th>
            <Th>
              Минус
            </Th>
            <Th>
              Вокал
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

export { TracksList };

