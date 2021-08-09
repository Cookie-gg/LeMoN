import { Fragment as _ } from 'react';
import Slick, { Settings } from 'react-slick';
import { Title, Paragraph } from 'components';
import { Icon as Iconify } from '@iconify/react';
import styles from '../assets/scss/components/SingleSlider.module.scss';
import Vscode from '../assets/img/vscode.png';
import Photoshop from '../assets/img/photoshop.png';

export default function SingleSlider({
  data,
  className,
}: {
  data: {
    title: string;
    explain: string;
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
  const image = [
    { bg: Vscode.src, icon: 'file-icons:vscode' },
    { bg: Photoshop.src, icon: 'cib:adobe-photoshop' },
  ];
  return (
    <div className={`${className} ${styles.entire}`}>
      <Slick {...settings}>
        {data.map((el: typeof data[0], i: number) => (
          <_ key={i}>
            <div className={styles.image}>
              <span style={{ backgroundImage: `url(${image[i].bg})` }}></span>
            </div>
            <div className={styles.text_wrapper}>
              <Title rank={2} text={el.title} />
              <Paragraph text={el.explain} className={styles.tool_explain} />
            </div>
            <Iconify icon={image[i].icon} />
          </_>
        ))}
      </Slick>
    </div>
  );
}
