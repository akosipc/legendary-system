import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { getCookie } from 'cookies-next'

import { Meta } from '@layouts/Meta'
import { Layout } from '@layouts/Layout'

const EditProduct: NextPage = () => {
  const router = useRouter()
  const [accessToken, setAccessToken] = useState(undefined)

  useEffect(() => {
    const fetchSession = async () => {
      const sessionToken = await getCookie('accessToken')
      setAccessToken(sessionToken)
    }

    fetchSession()
  }, [])

  return (
    <Layout
      hasSession={ accessToken !== undefined }
      currentPath={ router.pathname }
    >
    </Layout>
  )
}

export default EditProduct
