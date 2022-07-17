import type { NextApiRequest, NextApiResponse } from 'next'

import { getCookie } from 'cookies-next'

import Shopify from '@lib/shopify'

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const session = await Shopify.Utils.loadCurrentSession(req, res)
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken)

  const products = await client.query({
    data: `{
      products (first: 10) {
        edges {
          node {
            id
            title
            descriptionHtml
          }
        }
      }
    }`
  })

  res.status(200).json({ ...products.body.data })
}

export default handler
