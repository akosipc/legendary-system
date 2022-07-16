import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'

import { Layout } from '@layouts/Layout'

const Home: NextPage = () => {
  const router = useRouter()

  const [accessToken, setAccessToken] = useState(getCookie('accessToken'))

  if (accessToken) {
    useEffect(() => {
      console.log('trigger')
    }, [])
  }

  return (
    <Layout
      hasSession={ accessToken === null }
      currentPath={ router.pathname }
    />
  )
}

export default Home
