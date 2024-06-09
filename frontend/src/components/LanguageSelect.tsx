import { Select } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const LanguageSelect = () => {
  const { i18n } = useTranslation();
  
  return (
    <Select 
      size="sm"
      variant="filled"
      colorScheme="white"
      width="auto"
      value={i18n.language}
      onChange={(e) => i18n.changeLanguage(e.currentTarget.value)}
    >
      <option value='ru'>Рус</option>
      <option value='en'>Eng</option>
    </Select>
  );
}

export { LanguageSelect };
