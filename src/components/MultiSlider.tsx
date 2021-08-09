import { Fragment as _ } from 'react';
import Slick, { Settings } from 'react-slick';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/MultiSlider.module.scss';

export default function MultiSlider({
  data,
  className,
}: {
  data: { name: string; icon: string; vscodeIcon: boolean }[];
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
  };
  return (
    <Slick {...settings} className={`${styles.entire} ${className}`}>
      {data[0].name
        ? data.map((el: typeof data[0], i: number) => (
            <_ key={i}>
              {el.vscodeIcon ? (
                <Iconify
                  icon={`vscode-icons:file-type-${el.icon}`}
                  className={styles.lang_icon}
                />
              ) : (
                <Iconify icon={`logos:${el.icon}`} className={styles.lang_icon} />
              )}
              <p className={styles.lang_title}>{el.name}</p>
            </_>
          ))
        : ''}
    </Slick>
  );
}
