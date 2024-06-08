import { Button, HStack, Heading, Image } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { $isAuthenticated, logout } from "../models/auth";
import { useUnit } from "effector-react";
import logo from '../assets/logo.svg';
import { AUTH_PATH } from "../shared/constants";

const Header = () => {
  const isAuthenticated = useUnit($isAuthenticated);
  
  const navigateTo = useNavigate();
  
  return (
    <HStack justify="space-between">
        <HStack>
          <Image src={logo} boxSize="50px" />
          <Heading size="md" userSelect="none">Audio Utils Web App</Heading>
        </HStack>

        <Button size="sm" hidden={!isAuthenticated} onClick={() => logout()}>Выход</Button>
        <Button size="sm" hidden={isAuthenticated} onClick={() => navigateTo(AUTH_PATH)}>Вход</Button>
    </HStack>
  );
}

export { Header };

