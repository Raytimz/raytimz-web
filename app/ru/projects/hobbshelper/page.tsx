import ProjectPage from '../../../projects/project-page';
import { getProjectMetadata } from '../../../projects/project-metadata';

export const dynamic = 'force-dynamic';
export const metadata = getProjectMetadata('hobbshelper', 'ru');

export default function RussianHobbsHelperPage() {
  return <ProjectPage locale="ru" projectId="hobbshelper" />;
}
