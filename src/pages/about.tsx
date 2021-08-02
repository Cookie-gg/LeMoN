import pages from '../assets/scss/pages/About.module.scss';
import { Heading, PageFrame, Svg, Title, List } from 'components';
import {
  faCalendarAlt,
  faAddressCard,
  faEnvelope,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import Paragraph from 'components/Paragraph';

export default function About() {
  const icon = [faCalendarAlt, faAddressCard, faEnvelope, faHome];
  // from data-base
  const info = [
    { content: '11th November, 2001' },
    { content: 'Front-end engineer' },
    { content: 'cookie.nkz@gmail.com' },
    { content: 'Kanagawa / Japan' },
  ];
  const career = [
    { date: new Date('2017/4'), content: 'Entered High School (general course)' },
    { date: new Date('2020/3'), content: 'Graduated High School' },
    {
      date: new Date('2020/4'),
      content: 'Entered University (information science and engineering)',
    },
    { date: new Date('2020/11'), content: 'Joined the intership as a web engineer' },
    { date: new Date('2021/6'), content: 'Quit the intership' },
  ];
  return (
    <PageFrame secStyles={[pages.profile, pages.career, pages.skills]} active={pages.active}>
      <>
        {
          <>
            <div className={pages.text_wrapper}>
              <Heading rank={1} text="PROFILE" className={pages.heading} />
              <Title rank={2} text="Cookie_gg" className={pages.title} />
              <Paragraph
                className={pages.sentence}
                text={
                  '" AIM FOR INTERESTING DEVELOPS "\nI like interesting develops. Any requirement will be interesting depending on the development method. In my opinion, interesting products are born from interesting development.'
                }
              />
              <List list={info} icon={icon} className={pages.info} />
            </div>
            <Svg name="profile" className={pages.svg} />
          </>
        }
        {
          <>
            <Svg name="career" className={pages.svg} />
            <div className={pages.text_wrapper}></div>
          </>
        }
        {<></>}
      </>
    </PageFrame>
  );
}
