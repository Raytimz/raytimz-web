import ProjectPage from '../../../projects/project-page';
import { getProjectMetadata } from '../../../projects/project-metadata';

export const dynamic = 'force-dynamic';
export const metadata = getProjectMetadata('majesticforms', 'ru');

export default function RussianMajesticFormsPage() {
  return <ProjectPage locale="ru" projectId="majesticforms" />;
}
