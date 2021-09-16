import { useMount, useWindowDimensions } from 'hooks';
import { GetStaticProps, Head } from 'utils/next';
import aboutQuery, { DataType } from 'data/aboutQuery';
import pages from '../assets/scss/pages/About.module.scss';
import { Heading, Paragraph, NamePlate, ProfileInfo, DataRes, ImageFrame, PageFrame, Skills } from 'components';

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await aboutQuery();
  if (error) {
    return { props: { error: JSON.stringify(error) } };
  }
  return { props: { data: JSON.stringify(data) }, revalidate: 60 };
};

export default function About({ data, error }: { data: DataType; error?: string }) {
  const windowWidth = useWindowDimensions().width as number;
  const isMounted = useMount();
  data = JSON.parse(String(data));
  const featuredImage = (
    <ImageFrame className={pages.image_frame}>
      <img src={data.profile.feelingProud} alt={`${data.profile.title.toLowerCase()}_featured_image`} />
    </ImageFrame>
  );
  return (
    <>
      <Head>
        <title>LeMoN | About</title>
      </Head>
      <DataRes error={error} />
      <PageFrame classNmae={`${pages.about} ${isMounted && pages.mounted}`}>
        <>
          <div className={pages.profile}>
            <div className={pages.text_wrapper}>
              <Heading rank={1} text={data.profile.title} className={pages.heading} />
              <NamePlate className={pages.title} />
              {windowWidth < 820 && featuredImage}
              <Paragraph className={pages.introduction} text={data.profile.introduction} />
              <ProfileInfo data={data.profile.info} className={pages.info} />
            </div>
            {windowWidth > 820 && featuredImage}
          </div>
          <Skills data={data.skills} className={pages.skills} />
        </>
      </PageFrame>
    </>
  );
}
