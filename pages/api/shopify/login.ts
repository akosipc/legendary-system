import type { NextApiRequest, NextApiResponse } from 'next'

import Shopify from '@lib/shopify'

const { SHOP } = process.env

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.currentStore === undefined) {
    try {
      const authRoute = await Shopify.Auth.beginAuth(
        req,
        res,
        SHOP,
        '/api/shopify/auth/callback',
        false
      )

      res.writeHead(302, { Location: authRoute })
      res.end()
    } catch (e) {
      console.error(e)

      response.writeHead(500)

      if (e instanceof Shopify.Errors.ShopifyError) {
        response.end(e.message);
      } else {
        response.end(`Failed to complete OAuth process: ${e.message}`);
      }
    }
  } else {
    res.status(200).json({})
  }
}

export default handler
