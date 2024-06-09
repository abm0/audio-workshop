import { Box, HStack, Heading, Spacer, VStack } from "@chakra-ui/react"
import { AddTrack } from "../components/AddTrack"
import { TracksList } from "../components/TracksList"
import { TrackSearch } from "../components/TrackSearch"
import { useTranslation } from "react-i18next"

const MainPage = () => {
  const { t } = useTranslation();
  
  return (
    <Box>
      <HStack justifyContent="space-between">
        <Heading size="md">
          {t(('my_tracks'))}:
        </Heading>
        <AddTrack />
      </HStack>
      <Spacer height={8} />
      <TrackSearch />
      <Spacer height={6} />
      <TracksList />
    </Box>
  )
}

export default MainPage