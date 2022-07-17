import type { NextApiRequest, NextApiResponse } from 'next'

import Shopify from '@lib/shopify'

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  const session = await Shopify.Utils.loadCurrentSession(req, res)
  const client = new Shopify.Clients.Graphql(session.shop, session.accessToken)

  const product = await client.query({
    data: `
      mutation {
        prod: productUpdate(input: {
          id: "gid://shopify/Product/${req.body.id}",
          title: "${req.body.title}",
          descriptionHtml: "${req.body.description}",
        }) {
          product {
            id
            title
            description
            legacyResourceId
          }
          userErrors {
            field
            message
          }
        }
      }
    `
  })  

  console.log(product.body.data.prod)

  res.status(200).json({ ...product.body.data.prod.product })
}

export default handler
