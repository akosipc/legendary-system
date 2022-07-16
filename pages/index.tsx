import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout } from '@layouts/Layout'

const Home: NextPage = () => {
  const router = useRouter()

  return (
    <Layout
      currentPath={ router.pathname }
    />
  )
}


export const getServerSideProps = ({ req, res }) => {
  console.log(req.currenStore)
  console.log(req.accessToken)

  return {
    props: {}
  }
}

export default Home
