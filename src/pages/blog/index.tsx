import { Head } from "utils/next";

export default function Blog() {
  const data = [
    {title: 'The title', date: '20XX/XX/XX', content: 'The content'},
    {title: 'The title', date: '20XX/XX/XX', content: 'The content'},
    {title: 'The title', date: '20XX/XX/XX', content: 'The content'},
    {title: 'The title', date: '20XX/XX/XX', content: 'The content'},
    {title: 'The title', date: '20XX/XX/XX', content: 'The content'},
    {title: 'The title', date: '20XX/XX/XX', content: 'The content'},
    {title: 'The title', date: '20XX/XX/XX', content: 'The content'},
  ]
  return (
    <>
      <Head>
        <title>LeMoN | Works</title>
      </Head>
      <h1>Blog Page</h1>
    </>
  );
}
