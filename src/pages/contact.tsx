import { GetStaticProps } from 'utils/next';
import { useMount, useWindowDimensions } from 'hooks';
import { DataRes, Form, Heading, HeadMeta, ImageFrame, PageFrame } from 'components';
import pages from '../assets/scss/pages/Contact.module.scss';
import contactQuery, { DataType } from 'data/contactQuery';

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await contactQuery();
  if (error) {
    return { props: { error: JSON.stringify(error) } };
  }
  return { props: { data: JSON.stringify(data) }, revalidate: 60 };
};

export default function Contact({ data, error }: { data: DataType; error?: string }) {
  const isMounted = useMount();
  data = JSON.parse(String(data));
  const windowWidth = useWindowDimensions().width as number;
  const featuredImage = (
    <ImageFrame className={pages.image_frame}>
      <img src={data.form.addressDelivery} alt={`${data.form.title.toLowerCase()}_featured_image`} />
    </ImageFrame>
  );
  return (
    <>
      <HeadMeta title="Contact" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Contact`} />
      <DataRes error={error} />
      <PageFrame classNmae={`${pages.contact} ${isMounted && pages.mounted}`}>
        <>
          <div className={pages.text_wrapper}>
            <Heading rank={2} text={data.form.title} className={pages.heading} />
            {windowWidth < 820 && featuredImage}
            <Form className={[pages.form, pages.sent, pages.thanks]} />
          </div>
          {windowWidth > 820 && featuredImage}
        </>
      </PageFrame>
    </>
  );
}
