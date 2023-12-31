'use client';

import { useWallet } from '@/store/useStore';
import { formatCurrency } from '@/utils/helper';

export default function () {
  const { totalBalance } = useWallet();

  return (
    <section className='col-span-2 flex flex-col sm:flex-row  sm:gap-4 sm:items-center '>
      <p className='text-xl sm:text-3xl uppercase font-medium'>
        Total balance :
      </p>
      <p className='text-2xl sm:text-4xl font-semibold'>
        {formatCurrency(totalBalance)}
      </p>
    </section>
  );
}
