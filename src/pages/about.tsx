import pages from '../assets/scss/pages/About.module.scss';
import { PageFrame } from 'components';
import { Image } from 'utils/next';
import profile from '../assets/img/profile.svg';

export default function About() {
  return (
    <PageFrame pageStyles={[pages.profile, pages.skills]}>
      <>
        {
          <>
            <h1>PROFILE</h1>
            <Image src={profile} alt="profile image" className={pages.image} />
          </>
        }
        {
          <>
            <p>dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
          </>
        }
      </>
    </PageFrame>
  );
}
