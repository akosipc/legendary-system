import React from 'react'
import NextLink from 'next/link'

import {
  Box,
  Flex,
  Grid,
  Button,
  Heading,
  GridItem
} from '@chakra-ui/react'

import {
  AddIcon
} from '@chakra-ui/icons'

import { NavLink } from '@components/NavLink'

type LayoutProps = {
  children?: JSX.Element
  hasSession: boolean
  currentPath: string
}

export const Layout = ({ 
  children,
  hasSession,
  currentPath
}: LayoutProps) => {
  return (
    <Grid
      templateAreas={`"header header" "nav main"`}
      gridTemplateRows={'8vh 1fr'}
      gridTemplateColumns={'15vw 1fr'}
      h='100vh'
    >
      <GridItem 
        bg='pink.700' 
        px={ 8 }
        area={'header'}
        color='gray.100'
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        borderBottom="1px solid"
        borderBottomColor="pink.900"
      >
        <Heading size="md">
          Shopify Bridge
        </Heading>
        
        <Box>
          {
            hasSession ? 
              <>
                <NextLink
                  as={`/products/new`}
                  href={`/?newProduct=true`}
                >
                  <Button colorScheme='teal'
                    mr={ 4 }
                  >
                    <AddIcon mr={2} />
                    Create Product
                  </Button>
                </NextLink>
                <NextLink href='/api/shopify/logout' passHref>
                  <Button colorScheme='red'>
                    Sign Out
                  </Button>
                </NextLink>
              </>
              :
              <NextLink href='/api/shopify/login' passHref>
                <Button colorScheme='teal'>
                  Sync via Shopify
                </Button>
              </NextLink>
          }
        </Box>
      </GridItem>
      <GridItem 
        bg='gray.100'
        boxShadow='lg'
        area={'nav'}
      >
        <NavLink 
          href='/'
          label='Products'
          active={ currentPath === '/' || currentPath.includes('products') }
        />
      </GridItem>
      <GridItem 
        bg='gray.200'
        area={'main'}
        padding={8}
      >
        { children }
      </GridItem>
    </Grid>
  )
}
