import { memo } from 'react';
import { Image } from 'utils/next';
import about from 'assets/json/about.json';
import feelingProud from 'assets/svg/feelingProud.svg';
import styles from '../assets/scss/pages/About.module.scss';
import { Heading, Paragraph, NamePlate, ProfileInfo, ImageFrame, PageFrame, Skills, HeadMeta } from 'components';

function Page() {
  return (
    <>
      <HeadMeta title={about.title} ogImage={`${process.env.NEXT_PUBLIC_OG_IMAGE}/page/${about.title}`} />
      <PageFrame classNmae={styles.page}>
        <>
          <div className={styles.profile}>
            <div className={styles.text_wrapper}>
              <Heading rank={1} text={about.profile.title} className={styles.heading} />
              <NamePlate className={styles.title} />
              <Paragraph className={styles.introduction} text={about.profile.introduction} />
              <ProfileInfo data={about.profile.info} className={styles.info} />
            </div>
            <ImageFrame className={styles.image_frame}>
              <Image
                src={feelingProud.src}
                alt={`${about.profile.title.toLowerCase()}_featured_image`}
                width={711}
                height={670}
                priority
              />
            </ImageFrame>
          </div>
          <p id="test">テストアンカー</p>
          <div className={styles.skills}>
            <Skills data={about.skills} />
          </div>
        </>
      </PageFrame>
    </>
  );
}

export default memo(Page);
