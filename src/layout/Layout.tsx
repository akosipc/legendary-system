import React from 'react'

import {
  Box,
  Flex,
  Grid,
  Button,
  Heading,
  GridItem
} from '@chakra-ui/react'

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
            hasSession ? "" :
              <Button colorScheme='teal'>
                Sync via Shopify
              </Button>
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
          active={ currentPath === '/' || currentPath === '/products/new' }
        />
        <NavLink 
          href='/reports'
          label='Reports'
          active={ currentPath === '/reports' }
        />
      </GridItem>
      <GridItem 
        bg='gray.200'
        area={'main'}
      >
        { children }
      </GridItem>
    </Grid>
  )
}