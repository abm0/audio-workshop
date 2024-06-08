import { Button, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Wrap } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { $tracks } from "../models/track";
import { isEmpty, values } from "lodash";
import { useEffect, useState } from "react";
import { trackDeleteFx, trackFetchListFx } from "../models/track.effects";
import { Track } from "../models/track.types";
import { DeleteIcon } from "@chakra-ui/icons";

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

  if (isEmpty(tracks.byId)) {
    return (
      <Text>
        Вы пока не добавили ни одного трека
      </Text>
    );
  }

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
          {values(tracks.byId).map((track) => (
            <Tr>
              <Td>{track.title}</Td>
              <Td />
              <Td />
              <Td />
              <Td />
              <Td>
                <DeleteButton trackId={track.id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export { TracksList };
