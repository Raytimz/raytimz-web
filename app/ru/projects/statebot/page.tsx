import ProjectPage from '../../../projects/project-page';
import { getProjectMetadata } from '../../../projects/project-metadata';

export const dynamic = 'force-dynamic';
export const metadata = getProjectMetadata('statebot', 'ru');

export default function RussianStateBotPage() {
  return <ProjectPage locale="ru" projectId="statebot" />;
}
