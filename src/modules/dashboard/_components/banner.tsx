'use client';

import { ArrowLeftIcon } from '@phosphor-icons/react';
import { motion } from 'motion/react';
import Image from 'next/image';
import cloud1 from '@/public/assets/cloud-1.svg';
import cloud2 from '@/public/assets/cloud-2.svg';
import cloud3 from '@/public/assets/cloud-3.svg';
import sand from '@/public/assets/sand.svg';
import palmTree from '@/public/assets/palm-tree.svg';
import sun from '@/public/assets/sun.svg';

const Banner = () => {
  return (
    <motion.div
      className="relative h-[12.5rem] w-full overflow-hidden rounded bg-[#cfe9ff]"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <motion.button
        type="button"
        className="absolute left-4 top-3 z-10 flex size-8 items-center justify-center rounded bg-[#b8dcfa]"
        initial={{ opacity: 0, x: -6 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        aria-label="Go back"
      >
        <ArrowLeftIcon size={16} weight="bold" className="text-text-primary" />
      </motion.button>

      <motion.div
        className="absolute left-[13%] top-[10%]"
        animate={{ x: [0, 14, 0] }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <Image src={cloud3} alt="" width={88} height={20} aria-hidden />
      </motion.div>

      <motion.div
        className="absolute left-[23%] top-[21%]"
        animate={{ x: [0, 10, 0] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      >
        <Image src={cloud2} alt="" width={68} height={17} aria-hidden />
      </motion.div>

      <motion.div
        className="absolute left-[32%] top-[32%]"
        animate={{ x: [0, 18, 0] }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      >
        <Image src={cloud1} alt="" width={94} height={23} aria-hidden />
      </motion.div>

      <div className="absolute -bottom-2 -left-1 w-[318px] max-w-[45%]">
        <Image
          src={sand}
          alt=""
          width={318}
          height={35}
          className="h-auto w-full"
          aria-hidden
        />
      </div>

      <motion.div
        className="absolute bottom-0 left-[4%]"
        style={{ originX: 0.5, originY: 1 }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0, rotate: [0, 1.5, 0, -1.5, 0] }}
        transition={{
          opacity: { duration: 0.5, delay: 0.2 },
          y: { duration: 0.5, delay: 0.2 },
          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          },
        }}
      >
        <Image src={palmTree} alt="" width={95} height={123} aria-hidden />
      </motion.div>

      <motion.div
        className="absolute right-4 top-2"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{
          opacity: 1,
          scale: [1, 1.05, 1],
          rotate: [0, 4, 0, -4, 0],
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.15 },
          scale: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          },
          rotate: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 0.5,
          },
        }}
      >
        <Image src={sun} alt="" width={82} height={72} aria-hidden />
      </motion.div>
    </motion.div>
  );
};

export default Banner;
