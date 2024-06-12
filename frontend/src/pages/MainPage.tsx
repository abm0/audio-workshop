import { Box, HStack, Heading, Spacer } from "@chakra-ui/react"
import { AddSong } from "../components/AddSong"
import { SongSearch } from "../components/SongSearch"
import { useTranslation } from "react-i18next"
import { SongsList } from "../components/SongsList"

const MainPage = () => {
  const { t } = useTranslation();
  
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
      {<SongsList />}
    </Box>
  )
}

export default MainPage