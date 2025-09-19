'use client';

import { ChakkiDetails } from '@/app/features/chakkis/details';
import { UUID } from 'crypto';

export default function ClientChakkiDetails({ id }: { id: UUID }) {
  return <ChakkiDetails id={id} />;
}
