import { Alert, Box, Button, Flex, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { postOrder } from '../../api';
import { useBasket } from '../../contexts/BasketContext'
import { DeleteIcon } from '@chakra-ui/icons'

export default function Basket() {
    const [address, setAddress] = useState('');
    const { items, removeFromBasket, emptyBasket } = useBasket()
    const { isOpen, onOpen, onClose } = useDisclosure()

    const initialRef = useRef(null)
    const finalRef = useRef(null)

    const total = items.reduce((acc, obj) => acc + obj.price, 0)

    const handleSubmitForm = async () => {
        const itemIds = items.map(item => item._id)
        
        const input = {
            address,
            items: JSON.stringify(itemIds)
        }

        const response = await postOrder(input)

        emptyBasket()
        onClose()
    }

    return (
        <Box p="5">
            {items.length < 1 && (
                <Alert status='warning'>You have not any items in your basket</Alert>
            )}

            {items.length > 0 && (<>
                <ul>
                    {
                        items.map((item) => (
                            <>
                                <li key={item._id} style={{ marginBottom: 15, padding: 10 }}>
                                    <Flex justifyContent="space-between" align="center">
                                        <Link to={`/product/${item._id}`}>
                                            <Flex flexDirection="row" justifyContent="flex-start" align="center">
                                                <Image m="4" boxSize='100px' objectFit='cover' border="1px" borderColor="gray.200" borderRadius="10" fallbackSrc='http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png' src={item.photos[0]} alt="Basket Item" />
                                                <Flex flexDirection="column">
                                                    <Text fontSize="18">
                                                        {item.title}
                                                    </Text>
                                                    <Text fontSize="14" fontWeight="bold" color="green.400">
                                                        {item.price}₺
                                                    </Text>
                                                </Flex>
                                            </Flex>
                                        </Link>

                                        <Button colorScheme="red" size="sm" px="10" variant="solid" onClick={() => { removeFromBasket(item._id) }}>
                                            <DeleteIcon />
                                        </Button>
                                    </Flex>
                                </li>
                                <hr /> 
                            </>

                        ))
                    }
                </ul>
                <Box mt="10">
                    <Text fontSize="22" fontWeight="bold">
                        Total: {total} ₺
                    </Text>
                </Box>

                <Button mt="2" size="sm" colorScheme="orange" width="full" onClick={onOpen}>Order</Button>

                <Modal
                    initialFocusRef={initialRef}
                    finalFocusRef={finalRef}
                    isOpen={isOpen}
                    onClose={onClose}
                >
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create your account</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <FormControl>
                                <FormLabel>Address</FormLabel>
                                <Textarea ref={initialRef} placeholder='Address...' value={address} onChange={(e) => setAddress(e.target.value)} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button onClick={handleSubmitForm} colorScheme='blue' mr={3}>
                                Save
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </>)}
        </Box>
    )
}
