import { Box, Heading, Link, List, ListIcon, ListItem, Spacer, Text } from "@chakra-ui/react"
import { useTranslation } from "react-i18next"
import { MdCheckCircle } from "react-icons/md";

const AboutPage = () => {
  const { t } = useTranslation();
  
  return (
    <Box>
      <Heading size="md">
        {t(('about'))}:
      </Heading>
      <Spacer height={4}/>

      <Text>
        {t('text__welcome')}
      </Text>
      <Spacer height={2} />
      <Text>
        {t('text__enthusiasts')}  
      </Text>
      <Spacer height={2} />
      <Text>
        {t('text__targeting')}
      </Text>
      <Spacer height={6}/>

      <Heading size="sm">
        {t('our_mission')}
      </Heading>
      <Spacer height={4}/>
      
      <Text>
        {t('text__mission')}
      </Text>
      <Spacer height={6}/>
        
      <Heading size="sm">
        {t('offer')}
      </Heading>
      <Spacer height={4}/>
      
      <List spacing={3}>
        <ListItem>
          <ListIcon as={MdCheckCircle} color='green.500' />
          {t('text__analysis')}
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color='green.500' />
          {t('text__separation')}
        </ListItem>
        <ListItem>
          <ListIcon as={MdCheckCircle} color='green.500' />
          {t('text__interface')}
        </ListItem>
      </List>
      <Spacer height={6}/>

      <Heading size="sm">
        {t('contacts')}
      </Heading>
      <Spacer height={4}/>

      <Link>ilove@music.com</Link>      
      <Spacer height={2}/>
      <Text>8 (800) 123 45 67</Text>

    </Box>
  )
}

export default AboutPage