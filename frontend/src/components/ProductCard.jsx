import { Box, Heading, HStack, IconButton, Image, Text, useColorModePreference, useColorModeValue, VStack } from '@chakra-ui/react'
import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa';

const ProductCard = ({key, product}) => {

  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bgAdaptive = useColorModeValue('white', 'gray.800');

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

            <VStack spacing={4} alignItems={'start'}>
                <Heading as={'h3'} size={'md'}>
                    {product.name}
                </Heading>

                <Text fontWeight={'bold'} fontSize={'xl'} color={textColor}>
                    &#8377;{product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton aria-label='edit product' icon={ <FaEdit /> } />
                    <IconButton aria-label='delete product' icon={ <FaTrash /> } />
                </HStack>
            </VStack>

        </Box>
    </Box>
  )
}

export default ProductCard  