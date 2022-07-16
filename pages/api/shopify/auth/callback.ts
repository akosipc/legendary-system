import type { NextApiRequest, NextApiResponse } from 'next'
import type { AuthQuery } from '@shopify/shopify-api'

import { setCookies } from 'cookies-next'

import Shopify from '@lib/shopify'

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  try {
    const session = await Shopify.Auth.validateAuthCallback(req, res, req.query as AuthQuery);

    setCookies('currentStore', session.scope, { req, res })
    setCookies('accessToken', session.accessToken, { req, res })

    console.log(session.accessToken);
    // all good, redirect to '/'
    const searchParams = new URLSearchParams(req.url);
    const host = searchParams.get("host");
    const shop = searchParams.get("shop");
    res.writeHead(302, { Location: `/?host=${host}&shop=${shop}` });
    res.end();
  }
  catch (e) {
    console.log(e);

    res.writeHead(500);
    if (e instanceof Shopify.Errors.ShopifyError) {
      res.end(e.message);
    } else {
      res.end(`Failed to complete OAuth process: ${e.message}`);
    }
  }
}

export default handler
