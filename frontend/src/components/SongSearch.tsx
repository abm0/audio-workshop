import { useUnit } from "effector-react";
import { $songSearchQuery, updateSearchQuery } from "../models/song";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

const SongSearch = () => {
  const searchValue = useUnit($songSearchQuery);

  const { t } = useTranslation();
  
  return (
    <InputGroup>
      <Input 
        value={searchValue}
        placeholder={t('placeholder__track_search')}
        onChange={(e) => updateSearchQuery(e.currentTarget.value)}
      />
      <InputRightElement>
        <SearchIcon />
      </InputRightElement>
    </InputGroup>
  );
}

export { SongSearch };
