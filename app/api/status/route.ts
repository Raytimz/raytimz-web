import { getPublicStatusSnapshot } from '../../status/status-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const snapshot = await getPublicStatusSnapshot();

  return Response.json(snapshot, {
    headers: {
      'Cache-Control': 'public, max-age=30, stale-while-revalidate=60',
    },
  });
}
