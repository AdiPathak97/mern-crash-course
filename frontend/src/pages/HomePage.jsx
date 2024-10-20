import React from 'react'
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container maxW={"container.xl"} py={12}>
      <VStack spacing={8}>
        <Text
            fontSize={30}
            fontWeight={"bold"}
            textAlign={"center"}
            bgGradient={"linear(to-r, cyan.400, blue.500)"}
            bgClip="text"
        >
            Current Products 🚀
        </Text>
        
        <Text
            fontSize={"xl"}
            fontWeight={"bold"}
            textAlign={"center"}
        >
            No products found 😢
            <Link to = '/create'>
              <Text 
                // as='span' 
                color={'blue.500'} 
                _hover={{
                  textDecoration: 'underline'
                }}
              >
                Create a 🆕 product!   
              </Text>
            </Link>
        </Text>

        <SimpleGrid>
                
        </SimpleGrid>
      </VStack>    
    </Container>
  )
}

export default HomePage