import type { NextApiRequest, NextApiResponse } from 'next'

import { getCookie } from 'cookies-next'

import Shopify from '@lib/shopify'

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const session = await Shopify.Utils.loadCurrentSession(req, res)
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken)

  console.log(req.query)

  if (req.query.id) {
    const product = await client.query({
      data: `{
        product(id: "gid://shopify/Product/${req.query.id}") {
          title
          description
        }
      }`
    })

    res.status(200).json({ ...product.body.data })
  } else {
    const products = await client.query({
      data: `{
        products (first: 20, reverse: true) {
          edges {
            node {
              id
              title
              legacyResourceId
              variants(first: 3) {
                edges {
                  node {
                    id
                    price
                    image {
                      id
                      url
                    }
                  }
                }
              }
            }
          }
        }
      }`
    })

    res.status(200).json({ ...products.body.data })
  }

}

export default handler
