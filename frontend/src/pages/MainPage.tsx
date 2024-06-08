import { Box, HStack, Heading, Spacer } from "@chakra-ui/react"
import { AddTrack } from "../components/AddTrack"
import { TracksList } from "../components/TracksList"

const MainPage = () => {
  return (
    <Box>
      <HStack justifyContent="space-between">
        <Heading size="md">
          Мои треки:
        </Heading>
        <AddTrack />
      </HStack>
      <Spacer height={12} />
      <TracksList />
    </Box>
  )
}

export default MainPage