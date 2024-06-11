import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { LANGUAGE_LS_KEY } from "../shared/constants";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  
  const handleChange = (nextLng: string) => {
    i18n.changeLanguage(nextLng);
    localStorage.setItem(LANGUAGE_LS_KEY, nextLng)
  };
  
  return (
    <Select
      size="sm"
      variant="filled"
      colorScheme="white"
      width="auto"
      value={i18n.language}
      onChange={(e) => handleChange(e.currentTarget.value)}
    >
      <option value='ru'>Рус</option>
      <option value='en'>Eng</option>
    </Select>
  );
}

export { LanguageSelect };
