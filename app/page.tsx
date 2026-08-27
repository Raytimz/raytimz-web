import LandingPage from './landing-page';
import { landingCopy } from './localization';

export default function Home() {
  return <LandingPage copy={landingCopy.en} />;
}
