import { ArticleList, DataRes, Heading, HeadMeta, PageFrame } from 'components';
import pages from '../../assets/scss/pages/Topics.module.scss';
import topicsQuery, { DataType } from 'data/topicsQuery';
import { GetStaticProps } from 'utils/next';
import { Fragment as _ } from 'react';
import { Settings } from 'react-slick';
import { Icon as Iconify } from '@iconify/react';

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await topicsQuery();
  if (error) {
    return { props: { error: JSON.stringify(error) } };
  }
  return { props: { data: JSON.stringify(data) }, revalidate: 60 };
};

export default function Topics({ data, error }: { data: DataType; error?: string }) {
  data = JSON.parse(String(data));
  const settings: Settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <>
      <HeadMeta title="Topics" ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/Topics`}>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
      </HeadMeta>
      <DataRes error={error} />
      <PageFrame classNmae={pages.topics}>
        <>
          <Heading text="ALL TOPICS" rank={1} className={pages.heading} />
          {data.topics.map((topic, i) => (
            <_ key={i}>
              <ArticleList
                id={topic.name.toLowerCase()}
                slider
                data={topic.articles}
                className={pages.articles}
                display={topic.articles.length}
                shiftList={
                  <li className={`${pages.card} shift_list`}>
                    <Iconify
                      icon={topic.icon.slice(0, 1) === '_' ? topic.icon.slice(1) : topic.icon}
                      style={{ filter: `${topic.icon.slice(0, 1) === '_' && 'invert()'}` }}
                      className={pages.icon}
                    />
                    <h2>{topic.name}</h2>
                  </li>
                }
                settings={settings}
              />
            </_>
          ))}
        </>
      </PageFrame>
    </>
  );
}
