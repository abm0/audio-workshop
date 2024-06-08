import { Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr, Wrap } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { $tracks } from "../models/track";
import { isEmpty, values } from "lodash";
import { useEffect } from "react";
import { fetchTracksListFx } from "../models/track.effects";

const TracksList = () => {
  const tracks = useUnit($tracks);


  console.log(tracks);
  
  useEffect(() => {
    fetchTracksListFx();
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
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export { TracksList };
