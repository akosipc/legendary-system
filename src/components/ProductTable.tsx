import React from 'react'
import NextLink from 'next/link'

import {
  Box,
  Text,
  Flex,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  TableCaption,
  TableContainer,
  SkeletonText
} from '@chakra-ui/react'

export const ProductTable = ({
  products
}) => {
  return (
    <Box
      bg='white'
      borderRadius={8}
      padding={4}
    >
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th> Image </Th>
              <Th> Name </Th>
              <Th> Description </Th>
              <Th isNumeric> Amount </Th>
              <Th isNumeric> Actions </Th>
            </Tr>
          </Thead>
          <Tbody>
            { products.map((product, index) => (
                <Tr key={ product.node.id }>
                  <Td w={ 200 }> 
                    <Image
                      h={ 125 }
                      w={ 200 }
                      src={ `https://picsum.photos/seed/${index}/200/300` }
                      boxShadow='md'
                      border="10px solid white"
                      borderRadius={8}
                      objectFit='cover'
                    />
                  </Td>
                  <Td w={200}> { product.node.title } </Td>
                  <Td maxWidth={300}> { product.node.description || ( <Lorem/> ) } </Td>
                  <Td isNumeric> { product.node.variants.edges[0].node.price } </Td>
                  <Td w={ 200 } isNumeric>
                    <Flex
                      alignItems='center'
                      justifyContent='space-between'
                    >
                      <NextLink
                        as={`/products/${product.node.legacyResourceId}/edit`}
                        href={`/?productId=${product.node.legacyResourceId}`}
                      >
                        <Button 
                          size='sm' 
                          colorScheme='blue'
                        >
                          Edit
                        </Button>
                      </NextLink>
                      <Button size='sm' colorScheme='red'>
                        Archive
                      </Button>
                    </Flex>
                  </Td>
                </Tr>
              ))
            }
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

const Lorem = () => {
  return (
    <SkeletonText 
      spacing={4} 
      noOfLines={1}
    />
  )
}
