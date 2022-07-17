import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'

import { Layout } from '@layouts/Layout'

import {
  Spinner
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(undefined)
  const [products, setProducts] = useState([])
  //const [products, setProducts] = useState([])

  //if (accessToken) {
    //useEffect(async () => {
      ////const products = await fetch(`/api/shopify/products/fetch`)

      ////console.log(products) 

    //}, [])
  //}

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

      setProducts(products.products.edges)
    }

    fetchProducts()
  }, [])

  return (
    <Layout
      hasSession={ accessToken !== undefined }
      currentPath={ router.pathname }
    >
      { products.length }
    </Layout>
  )
}

export default Home
