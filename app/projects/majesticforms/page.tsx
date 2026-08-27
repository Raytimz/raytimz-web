import ProjectPage from '../project-page';
import { getProjectMetadata } from '../project-metadata';

export const dynamic = 'force-dynamic';
export const metadata = getProjectMetadata('majesticforms', 'en');

export default function MajesticFormsPage() {
  return <ProjectPage locale="en" projectId="majesticforms" />;
}
