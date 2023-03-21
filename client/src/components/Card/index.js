import { Box, Button, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useBasket } from '../../contexts/BasketContext'

export default function Card({ item }) {
    const { addToBasket, items } = useBasket()

    const findBasketItem = items.find((basket_item) => basket_item._id === item._id)

    return (
        <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3px" >
            <Link to={`/product/${item._id}`}>
                <Image boxSize='200px' objectFit='cover' border="1px" borderColor="gray.200" fallbackSrc='http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png' src={item.photos[0]} alt="product" />

                <Box p="6px">
                    <Box d="flex" alignItems="baseline">
                        {moment(item.createdAt).format('DD/MM/YYYY')}
                    </Box>
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                        {item.title}
                    </Box>
                    <Box>
                        {item.price}
                    </Box>
                </Box>
            </Link>
            <Button colorScheme={findBasketItem ? 'pink' : 'green'} variant="solid" onClick={() => addToBasket(item, findBasketItem)}>
                {
                    findBasketItem ? "Remove from basket" : "Add to basket"
                }
            </Button>
        </Box>
    )
}
