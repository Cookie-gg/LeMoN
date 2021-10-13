import { Zenn } from 'types/common';
import { memo, ReactElement } from 'react';
import { compare, displayDate } from 'utils/common';
import { Twemoji } from 'react-emoji-render';
import styles from '../assets/scss/components/ArticleList.module.scss';
import Slider, { Settings } from 'react-slick';
import { Nlink } from 'components';

interface PropsType {
  className?: string;
  id?: string;
  data: Zenn[];
  display: number;
  shiftList?: ReactElement;
  pushList?: ReactElement;
  needDateParse?: boolean;
  vertical?: boolean;
  horizontal?: boolean;
  slider?: boolean;
  settings?: Settings;
}

function ArticleList({
  className,
  id,
  data,
  display,
  shiftList,
  pushList,
  vertical,
  horizontal,
  slider,
  settings,
}: PropsType) {
  const listBody = data.specifor(
    display,
    (value: Zenn) =>
      (process.env.NODE_ENV === 'production' ? value.published : true) && (
        <li key={value.id}>
          <Nlink href="/blog/[...id]" as={`/blog/${value.id}`}>
            <>
              <div className={styles.thumbnail}>
                {vertical && <span className={styles.type}>{value.type.toUpperCase()}</span>}
                <Twemoji svg className={styles.emoji} text={value.emoji} options={{ protocol: 'https' }} />
              </div>
              <div className={styles.text_wrapper}>
                <h2>{value.title}</h2>
                <div>
                  <time>{displayDate(new Date(value.releaseDate))}</time>
                  <p>
                    {value.topics.specifor(
                      horizontal ? 3 : 2,
                      (topic: string) => topic && <span key={topic}>{topic}</span>,
                    )}
                  </p>
                </div>
              </div>
            </>
          </Nlink>
        </li>
      ),
  );
  return (
    <>
      <ul
        className={`${styles.articles} ${vertical && styles.vertical} ${horizontal && styles.horizontal} ${
          slider && styles.slider
        } ${className}`}
        id={id}
      >
        {shiftList}
        {slider && display > 2 ? <Slider {...settings}>{listBody}</Slider> : listBody}
        {pushList}
      </ul>
    </>
  );
}

export default memo(ArticleList, (prev, next) => prev.display === next.display && compare(prev.data, next.data));
