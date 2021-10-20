import { memo } from 'react';
import { GetStaticProps, Image } from 'utils/next';
import aboutQuery, { AboutQueryType } from 'data/aboutQuery';
import pages from '../assets/scss/pages/About.module.scss';
import { Heading, Paragraph, NamePlate, ProfileInfo, ImageFrame, PageFrame, Skills, HeadMeta } from 'components';

export const getStaticProps: GetStaticProps = async () => ({
  props: { data: JSON.stringify(await aboutQuery()) },
  revalidate: 60,
});

function About({ data }: { data: AboutQueryType }) {
  data = JSON.parse(String(data));
  return (
    <>
      <HeadMeta title="About" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/About`} />
      <PageFrame classNmae={pages.about}>
        <>
          <div className={pages.profile}>
            <div className={pages.text_wrapper}>
              <Heading rank={1} text={data.profile.title} className={pages.heading} />
              <NamePlate className={pages.title} />
              <Paragraph className={pages.introduction} text={data.profile.introduction} />
              <ProfileInfo data={data.profile.info} className={pages.info} />
            </div>
            <ImageFrame className={pages.image_frame}>
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
