import Slick, { Settings } from 'react-slick';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/MultiSlider.module.scss';

export default function MultiSlider({
  data,
  className,
}: {
  data: { name: string; icon: string }[];
  className?: string;
}) {
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
      {data.map((el: typeof data[0], i: number) => (
        <div className={styles.inner} key={i}>
          <Iconify icon={el.icon} />
          <p>{el.name}</p>
        </div>
      ))}
    </Slick>
  );
}
