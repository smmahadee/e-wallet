'use client';

import Note from './Note';
import { motion } from 'framer-motion';
import { useWallet } from '@/store/useStore';

export default function () {
  const { totalNotes } = useWallet();

  return (
    <motion.main className='bg-white col-span-2 sm:col-span-1 grid grid-cols-1 lg:grid-cols-2 grid-rows-[160px] gap-10 px-6 py-4 rounded-md overflow-auto'>
      {totalNotes?.length > 0 ? (
        totalNotes.map((note, index) => (
          <Note key={note?.value} data={note} index={index} />
        ))
      ) : (
        <p className='text-center col-span-2 text-xl'>
          ☹️ Your wallet is empty, please add some notes.
        </p>
      )}
    </motion.main>
  );
}
