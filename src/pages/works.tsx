import Lottie from 'react-lottie-player';
import * as animationData from '../assets/img/profile.json';
export default function Works() {
  return <Lottie loop={false} animationData={animationData} play />;
}
