import { MONEY_FORMAT } from '@/utils/constants';
import { formatCurrency, generateRandomNumber } from '@/utils/helper';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useMemo } from 'react';

export default function ({ data, index }) {
  const totalValue = useMemo(() => data?.value * data?.quantity, [data]);
  const randomNumber = useMemo(() => generateRandomNumber(1, 4), []);

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: '20px' }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 * index }}
      exit={{ opacity: 0, y: '20px' }}
      className='relative h-40 w-full   rounded-md '
    >
      <Image
        className='object-cover'
        src={`${randomNumber % 2 == 0 ? '/note1.webp' : '/note2.webp'}`}
        fill
        alt='Note image'
      />
      <div
        className={`absolute flex items-end gap-1  top-4 left-4 ${
          randomNumber % 2 == 0 ? 'text-primary' : 'text-secondary'
        }`}
      >
        <p className='text-5xl font-bold'>{data?.value}</p>
        <span className='text-2xl pb-.5'> {MONEY_FORMAT}</span>
      </div>

      {/* TOTAL NOTES  */}
      <div className='absolute flex flex-col justify-center items-center text-center  bg-white  min-w-20 min-h-20 p-2 text-orange-400 rounded-full -bottom-2 -left-4 shadow-md'>
        <p className='text-3xl font-bold leading-[.8]'>{data?.quantity} </p>
        <p className='text-xs '>Notes</p>
      </div>
      {/* TOTAL BALANCE  */}
      <div className='absolute flex flex-col justify-center h-[55px] min-w-28 rounded-sm bg-white px-2 text-orange-400 bottom-0 right-0  shadow-md'>
        <p className='text-sm font-medium '>Total</p>
        <p className='text-2xl font-semibold leading-[.8]'>
          {formatCurrency(totalValue)}
        </p>
      </div>
    </motion.div>
  );
}
