import render from 'utils/markdown/renderer';
import { NextApiRequest, NextApiResponse } from 'utils/next';

export default function renderMarkdown(req: NextApiRequest, res: NextApiResponse) {
  const {
    body: { data },
  } = req;
  const renderedData = render(String(data));
  res.end(renderedData);
}
