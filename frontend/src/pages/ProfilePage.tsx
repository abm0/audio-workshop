import { Box, Button, Text, Heading, Input, Spacer, Stack } from "@chakra-ui/react";
import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { $profile } from "../models/user";

const ProfilePage = () => {
  const { t } = useTranslation();
  const profile = useUnit($profile);

  return (
    <Box width="50%">
      <Heading size="md">
        {t(('profile'))}:
      </Heading>
      <Spacer height={4}/>

      <Stack spacing={4}>
        <Stack spacing={2}>
          <Text>
            {t('email')}:
          </Text>
          <Input value={profile?.email} />
        </Stack>
        <Stack spacing={2}>
          <Text>
            {t('user_name')}:
          </Text>
          <Input value={profile?.name} />
        </Stack>


        <Button
          colorScheme="teal"
          size="sm"
          width="auto"
        >
          {t('submit')}
        </Button>
      </Stack>
    </Box>
  );
}

export { ProfilePage };
