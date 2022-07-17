import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'

import { Meta } from '@layouts/Meta'
import { Layout } from '@layouts/Layout'
import { ProductForm } from '@components/ProductForm'

import {
  Box,
  SkeletonText,
  SkeletonCircle,
} from '@chakra-ui/react'

const NewProduct: NextPage = () => {
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [isLoading, setLoading] = useState(true)
  const [accessToken, setAccessToken] = useState(undefined)

  useEffect(() => {
    const fetchSession = async () => {
      const sessionToken = await getCookie('accessToken')
      setAccessToken(sessionToken)
    }

    fetchSession()
    setLoading(false)
  }, [])

  const handleSubmit = async (data) => {
    const response = await fetch(`/api/shopify/products/create`, {
      body: JSON.stringify(data),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())

    router.push('/')
  }

  return (
    <>
      <Meta
        title={ `Adding Product | Shopify CRUD Store` }
      />
      <Layout
        hasSession={ accessToken !== undefined }
        currentPath={ router.pathname }
      >
        {
          isLoading ?
            <Box padding='6' boxShadow='lg' bg='white'>
              <SkeletonText mt='4' noOfLines={10} spacing='4' />
            </Box> :
            <ProductForm
              product={ product }
              onSubmit={ handleSubmit }
            />
        }
      </Layout>
    </>
  )
}

export default NewProduct
