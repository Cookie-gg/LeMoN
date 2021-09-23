import { GetStaticProps } from 'utils/next';
import contactQuery, { DataType } from 'data/contactQuery';
import pages from '../assets/scss/pages/Contact.module.scss';
import { DataRes, Form, Heading, HeadMeta, ImageFrame, PageFrame } from 'components';

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await contactQuery();
  if (error) {
    return { props: { error: JSON.stringify(error) } };
  }
  return { props: { data: JSON.stringify(data) }, revalidate: 60 };
};

export default function Contact({ data, error }: { data: DataType; error?: string }) {
  data = JSON.parse(String(data));
  return (
    <>
      <HeadMeta title="Contact" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Contact`} />
      <DataRes error={error} />
      <PageFrame classNmae={pages.contact}>
        <>
          <div className={pages.text_wrapper}>
            <Heading rank={2} text={data.form.title} className={pages.heading} />
            <ImageFrame className={`${pages.image_frame} sp`}>
              <img src={data.form.addressDelivery} alt={`${data.form.title.toLowerCase()}_featured_image`} />
            </ImageFrame>
            <Form className={[pages.form, pages.sent, pages.thanks]} />
          </div>
          <ImageFrame className={`${pages.image_frame} pc`}>
            <img src={data.form.addressDelivery} alt={`${data.form.title.toLowerCase()}_featured_image`} />
          </ImageFrame>
        </>
      </PageFrame>
    </>
  );
}
