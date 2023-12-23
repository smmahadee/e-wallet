'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function () {
  return (
    <nav className='col-span-2 flex gap-2 justify-center uppercase items-center text-md font-medium'>
      <Image
        src='/logo.png'
        width={30}
        height={10}
        alt='logo'
        style={{ width: 'auto', height: 'auto' }}
      />
      <motion.p
        initial={{ fontSize: 0 }}
        animate={{ fontSize: '20px' }}
        transition={{ duration: 0.2, type: 'spring', stiffness: 80 }}
      >
        My Wallet
      </motion.p>
    </nav>
  );
}
