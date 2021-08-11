import { Head } from 'utils/next';
import pages from '../assets/scss/pages/About.module.scss';
import {
  Heading,
  PageFrame,
  ImageFrame,
  Paragraph,
  NamePlate,
  List,
  MultiSlider,
  SingleSlider,
} from 'components';
import {
  faCalendarAlt,
  faAddressCard,
  faEnvelope,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { Cookie_gg, Feelingproud } from 'svg';
import { useDbxGet } from 'hooks';

export default function About() {
  const icon = [faCalendarAlt, faAddressCard, faEnvelope, faHome];
  const links = useDbxGet('/about');

  // from data-base
  const info = [
    { content: '11th November, 2001' },
    { content: 'Front-end engineer' },
    { content: 'cookie.nkz@gmail.com' },
    { content: 'Kanagawa / Japan' },
  ];
  const langs = [
    { name: 'HTML LS', icon: 'html', vscodeIcon: true },
    { name: 'CSS3', icon: 'css', vscodeIcon: true },
    { name: 'JavaScript', icon: 'javascript', vscodeIcon: false },
    { name: 'TypeScript', icon: 'typescript-icon', vscodeIcon: false },
    { name: 'Webpack', icon: 'webpack', vscodeIcon: false },
    { name: 'React', icon: 'react', vscodeIcon: false },
    { name: 'Next.js', icon: 'nextjs', vscodeIcon: false },
    { name: 'Vue.js', icon: 'vue', vscodeIcon: false },
    { name: 'Nuxtjs', icon: 'nuxt-icon', vscodeIcon: false },
    { name: 'Node.js', icon: 'nodejs-icon', vscodeIcon: false },
    { name: 'NestJS', icon: 'nestjs', vscodeIcon: false },
    { name: 'MongoDB', icon: 'mongo', vscodeIcon: true },
    { name: 'GraphQL', icon: 'graphql', vscodeIcon: false },
    { name: 'GitHub', icon: 'github-icon', vscodeIcon: false },
    { name: 'C++', icon: 'c-plusplus', vscodeIcon: false },
    { name: 'C', icon: 'c', vscodeIcon: false },
  ];
  const tools = [
    {
      title: 'Visual Studio Code',
      explain: 'My main source-code editor',
      icon: 'file-icons:vscode',
      bg: links[1],
    },
    {
      title: 'Adobe Photoshop',
      explain: 'My main image editor',
      icon: 'cib:adobe-photoshop',
      bg: links[0],
    },
  ];
  return (
    <>
      <Head>
        <title>LeMoN | About</title>
      </Head>
      <PageFrame secStyles={[pages.profile, pages.skills]} active={pages.active}>
        <>
          {
            <>
              <div className={pages.text_wrapper}>
                <Heading rank={1} text="PROFILE" className={pages.heading} />
                <NamePlate rank={2} className={pages.title}>
                  <Cookie_gg />
                </NamePlate>
                <Paragraph
                  className={pages.sentence}
                  text={
                    '" AIM FOR INTERESTING DEVELOPS "\nI like interesting develops. Any requirement will be interesting depending on the development method. In my opinion, interesting products are born from interesting development.'
                  }
                />
                <List list={info} icon={icon} className={pages.info} />
              </div>
              <ImageFrame className={pages.concept_img}>
                <Feelingproud />
              </ImageFrame>
            </>
          }
          {
            <>
              <Heading rank={1} text="TOOLS" className={pages.heading} />
              <SingleSlider data={tools} className={pages.tools} />
              <Heading rank={1} text="LANGS" className={pages.heading} />
              <MultiSlider data={langs} className={pages.langs} />
            </>
          }
        </>
      </PageFrame>
    </>
  );
}
