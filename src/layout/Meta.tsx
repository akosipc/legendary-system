import Head from 'next/head'
import React from 'react'

type MetaProps = {
  title: string
}

export const Meta = ({ 
  title 
}: MetaProps) => {
  return (
    <Head>
      <title> { title }</title>
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
  ) 
}
