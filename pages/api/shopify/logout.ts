import type { NextApiRequest, NextApiResponse } from 'next'

import { deleteCookie } from 'cookies-next'

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  deleteCookie('accessToken', { req, res })
  deleteCookie('currentStore', { req, res })

  res.writeHead(302, { Location: '/' })
  res.end()
}

export default handler
