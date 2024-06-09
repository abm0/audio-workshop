import { Button, HStack, Heading, Image, Text } from "@chakra-ui/react";
import { $isAuthenticated, logout } from "../models/auth";
import { useUnit } from "effector-react";
import logo from '../assets/logo.svg';
import { $user } from "../models/user";
import { LanguageSelect } from "./LanguageSelect";
import { useTranslation } from "react-i18next";

const Header = () => {
  const isAuthenticated = useUnit($isAuthenticated);
  const user = useUnit($user);

  const { t } = useTranslation();
  
  return (
    <HStack justify="space-between">
        <HStack>
          <Image src={logo} backgroundColor="#f36834" borderRadius="50%" boxSize="50px" />
          <Heading size="md" userSelect="none">Audio Workshop</Heading>
        </HStack>

        <HStack>
          <LanguageSelect />
          
          <Text fontWeight={500}>
            {user?.email}
          </Text>
          
          <Button size="sm" hidden={!isAuthenticated} onClick={() => logout()}>{t('log_out')}</Button>
        </HStack>
    </HStack>
  );
}

export { Header };

