import { Box, Button, Text } from '@chakra-ui/react'
import moment from 'moment'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { fetchProduct } from '../../api'
import ImageGallery from 'react-image-gallery'
import { useBasket } from '../../contexts/BasketContext'

export default function ProductDetail() {
  const { product_id } = useParams()
  const { addToBasket, items } = useBasket()

  const { isLoading, error, data } = useQuery(['product', product_id], () => fetchProduct(product_id))

  if(isLoading) return <div>Loading...</div>

  if(error) return <div>An error has occured: {error.message}</div>

  const findBasketItem = items.find((item) => item._id === product_id)

  const images = data.photos.map((url) => ({ original: url }))

  return (
    <div>
      <Box margin="20px" border='2px' borderColor='gray.200'>
        <ImageGallery showFullscreenButton={false} showPlayButton={false} showBullets={true} items={images} />
      </Box>
      <Button colorScheme={findBasketItem ? 'pink' : 'green'} variant="solid" onClick={() => addToBasket(data, findBasketItem)}>
        {
          findBasketItem ? "Remove from basket" : "Add to basket"
        }
      </Button>
      <Text as="h2" fontSize="2xl">
        { data.title }
      </Text>
      <Text>
        { moment(data.createdAt).format('DD/MM/YYYY') }
      </Text>
      <p>
        { data.description }
      </p>
    </div>
  )
}
