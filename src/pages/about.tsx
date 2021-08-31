import { useMount } from 'hooks';
import { Head } from 'utils/next';
import pages from '../assets/scss/pages/About.module.scss';
import { Heading, SecFrame, Paragraph, NamePlate, MultiSlider, SingleSlider, ProfileInfo } from 'components';

// from data-base
import Vscode from 'assets/img/vscode.png';
import Photoshop from 'assets/img/photoshop.png';
import Feelingproud from 'assets/img/feelingproud.svg';
const data = {
  profile: {
    title: 'PROFILE',
    introduction:
      '" AIM FOR INTERESTING DEVELOPS "\nI like interesting develops. Any requirement will be interesting depending on the development method. In my opinion, interesting products are born from interesting development."',
    info: [
      { icon: 'fa-solid:calendar-alt', content: '11th November, 2001' },
      { icon: 'fa-solid:address-card', content: 'Front-end engineer' },
      { icon: 'fa-solid:envelope', content: 'cookie.nkz@gmail.com' },
      { icon: 'fa-solid:home', content: 'Kanagawa / Japan' },
    ],
    featuredImage: Feelingproud.src,
  },
  tools: {
    title: 'TOOLS',
    slide: [
      {
        title: 'Visual Studio Code',
        explain: 'My main source-code editor',
        icon: 'file-icons:vscode',
        bg: Vscode.src,
      },
      {
        title: 'Adobe Photoshop',
        explain: 'My main image editor',
        icon: 'cib:adobe-photoshop',
        bg: Photoshop.src,
      },
    ],
  },
  langs: {
    title: 'LANGS',
    slide: [
      { name: 'HTML LS', icon: 'vscode-icons:file-type-html' },
      { name: 'CSS3', icon: 'vscode-icons:file-type-css' },
      { name: 'JavaScript', icon: 'logos:javascript' },
      { name: 'TypeScript', icon: 'logos:typescript-icon' },
      { name: 'Webpack', icon: 'logos:webpack' },
      { name: 'React', icon: 'logos:react' },
      { name: 'Next.js', icon: 'logos:nextjs' },
      { name: 'Vue.js', icon: 'logos:vue' },
      { name: 'Nuxtjs', icon: 'logos:nuxt-icon' },
      { name: 'Node.js', icon: 'logos:nodejs-icon' },
      { name: 'NestJS', icon: 'logos:nestjs' },
      { name: 'MongoDB', icon: 'vscode-icons:file-type-mongo' },
      { name: 'GraphQL', icon: 'logos:graphql' },
      { name: 'GitHub', icon: 'logos:github-icon' },
      { name: 'C++', icon: 'logos:c-plusplus' },
      { name: 'C', icon: 'logos:c' },
    ],
  },
};

export default function About() {
  const isMounted = useMount();
  return (
    <>
      <Head>
        <title>LeMoN | About</title>
      </Head>
      <SecFrame
        sectionClass={[`${pages.profile} ${isMounted && pages.mounted}`, pages.skills]}
        activeClass={pages.active}
      >
        <>
          {
            <>
              <div className={pages.text_wrapper}>
                <Heading rank={1} text={data.profile.title} className={pages.heading} />
                <NamePlate className={pages.title} />
                <Paragraph className={pages.introduction} text={data.profile.introduction} />
                <ProfileInfo data={data.profile.info} className={pages.info} />
              </div>
              <div className={pages.concept_img}>
                <img src={data.profile.featuredImage} alt={`${data.profile.title.toLowerCase()}_featured_image`} />
              </div>
            </>
          }
          {
            <>
              <Heading rank={1} text={data.tools.title} className={pages.heading} />
              <SingleSlider data={data.tools.slide} className={pages.tools} />
              <Heading rank={1} text={data.langs.title} className={pages.heading} />
              <MultiSlider data={data.langs.slide} className={pages.langs} />
            </>
          }
        </>
      </SecFrame>
    </>
  );
}
