// app/loading.tsx
'use client';

import { motion } from 'framer-motion';
import { Music } from 'lucide-react';

export default function Loading() {
  return (
    <div className='flex items-center justify-center h-screen bg-black text-white'>
      <motion.div
        className='flex flex-col items-center'
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}>
          <Music
            size={64}
            style={{ color: '#E7CD78' }}
          />
        </motion.div>
        <p className='mt-4 text-xl font-semibold'>Loading your vibe...</p>
      </motion.div>
    </div>
  );
}
