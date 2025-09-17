import { UUID } from 'crypto';
import ClientChakkiDetails from './ClientChakkiDetails';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <ClientChakkiDetails id={id as UUID} />;
};

export default Page;
