import pages from '../assets/scss/pages/About.module.scss';
import { Heading, PageFrame, SvgFrame, Paragraph, Title, List } from 'components';
import {
  faCalendarAlt,
  faAddressCard,
  faEnvelope,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { Cookie_gg, Feelingproud } from 'svg';
import { Icon as Iconify } from '@iconify/react';

export default function About() {
  const icon = [faCalendarAlt, faAddressCard, faEnvelope, faHome];
  // from data-base
  const info = [
    { content: '11th November, 2001' },
    { content: 'Front-end engineer' },
    { content: 'cookie.nkz@gmail.com' },
    { content: 'Kanagawa / Japan' },
  ];
  const skills: { name: string; icon: string; vscodeIcon: boolean }[] = [
    { name: 'HTML Living Standard', icon: 'html', vscodeIcon: true },
    { name: 'CSS3', icon: 'css-3', vscodeIcon: true },
    { name: 'JavaScript', icon: 'javascript', vscodeIcon: false },
    { name: 'TypeScript', icon: 'typescript-icon', vscodeIcon: false },
    { name: 'Webpack', icon: 'webpack', vscodeIcon: false },
    { name: 'React', icon: 'react', vscodeIcon: false },
    { name: 'Next.js', icon: 'nextjs', vscodeIcon: false },
    { name: 'Vue.js', icon: 'vue', vscodeIcon: false },
    { name: 'Nuxtjs', icon: 'nuxt-icon', vscodeIcon: false },
    { name: 'Node.js', icon: 'nodejs-icon', vscodeIcon: false },
    { name: 'Express.js', icon: 'express', vscodeIcon: false },
    { name: 'NestJS', icon: 'nestjs', vscodeIcon: false },
    { name: 'MongoDB', icon: 'mongo', vscodeIcon: true },
    { name: 'GraphQL', icon: 'graphql', vscodeIcon: false },
    { name: 'GitHub', icon: 'github-icon', vscodeIcon: false },
    { name: 'C++', icon: 'c-plusplus', vscodeIcon: false },
    { name: 'C', icon: 'c', vscodeIcon: false },
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
            <Iconify icon="vscode-icons:file-type-html" />
            {skills.map((el: { name: string; icon: string; vscodeIcon: boolean }, i: number) => (
              <li key={i}>
                <Iconify icon={'logos:' + icon} />
              </li>
            ))}
          </>
        }
      </>
    </PageFrame>
  );
}
