import { NextApiRequest, NextApiResponse } from 'utils/next';

export default function dynamicAPI(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { pid },
  } = req;

  res.end(`Post: ${pid}`);
}
