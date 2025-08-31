'use client';

import { motion } from 'framer-motion';
import React from 'react';

export type AnimationType = 'fade-up' | 'fade-left' | 'fade-right' | 'scale-up';

interface FadeProps {
  children: React.ReactNode;
  index?: number; // for stagger
  animation?: AnimationType;
}

export const Fade: React.FC<FadeProps> = ({
  children,
  index = 0,
  animation = 'fade-up',
}) => {
  let variants;

  switch (animation) {
    case 'fade-left':
      variants = {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 },
      };
      break;
    case 'fade-right':
      variants = {
        initial: { opacity: 0, x: 20 },
        animate: { opacity: 1, x: 0 },
      };
      break;
    case 'scale-up':
      variants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: { opacity: 1, scale: 1 },
      };
      break;
    case 'fade-up':
    default:
      variants = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
      };
      break;
  }

  return (
    <motion.div
      initial={variants.initial}
      whileInView={variants.animate}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}>
      {children}
    </motion.div>
  );
};
