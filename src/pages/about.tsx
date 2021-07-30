import pages from '../assets/scss/pages/About.module.scss';
import { PageFrame } from 'components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faAddressCard,
  faEnvelope,
  faHome,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

export default function About() {
  const profile = [faCalendarAlt, faAddressCard, faEnvelope, faHome];
  const profile_content = [
    '11th November, 2001',
    'Front-end engineer',
    'cookie.nkz@gmail.com',
    'Kanagawa / Japan',
  ];
  return (
    <PageFrame pageStyles={[pages.profile, pages.skills]}>
      <>
        {
          <>
            <h1>PROFILE</h1>
            <div className={pages.image_wrapper}>
              <div className={pages.image}></div>
            </div>
            <div className={pages.text_wrapper}>
              <h2>
                <span>Cookie_gg</span>
              </h2>
              <ul>
                {profile.map((el: IconDefinition, i: number) => (
                  <li key={i}>
                    {i === 2 ? (
                      <a href={`mailto:${profile_content[i]}`}>
                        <Icon icon={el}></Icon>
                        <p>{profile_content[i]}</p>
                      </a>
                    ) : (
                      <>
                        <Icon icon={el}></Icon>
                        <p>{profile_content[i]}</p>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </>
        }
        {<></>}
      </>
    </PageFrame>
  );
}
