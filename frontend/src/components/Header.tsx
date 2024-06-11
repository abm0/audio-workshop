import React from "react";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading, Image,
  Text, useDisclosure
} from "@chakra-ui/react";
import { $isAuthenticated, logout } from "../models/auth";
import { useUnit } from "effector-react";
import logo from '../assets/logo.svg';
import { $user } from "../models/user";
import { LanguageSelect } from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useIsMobile } from "../shared/hooks";

interface IDrawerMenu {
  children: React.ReactNode;
}

const DrawerMenu = ({ children }: IDrawerMenu) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  return (
    <>
      <Button colorScheme='white' variant="ghost" onClick={onOpen}>
        <HamburgerIcon w={6} h={6} />
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          {children}
        </DrawerContent>
      </Drawer>
    </>
  )
}

const Header = () => {
  const isAuthenticated = useUnit($isAuthenticated);
  const user = useUnit($user);

  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  const appLogo = (
    <HStack>
      <Image src={logo} borderRadius="50%" boxSize="50px" />
      <Heading size="md" userSelect="none">Audio Workshop</Heading>
    </HStack>
  );
  
  if (isMobile) {
    return (
      <HStack justify="space-between">
        {appLogo}
        {isAuthenticated && (
          <DrawerMenu>
            <DrawerHeader>
              <Text color="black">
                {user?.email}
              </Text>
            </DrawerHeader>

            <DrawerBody />

            <DrawerFooter justifyContent="space-between">
                <LanguageSelect />
                <Button size="sm" hidden={!isAuthenticated} onClick={() => logout()}>{t('log_out')}</Button>
            </DrawerFooter>
          </DrawerMenu>
        )}
      </HStack>
    );
  }
  
  return (
    <HStack justify="space-between">
        {appLogo}

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

