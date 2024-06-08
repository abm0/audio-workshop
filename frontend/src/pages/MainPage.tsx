import { HStack, VStack, Wrap } from "@chakra-ui/react"
import { AddTrack } from "../components/AddTrack"

const MainPage = () => {
  return (
    <VStack>
        <HStack align="end">
          <AddTrack />
        </HStack>
    </VStack>
  )
}

export default MainPage