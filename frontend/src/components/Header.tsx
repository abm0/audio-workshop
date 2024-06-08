import { Button, HStack, Heading, Image, Text } from "@chakra-ui/react";
import { $isAuthenticated, logout } from "../models/auth";
import { useUnit } from "effector-react";
import logo from '../assets/logo.svg';
import { $user } from "../models/user";

const Header = () => {
  const isAuthenticated = useUnit($isAuthenticated);
  const user = useUnit($user);
  
  return (
    <HStack justify="space-between">
        <HStack>
          <Image src={logo} boxSize="50px" />
          <Heading size="md" userSelect="none">Audio Utils</Heading>
        </HStack>

        <HStack>
          <Text fontWeight={500}>
            {user?.email}
          </Text>
          
          <Button size="sm" hidden={!isAuthenticated} onClick={() => logout()}>Выйти</Button>
        </HStack>
    </HStack>
  );
}

export { Header };

