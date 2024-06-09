import { Box, HStack, Heading, Spacer, VStack } from "@chakra-ui/react"
import { AddTrack } from "../components/AddTrack"
import { TracksList } from "../components/TracksList"
import { TrackSearch } from "../components/TrackSearch"

const MainPage = () => {
  return (
    <Box>
      <HStack justifyContent="space-between">
        <Heading size="md">
          Мои треки:
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