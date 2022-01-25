import Twitter from './Twitter';
import Youtube from './YouTube';
import Codepen from './CodePen';
import Jsfiddle from './JSfiddle';
import Codesandbox from './CodeSandbox';
import Githubgist from './GithubGist';
import Speakerdeck from './SpeakerDeck';
import Stackblitz from './StackBlitz';
import SlideShare from './SlideShare';
import { NamedExoticComponent } from 'react';
import { Element } from 'html-react-parser';

export const Widgets: {
  [key: string]: NamedExoticComponent<{ el: Element }> & {
    readonly type: ({ el }: { el: Element }) => JSX.Element;
  };
} = {
  twitter: Twitter,
  youtube: Youtube,
  codepen: Codepen,
  jsfiddle: Jsfiddle,
  codesandbox: Codesandbox,
  githubgist: Githubgist,
  speakerdeck: Speakerdeck,
  stackblitz: Stackblitz,
  slideshare: SlideShare,
};
