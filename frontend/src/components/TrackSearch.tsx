import { useUnit } from "effector-react";
import { $trackSearchQuery, updateSearchQuery } from "../models/track";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const TrackSearch = () => {
  const searchValue = useUnit($trackSearchQuery);
  
  return (
    <InputGroup>
      <Input 
        value={searchValue}
        placeholder="Поиск по названию трека"
        onChange={(e) => updateSearchQuery(e.currentTarget.value)}
      />
      <InputRightElement>
        <SearchIcon />
      </InputRightElement>
    </InputGroup>
  );
}

export { TrackSearch };
