import { Box, HStack, Heading, Spacer } from "@chakra-ui/react"
import { AddTrack } from "../components/AddTrack"
import { TracksListDesktop } from "../components/TracksListDesktop"
import { TrackSearch } from "../components/TrackSearch"
import { useTranslation } from "react-i18next"
import { useIsMobile } from "../shared/hooks"
import { TracksListMobile } from "../components/TracksListMobile"

const MainPage = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
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
      {isMobile && (<TracksListMobile />)}
      {!isMobile && (<TracksListDesktop />)}
    </Box>
  )
}

export default MainPage