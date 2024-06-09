import { useUnit } from "effector-react";
import { $trackSearchQuery, updateSearchQuery } from "../models/track";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useTranslation } from "react-i18next";

const TrackSearch = () => {
  const searchValue = useUnit($trackSearchQuery);

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

export { TrackSearch };
