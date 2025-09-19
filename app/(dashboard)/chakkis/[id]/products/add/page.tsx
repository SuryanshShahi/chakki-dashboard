import { AddProduct } from '@/app/features/chakkis/details/products/add';
import { UUID } from 'crypto';

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  return <AddProduct chakkiId={id as UUID} />;
};

export default Page;
