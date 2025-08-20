import { ChakkiDetails } from '@/app/features/chakkis/details';
import { UUID } from 'crypto';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ChakkiDetails id={id as UUID} />;
};

export default Page;
