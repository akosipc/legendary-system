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

const EditProduct: NextPage = ({
  legacyResourceId
}) => {
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
  }, [])

  useEffect(() => {
    const fetchProduct = async () => {
      const product = await fetch(`/api/shopify/products/fetch?id=${legacyResourceId}`)
        .then(response => response.json())

      setProduct(product.product)
    }

    if (accessToken !== undefined) {
      fetchProduct()
      setLoading(false)
    }
  }, [accessToken])

  const handleSubmit = async (data) => {
    let newData = { ...data, id: legacyResourceId }

    const response = await fetch(`/api/shopify/products/update`, {
      body: JSON.stringify(newData),
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
        title={ `Editing Product | Shopify CRUD Store` }
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

export const getServerSideProps = ({ params }) => {
  return {
    props: {
      legacyResourceId: params.legacyResourceId
    }
  }
}

export default EditProduct
