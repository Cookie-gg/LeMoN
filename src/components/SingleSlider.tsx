import { Fragment as _ } from 'react';
import Slick, { Settings } from 'react-slick';
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
              <img src={el.bg} alt={el.title} />
            </div>
            <div className={styles.text_wrapper}>
              <h2>
                <span>{el.title}</span>
              </h2>
              <p>
                <span>{el.explain}</span>
              </p>
            </div>
            <Iconify icon={el.icon} />
          </_>
        ))}
      </Slick>
    </div>
  );
}
