'use client';

import useWalletStore from '@/store/useWalletStore';
import Note from './Note';
import { motion } from 'framer-motion';

export default function () {
  const notes = useWalletStore(state => state.totalNotes);

  return (
    <motion.main className='bg-white col-span-2 sm:col-span-1 grid grid-cols-1 lg:grid-cols-2 grid-rows-[160px] gap-10 px-6 py-4 rounded-md overflow-auto'>
      {notes?.length > 0 ? (
        notes.map((note, index) => (
          <Note key={note?.value} data={note} index={index} />
        ))
      ) : (
        <p>No notes in your wallet, please add some note</p>
      )}
    </motion.main>
  );
}
