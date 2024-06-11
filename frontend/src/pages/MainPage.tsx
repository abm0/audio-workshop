import { Box, HStack, Heading, Spacer } from "@chakra-ui/react"
import { AddSong } from "../components/AddSong"
import { SongsListDesktop } from "../components/SongsListDesktop"
import { SongSearch } from "../components/SongSearch"
import { useTranslation } from "react-i18next"
import { useIsMobile } from "../shared/hooks"
import { SongsListMobile } from "../components/SongsListMobile"

const MainPage = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  
  return (
    <Box>
      <HStack justifyContent="space-between">
        <Heading size="md">
          {t(('my_tracks'))}:
        </Heading>
        <AddSong />
      </HStack>
      <Spacer height={8} />
      <SongSearch />
      <Spacer height={6} />
      {isMobile && (<SongsListMobile />)}
      {!isMobile && (<SongsListDesktop />)}
    </Box>
  )
}

export default MainPage