import { Alert, Box, Button, FormControl, FormLabel, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { postOrder } from '../../api';
import { useBasket } from '../../contexts/BasketContext'

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
                <ul style={{ listStyleType: 'decimal' }}>
                    {
                        items.map((item) => (
                            <li key={item._id} style={{ marginBottom: 15 }}>
                                <Link to={`/product/${item._id}`}>
                                    <Text fontSize="18">
                                        {item.title} - {item.price} ₺
                                    </Text>
                                    <Image boxSize='100px' objectFit='cover' border="1px" borderColor="gray.200" fallbackSrc='http://www.cams-it.com/wp-content/uploads/2015/05/default-placeholder-200x200.png' src={item.photos[0]} alt="Basket Item" />
                                </Link>

                                <Button mt="2" size="sm" colorScheme="pink" onClick={() => { removeFromBasket(item._id) }}>
                                    Remove from basket
                                </Button>
                            </li>
                        ))
                    }
                </ul>
                <Box mt="10">
                    <Text fontSize="22">
                        Total: {total} ₺
                    </Text>
                </Box>

                <Button mt="2" size="sm" colorScheme="green" onClick={onOpen}>Order</Button>

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
