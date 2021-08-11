import { Fragment as _ } from 'react';
import Slick, { Settings } from 'react-slick';
import { Title, Paragraph } from 'components';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/SingleSlider.module.scss';

export default function SingleSlider({
  data,
  className,
}: {
  data: {
    title: string;
    explain: string;
    icon: string;
    bg: string;
  }[];
  className: string;
}) {
  const settings: Settings = {
    autoplay: false,
    autoplaySpeed: 8000,
    dots: false,
    fade: true,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 1,
    swipeToSlide: true,
  };
  return (
    <div className={`${className} ${styles.entire}`}>
      <Slick {...settings}>
        {data.map((el: typeof data[0], i: number) => (
          <_ key={i}>
            <div className={styles.image}>
              <span
                style={{
                  backgroundImage: `url(${el.bg !== undefined ? el.bg : ''})`,
                }}
              ></span>
            </div>
            <div className={styles.text_wrapper}>
              <Title rank={2} text={el.title} />
              <Paragraph text={el.explain} />
            </div>
            <Iconify icon={el.icon} />
          </_>
        ))}
      </Slick>
    </div>
  );
}
