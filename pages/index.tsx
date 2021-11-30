import React, { useState } from 'react'
import { Grid, Stack, Image, Text, Button, Link, Flex } from '@chakra-ui/react'
import { GetStaticProps } from 'next'
import { Product } from '../product/types'
import api from '../product/api'
import { buildMessageToSend } from '../helpers/helpers'
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'

interface Props {
  products: Array<Product>
}

// function parsePrice(value: number | string): string {
//   return value.toLocaleString('es-MX', {
//     currency: 'MX'
//   })
// }

const Home: React.FC<Props> = ({ products }) => {
  const [cart, setCard] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState<string>(null)
  const textButton = React.useMemo(() => buildMessageToSend(cart), [cart])
  return (
    <AnimateSharedLayout>
      <Stack spacing={6}>
        <Grid gridGap={6} templateColumns="repeat(auto-fill,minmax(240px,1fr))">
          {products.map((product) => (
            <Stack
              spacing={3}
              borderRadius="md"
              padding={4}
              backgroundColor="gray.100"
              key={product.id}
            >
              <Image
                src={product.image}
                alt={product.title}
                borderTopRadius={'md'}
                maxH={'128px'}
                objectFit={'cover'}
                as={motion.img}
                cursor={'pointer'}
                layoutId={product.image}
                onClick={() => setSelectedImage(product.image)}
              />
              <Stack spacing={1}>
                <Text color="gray">{product.title}</Text>
                <Text color="green.500" fontSize="sm" fontWeight="500">
                  {product.price}
                </Text>
              </Stack>
              <Button
                onClick={() => setCard([...cart, product])}
                colorScheme="primary"
                variant="ghost"
                size="sm"
              >
                Add
              </Button>
            </Stack>
          ))}
        </Grid>
        {Boolean(cart.length) && (
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            bottom={0}
            padding={4}
            position={'sticky'}
            as={motion.div}
            initial={{ scale: 0 }}
            animate={{ scale: 0 }}
            exit={{ scale: 0 }}
          >
            <Button
              as={Link}
              href={`https://wa.me/5454545454?text=${encodeURI(textButton)}`}
              colorScheme="whatsapp"
              isExternal
              w={'fit-content'}
            >
              Complete order ( {cart.length} products)
            </Button>
          </Flex>
        )}
      </Stack>
      <AnimatePresence>
        {selectedImage && (
          <Flex
            onClick={() => setSelectedImage(null)}
            key={'backdrop'}
            alignItems={'center'}
            as={motion.div}
            bgColor={'rgba(0,0,0,0.5)'}
            justifyContent={'center'}
            height={'100%'}
            width={'100%'}
            left={0}
            top={0}
            position={'fixed'}
            layoutId={selectedImage}
          >
            <Image src={selectedImage} key={selectedImage} />
          </Flex>
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  )
}

export const getStaticProps: GetStaticProps = async() => {
  const products = await api.list()
  return {
    revalidate: 100,
    props: {
      products
    }
  }
}

export default Home
