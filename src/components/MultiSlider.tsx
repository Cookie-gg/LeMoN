import { memo } from 'react';
import { compare } from 'utils/common';
import Slick, { Settings } from 'react-slick';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/MultiSlider.module.scss';

interface PropsType {
  data: { text: string; icon: string }[];
  className?: string;
}

function MultiSlider({ data, className }: PropsType) {
  const settings: Settings = {
    autoplay: true,
    autoplaySpeed: 8000,
    dots: false,
    infinite: true,
    slidesToScroll: 1,
    slidesToShow: 6,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 820,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <Slick {...settings} className={`${styles.entire} ${className}`}>
      {data.map((el: { text: string; icon: string }, i: number) => (
        <div className={styles.inner} key={i}>
          <Iconify icon={el.icon} />
          <p>{el.text}</p>
        </div>
      ))}
    </Slick>
  );
}

export default memo(MultiSlider, (prev: PropsType, next: PropsType) => compare<PropsType>(prev, next));
