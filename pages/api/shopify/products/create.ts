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
        prod: productCreate(input: {
          title: "${req.body.title}",
          descriptionHtml: "${req.body.description}",
        }) {
          product {
            id
            title
            description
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
          userErrors {
            field
            message
          }
        }
      }
    `
  })  

  res.status(200).json({ ...product.body.data.prod.product })
}

export default handler
