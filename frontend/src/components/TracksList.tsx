import { DeleteIcon } from "@chakra-ui/icons";
import { Button, Center, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { isEmpty, values } from "lodash";
import { useEffect, useState } from "react";
import { $tracks } from "../models/track";
import { trackDeleteFx, trackFetchListFx } from "../models/track.effects";
import { Track } from "../models/track.types";
import { getTrackUrl } from "../shared/utils";
import { AudioControls } from "./AudioControls";

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

const TracksList = () => {
  const tracks = useUnit($tracks);

  useEffect(() => {
    trackFetchListFx();
  }, []);

  

  const renderBody = () => {
    if (isEmpty(tracks.byId)) {
      return (
        <Tr>
          <Td colSpan={7}>
            <Center>
              <Text>
                Вы пока не добавили ни одного трека
              </Text>
            </Center>
          </Td>
        </Tr>
      );
    }
    return values(tracks.byId).map((track) => (
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

