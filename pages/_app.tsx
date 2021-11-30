import React from 'react'
import {
  ChakraProvider,
  Container,
  VStack,
  Text,
  Heading,
  Image,
  Box,
  Divider
} from '@chakra-ui/react'
import { INFORMATION } from '../app/constants'
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Box padding={4}>
        <Container
          bgColor="white"
          boxShadow="md"
          marginY={4}
          padding={4}
          maxW="container.xl"
        >
          <VStack mb={6}>
            <Image src={INFORMATION.avatar} borderRadius={9999} />
            <Heading>{INFORMATION.title}</Heading>
            <Text>{INFORMATION.description}</Text>
            <Divider marginY={6} />
            <Component {...pageProps} />
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  )
}

export default MyApp
