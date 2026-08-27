import ProjectPage from '../project-page';
import { getProjectMetadata } from '../project-metadata';

export const dynamic = 'force-dynamic';
export const metadata = getProjectMetadata('hobbshelper', 'en');

export default function HobbsHelperPage() {
  return <ProjectPage locale="en" projectId="hobbshelper" />;
}
