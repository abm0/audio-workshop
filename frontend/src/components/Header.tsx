import { Button, HStack, Heading, Image, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { $isAuthenticated, logout } from "../models/auth";
import { useUnit } from "effector-react";
import logo from '../assets/logo.svg';
import { AUTH_PATH } from "../shared/constants";
import { $user } from "../models/user";

const Header = () => {
  const isAuthenticated = useUnit($isAuthenticated);
  const user = useUnit($user);

  const navigateTo = useNavigate();
  
  return (
    <HStack justify="space-between">
        <HStack>
          <Image src={logo} boxSize="50px" />
          <Heading size="md" userSelect="none">Audio Utils Web App</Heading>
        </HStack>

        <HStack>
          <Text fontWeight={500}>
            {user?.email}
          </Text>
          
          <Button size="sm" hidden={!isAuthenticated} onClick={() => logout()}>Выход</Button>
          <Button size="sm" hidden={isAuthenticated} onClick={() => navigateTo(AUTH_PATH)}>Вход</Button>
        </HStack>
    </HStack>
  );
}

export { Header };

