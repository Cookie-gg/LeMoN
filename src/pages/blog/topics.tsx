import { Settings } from 'react-slick';
import { Fragment as _, memo } from 'react';
import { GetStaticProps } from 'utils/next';
import topics from 'assets/json/topics.json';
import { Icon as Iconify } from '@iconify/react';
import styles from '../../assets/scss/pages/Topics.module.scss';
import { ArticleList, Heading, HeadMeta, PageFrame } from 'components';
import { publicState } from 'utils/common';
import blogQuery, { BlogQueryType } from 'data/blogQuery';

function Page({ data, auth }: { data: BlogQueryType<'topics'>; auth: { state: boolean } }) {
  data = JSON.parse(String(data));
  const settings: Settings = {
    dots: false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [{ breakpoint: 1200, settings: { slidesToShow: 2 } }],
  };
  return (
    <>
      <HeadMeta title={topics.title}>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
      </HeadMeta>
      <PageFrame className={styles.page}>
        <>
          <Heading text={topics.all.title} rank={1} className={styles.heading} />
          {data.all.map((topic, i) => (
            <_ key={i}>
              <ArticleList
                id={topic.name.toLowerCase()}
                slider
                vertical
                data={publicState(topic.articles, auth.state)}
                className={styles.articles}
                shiftList={
                  <li className={`${styles.card} shift_list`}>
                    <Iconify
                      fr={''}
                      icon={topic.icon.slice(0, 1) === '_' ? topic.icon.slice(1) : topic.icon}
                      style={{ filter: `${topic.icon.slice(0, 1) === '_' && 'invert()'}` }}
                      className={styles.icon}
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

export const getStaticProps: GetStaticProps = async () => ({
  props: { data: JSON.stringify((await blogQuery()).topics) },
  revalidate: 60,
});

export default memo(Page);
