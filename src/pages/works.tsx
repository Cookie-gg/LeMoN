import { memo } from 'react';
import { HeadMeta, PageFrame } from 'components';
import styles from '../assets/scss/pages/Works.module.scss';
import works from 'assets/json/works.json';

function Page() {
  return (
    <>
      <HeadMeta title={works.title} ogImage={`${process.env.OG_IMAGE}/page/${works.title}`} />
      <PageFrame classNmae={styles.entire}>
        <p>comming soon...</p>
      </PageFrame>
    </>
  );
}

export default memo(Page);
