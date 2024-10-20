import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useProductStore } from '../store/product.store';

const ProductCard = ({key, product}) => {

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgAdaptive = useColorModeValue('white', 'gray.800');

  const { deleteProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const toast = useToast();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if(success) {
      toast({
        title: "Success",
        description: message,
        status: "success",
        isClosable: true
      })
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        isClosable: true
      })
    }
  }

  return (
    <Box    
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.2s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bgAdaptive}
      >

        <Image src={product.image} alt={product.name} h={48} w={'full'} objectFit={'cover'}/>

        <Box p={4}>

            <VStack spacing={2} alignItems={'start'}>
                <Heading as={'h3'} size={'md'}>
                    {product.name}
                </Heading>

                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor}>
                    &#8377;{product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton aria-label='edit product' icon={ <FaEdit /> } onClick={onOpen} />
                    <IconButton aria-label='delete product' icon={ <FaTrash /> } onClick={() => handleDeleteProduct(product._id)} />
                </HStack>
            </VStack>

        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <Input placeholder='Product Name' name='name'/>
                        <Input placeholder='Product Price' name='price' type='number'/>
                        <Input placeholder='Product Image URL' name='image'/>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                        Update
                    </Button>
                    <Button variant='ghost' onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>

        </Modal>
    </Box>
  )
}

export default ProductCard  