import pages from '../assets/scss/pages/About.module.scss';
import { Heading, PageFrame, SvgFrame, Title, List } from 'components';
import {
  faCalendarAlt,
  faAddressCard,
  faEnvelope,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import Paragraph from 'components/Paragraph';
import { Career, Cookie_gg, Profile } from 'svg';
import { sortByDate } from 'utils/common';
import { useEffect } from 'react';

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
    { year: 2020, month: 11, title: 'Joined the intership as a web engineer' },
    {
      year: 2020,
      month: 4,
      title: 'Entered University (information science and engineering)',
    },
    { year: 2021, month: 6, title: 'Quit the intership' },
    { year: 2020, month: 3, title: 'Graduated High School' },
    { year: 2017, month: 4, title: 'Entered High School (general course)' },
  ];
  return (
    <PageFrame secStyles={[pages.profile, pages.career, pages.skills]} active={pages.active}>
      <>
        {
          <>
            <div className={pages.text_wrapper}>
              <Heading rank={1} text="PROFILE" className={pages.heading} />
              <Title rank={2} className={pages.title}>
                <Cookie_gg />
              </Title>
              <Paragraph
                className={pages.sentence}
                text={
                  '" AIM FOR INTERESTING DEVELOPS "\nI like interesting develops. Any requirement will be interesting depending on the development method. In my opinion, interesting products are born from interesting development.'
                }
              />
              <List list={info} icon={icon} className={pages.info} />
            </div>
            <SvgFrame className={pages.concept_img}>
              <Profile />
            </SvgFrame>
          </>
        }
        {
          <>
            <SvgFrame className={pages.concept_img}>
              <Career />
            </SvgFrame>
            <div className={pages.text_wrapper}>
              <Heading rank={1} text="CAREER" className={pages.heading} />
              <ul className={pages.experience}>
                {sortByDate<typeof career>(career, 'desc').map(
                  (el: { year: number; month: number; title: string }, i: number) => (
                    <li key={i}>
                      <time>
                        <span>
                          {el.year}/{el.month}
                        </span>
                      </time>
                      <div>{el.title}</div>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </>
        }
        {<></>}
      </>
    </PageFrame>
  );
}
