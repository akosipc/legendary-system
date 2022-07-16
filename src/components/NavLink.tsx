import React from 'react'
import NextLink from 'next/link'

import {
  Box,
  Flex,
  Text,
  Badge
} from '@chakra-ui/react'

export type NavLinkProps = {
  href: string,
  label: string,
  active?: boolean
  iconType: string,
  badgeNumber?: number
}

export const NavLink = ({
  href,
  label,
  active,
  iconType,
  badgeNumber
}: NavLinkProps) => {
  return (
    <NextLink href={ href } passHref>
      <Box
        bg={ active ? 'teal.300': 'gray.100' }
        color={ active ? 'white' : 'gray.700' }

        padding={4}
        fontWeight='600'
        _hover={{
          bg: 'teal.300',
          color: 'white',
          cursor: 'pointer',
        }}
      >
        <Flex
          alignItems='center'
          justifyContent='space-between'
        >
          <Flex>
            <Text ml={ 2 }>
              { label }
            </Text>
          </Flex>

          {
            badgeNumber &&
            <Badge
              px={2}
              py={0.5}
              color='white'
              background='brand.900'
              borderRadius={ 100 }
            >
              { badgeNumber }
            </Badge>
          }
        </Flex>
      </Box>
    </NextLink>
  )
}
