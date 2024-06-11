import { useUnit } from "effector-react";
import { $profile } from "../models/user";
import { 
  Avatar,
  Box,
  Button,
  HStack,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
  useDisclosure,
  useOutsideClick
} from "@chakra-ui/react";
import { logout } from "../models/auth.events";
import { useTranslation } from "react-i18next";
import { useRef } from "react";

const Profile = () => {
  const { t } = useTranslation();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const popoverRef = useRef(null);

  useOutsideClick({
    ref: popoverRef,
    handler: onClose,
  })
  
  const profile = useUnit($profile);
  
  return (
    <Box ref={popoverRef}>
      <Popover isOpen={isOpen}>
        <PopoverTrigger>
          <Avatar name={profile?.name} onClick={onToggle} />
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>
              <HStack justifyContent="space-between">
                <Text color="black" fontWeight={500}>
                  {profile?.email}
                </Text>
                <Button size="sm" onClick={() => logout()}>{t('log_out')}</Button>
              </HStack>
            </PopoverHeader>
          </PopoverContent>
        </Portal>
      </Popover>
    </Box>
  );
}

export { Profile };
