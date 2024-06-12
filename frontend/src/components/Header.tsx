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
import { $isAuthenticated,  } from "../models/auth";
import { logout } from '../models/auth.events'
import { useUnit } from "effector-react";
import logo from '../assets/logo.svg';
import { $profile } from "../models/user";
import { LanguageSelect } from "./LanguageSelect";
import { useTranslation } from "react-i18next";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useIsMobile } from "../shared/hooks";
import { Profile } from "./Profile";

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
  const profile = useUnit($profile);

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
        <DrawerMenu>
          <DrawerHeader>
          {isAuthenticated && (
            <Text color="black">
              {profile?.email}
            </Text>
          )}
          </DrawerHeader>

          <DrawerBody />

          <DrawerFooter justifyContent="space-between">
              <LanguageSelect />
              <Button size="sm" hidden={!isAuthenticated} onClick={() => logout()}>{t('log_out')}</Button>
          </DrawerFooter>
        </DrawerMenu>
      </HStack>
    );
  }
  
  return (
    <HStack justify="space-between">
        {appLogo}

        <HStack>
          <LanguageSelect />
          
          {isAuthenticated && (
            <Profile />          
          )}
        </HStack>
    </HStack>
  );
}

export { Header };

