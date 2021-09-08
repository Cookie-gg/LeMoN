import { useMount } from 'hooks';
import { GetServerSideProps, Head } from 'utils/next';
import aboutQuery, { DataType } from 'data/aboutQuery';
import pages from '../assets/scss/pages/About.module.scss';
import { Heading, SecFrame, Paragraph, NamePlate, MultiSlider, SingleSlider, ProfileInfo, DataRes } from 'components';

export const getServerSideProps: GetServerSideProps = async () => {
  const { data, error } = await aboutQuery();
  if (error) {
    return { props: { error: JSON.stringify(error) } };
  }
  return { props: { data: JSON.stringify(data) } };
};

export default function About({ data, error }: { data: DataType; error?: string }) {
  const isMounted = useMount();
  data = JSON.parse(String(data));
  return (
    <>
      <Head>
        <title>LeMoN | About</title>
      </Head>
      <DataRes error={error} />
      <SecFrame
        sectionClass={[`${pages.profile} ${isMounted && pages.mounted}`, pages.skills]}
        activeClass={pages.active}
      >
        <>
          <>
            <div className={pages.text_wrapper}>
              <Heading rank={1} text={data.profile.title} className={pages.heading} />
              <NamePlate className={pages.title} />
              <Paragraph className={pages.introduction} text={data.profile.introduction} />
              <ProfileInfo data={data.profile.info} className={pages.info} />
            </div>
            <div className={pages.concept_img}>
              <img src={data.profile.featuredImage} alt={`${data.profile.title.toLowerCase()}_featured_image`} />
            </div>
          </>
          <>
            <Heading rank={1} text={data.tools.title} className={pages.heading} />
            <SingleSlider data={data.tools.slide} className={pages.tools} />
            <Heading rank={1} text={data.langs.title} className={pages.heading} />
            <MultiSlider data={data.langs.slide} className={pages.langs} />
          </>
        </>
      </SecFrame>
    </>
  );
}
