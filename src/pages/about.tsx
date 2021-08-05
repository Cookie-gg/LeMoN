import pages from '../assets/scss/pages/About.module.scss';
import { Heading, PageFrame, SvgFrame, Paragraph, Title, List } from 'components';
import {
  faCalendarAlt,
  faAddressCard,
  faEnvelope,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { Cookie_gg, Feelingproud } from 'svg';

export default function About() {
  const icon = [faCalendarAlt, faAddressCard, faEnvelope, faHome];
  // from data-base
  const info = [
    { content: '11th November, 2001' },
    { content: 'Front-end engineer' },
    { content: 'cookie.nkz@gmail.com' },
    { content: 'Kanagawa / Japan' },
  ];
  return (
    <PageFrame secStyles={[pages.profile, pages.skills]} active={pages.active}>
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
              <Feelingproud />
            </SvgFrame>
          </>
        }
        {
          <>
            <Heading rank={1} text="SKILLS" className={pages.heading} />
          </>
        }
      </>
    </PageFrame>
  );
}
