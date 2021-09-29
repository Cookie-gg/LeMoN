import { GetStaticProps, Image } from 'utils/next';
import aboutQuery, { DataType } from 'data/aboutQuery';
import pages from '../assets/scss/pages/About.module.scss';
import {
  Heading,
  Paragraph,
  NamePlate,
  ProfileInfo,
  DataRes,
  ImageFrame,
  PageFrame,
  Skills,
  HeadMeta,
} from 'components';
import { memo } from 'react';

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await aboutQuery();
  if (error) {
    return { props: { error: JSON.stringify(error) } };
  }
  return { props: { data: JSON.stringify(data) }, revalidate: 60 };
};

function About({ data, error }: { data: DataType; error?: string }) {
  data = JSON.parse(String(data));
  return (
    <>
      <HeadMeta title="About" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/About`} />
      <DataRes error={error} />
      <PageFrame classNmae={pages.about}>
        <>
          <div className={pages.profile}>
            <div className={pages.text_wrapper}>
              <Heading rank={1} text={data.profile.title} className={pages.heading} />
              <NamePlate className={pages.title} />
              <ImageFrame className={`${pages.image_frame} sp`}>
                <Image
                  src={data.profile.feelingProud}
                  alt={`${data.profile.title.toLowerCase()}_featured_image`}
                  width={711}
                  height={670}
                  loading="lazy"
                  lazyBoundary="819"
                />
              </ImageFrame>
              <Paragraph className={pages.introduction} text={data.profile.introduction} />
              <ProfileInfo data={data.profile.info} className={pages.info} />
            </div>
            <ImageFrame className={`${pages.image_frame} pc`}>
              <Image
                src={data.profile.feelingProud}
                alt={`${data.profile.title.toLowerCase()}_featured_image`}
                width={711}
                height={670}
                loading="lazy"
                lazyBoundary="819"
              />
            </ImageFrame>
          </div>
          <div className={pages.skills}>
            <Skills data={data.skills} />
          </div>
        </>
      </PageFrame>
    </>
  );
}

export default memo(About);
