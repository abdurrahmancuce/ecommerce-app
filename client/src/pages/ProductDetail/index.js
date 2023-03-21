import { Box, Button, Flex, Text } from '@chakra-ui/react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../api'
import ImageGallery from 'react-image-gallery'
import { useBasket } from '../../contexts/BasketContext'
import { CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react'

export default function ProductDetail() {
  const { product_id } = useParams()
  const { addToBasket, items } = useBasket()
  const [ isLoadingBasket, setIsLoadingBasket ] = useState(false)

  const { isLoading, error, data } = useQuery(['product', product_id], () => fetchProduct(product_id))

  if(isLoading) return <div>Loading...</div>

  if(error) return <div>An error has occured: {error.message}</div>

  const findBasketItem = items.find((item) => item._id === product_id)

  const images = data.photos.map((url) => ({ original: url }))

  const handleBasket = () => {
    setIsLoadingBasket(true)
    setTimeout(() => {
        addToBasket(data, findBasketItem)
        setIsLoadingBasket(false)
    }, 500)
}

  return (
    <Flex>
      <Box flex="2" margin="20px" border='2px' borderColor='gray.200'>
        <ImageGallery showFullscreenButton={false} showPlayButton={false} showBullets={true} items={images} />
      </Box>
      <Flex flex="3" py="10" flexDirection="column" justifyContent="space-between">
        <Flex flexDirection="column">
          <Text as="h2" fontSize="2xl">
            { data.title }
          </Text>
          <Text>
            { moment(data.createdAt).format('DD/MM/YYYY') }
          </Text>
          <Box fontWeight="bold" color="green.400">
            {data.price}₺
          </Box>
        </Flex>
        <p>
          { data.description }
        </p>
        <Button isLoading={isLoadingBasket} colorScheme={findBasketItem ? 'green' : 'orange'} size="sm" width="full" variant="solid" onClick={handleBasket}>
            {
                findBasketItem ? <CheckIcon /> : "Add to basket"
            }
        </Button>
      </Flex>
    </Flex>
  )
}
