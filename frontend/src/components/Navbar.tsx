import { HStack, Link, VStack } from "@chakra-ui/react";
import { ABOUT_PATH, MAIN_PATH, PROFILE_PATH } from "../shared/constants";
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useIsMobile } from "../shared/hooks";
import { useTranslation } from "react-i18next";

interface INavbar {
  hidden?: boolean;
}

const Navbar = (props: INavbar) => {
  const { hidden = false } = props;

  const location = useLocation();
  const isMobile = useIsMobile();
  const { t } = useTranslation();
  
  const getColorDesktop = (path: string) => location.pathname === path ? 'white' : 'gray.200';
  const getColorMobile = (path: string) => location.pathname === path ? 'black' : 'gray.500';
    
  if (hidden) {
    return null;
  }

  if (isMobile) {
    return (
      <VStack align="start">
        <Link as={RouterLink} to={MAIN_PATH} color={getColorMobile(MAIN_PATH)}>{t('cabinet')}</Link>
        <Link as={RouterLink} to={PROFILE_PATH} color={getColorMobile(PROFILE_PATH)}>{t('profile')}</Link>
        <Link as={RouterLink} to={ABOUT_PATH} color={getColorMobile(ABOUT_PATH)}>{t('about')}</Link>
      </VStack>
    );
  }

  return (
    <HStack spacing={4}>
      <Link as={RouterLink} to={MAIN_PATH} color={getColorDesktop(MAIN_PATH)}>{t('cabinet')}</Link>
      <Link as={RouterLink} to={PROFILE_PATH} color={getColorDesktop(PROFILE_PATH)}>{t('profile')}</Link>
      <Link as={RouterLink} to={ABOUT_PATH} color={getColorDesktop(ABOUT_PATH)}>{t('about')}</Link>
    </HStack>
  );
}

export { Navbar };
