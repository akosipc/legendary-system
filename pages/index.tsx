import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import { Layout } from '@layouts/Layout'

const Home: NextPage = () => {
  return (
    <Layout/>
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
