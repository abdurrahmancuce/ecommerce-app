import { Box, Button, Flex, Image } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import { useBasket } from '../../contexts/BasketContext'
import { CheckIcon } from '@chakra-ui/icons'
import { useState } from 'react'


export default function Card({ item }) {
    const { addToBasket, items } = useBasket()
    const [ isLoading, setIsLoading ]= useState(false)

    const findBasketItem = items.find((basket_item) => basket_item._id === item._id)

    const handleBasket = () => {
        setIsLoading(true)
        setTimeout(() => {
            addToBasket(item, findBasketItem)
            setIsLoading(false)
        }, 500)
    }

    return (
        <Flex border="1px" borderRadius="lg" borderColor="gray.200" overflow="hidden" flexDirection="column" justifyContent="center" alignItems="center" p="3px" maxWidth="230" >
            <Link to={`/product/${item._id}`}>
                <Image boxSize='200px' objectFit='cover' fallbackSrc='http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png' src={item.photos[0]} alt="product" />

                <Box p="6px">
                    <Box d="flex" alignItems="baseline" fontSize="sm">
                        {moment(item.createdAt).format('DD/MM/YYYY')}
                    </Box>
                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight">
                        {item.title}
                    </Box>
                    <Box fontWeight="bold" color="green.400">
                        {item.price}₺
                    </Box>
                </Box>
            </Link>
            <Button isLoading={isLoading} colorScheme={findBasketItem ? 'green' : 'orange'} size="sm" width="full" variant="solid" onClick={handleBasket}>
                {
                    findBasketItem ? <CheckIcon /> : "Add to basket"
                }
            </Button>
        </Flex>
    )
}
