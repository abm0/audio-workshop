import { Button, Center, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { $tracks } from "../models/track";
import { isEmpty, values } from "lodash";
import { useEffect, useState } from "react";
import { trackDeleteFx, trackFetchListFx } from "../models/track.effects";
import { Track } from "../models/track.types";
import { DeleteIcon } from "@chakra-ui/icons";
import { Player } from "./Player";

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

  return <Button size="xs" isLoading={isLoading} onClick={handleClick}><DeleteIcon /></Button>;
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
        <Td>
          <Player src={track.source_file} />
        </Td>
        <Td />
        <Td />
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
