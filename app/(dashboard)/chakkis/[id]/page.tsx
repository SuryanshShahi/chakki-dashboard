import { UUID } from 'crypto';
import ClientChakkiDetails from './ClientChakkiDetails';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <ClientChakkiDetails id={id as UUID} />;
};

export default Page;
