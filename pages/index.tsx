import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'

import { Meta } from '@layouts/Meta'
import { Layout } from '@layouts/Layout'
import { ModalBundle } from '@components/ModalBundle'
import { ProductTable } from '@components/ProductTable'

import {
  Box,
  SkeletonText,
  SkeletonCircle,
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(undefined)
  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      const sessionToken = await getCookie('accessToken')
      setAccessToken(sessionToken)
    }

    fetchSession()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await fetch(`/api/shopify/products/fetch`)
        .then(response => response.json())

      setProducts(products?.products?.edges)
    }

    if (accessToken !== undefined) {
      fetchProducts()
      setLoading(false)
    }
  }, [accessToken])

  return (
    <>
      <Meta
        title='Products List | Shopify CRUD Store'
      />
      <Layout
        hasSession={ accessToken !== undefined }
        currentPath={ router.pathname }
      >
        {
          isLoading ?
            <Box padding='6' boxShadow='lg' bg='white'>
              <SkeletonCircle size='10' />
              <SkeletonText mt='4' noOfLines={20} spacing='4' />
            </Box> :
            <ProductTable
              products={ products }
            />
        }
        <ModalBundle
          title='Test Modal'
          isOpen={!!router.query.productId}
          onClose={ () => router.push('/') }
        >
        </ModalBundle>
      </Layout>
    </>
  )
}

export default Home
