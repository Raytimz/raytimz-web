import ProjectPage from '../project-page';
import { getProjectMetadata } from '../project-metadata';

export const dynamic = 'force-dynamic';
export const metadata = getProjectMetadata('statebot', 'en');

export default function StateBotPage() {
  return <ProjectPage locale="en" projectId="statebot" />;
}
