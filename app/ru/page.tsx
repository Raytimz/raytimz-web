import LandingPage from '../landing-page';
import { landingCopy } from '../localization';

export default function RussianHome() {
  return <LandingPage copy={landingCopy.ru} />;
}
