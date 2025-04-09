import { motion } from 'motion/react'

import './HeroTitle.css'
import paintStrokeWord from '../../assets/paint-stroke-word.svg'

export default function HeroTitle() {
  return (
    <motion.div
      className="hero-title"
    >
      <motion.div className="hero-title__image-container"
        initial={{opacity: 0, y: 0}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: .6, delay: 0.0}}>
        <motion.h1
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.0 }}  // Delay to make it appear after the container
        >
          MERCH
        </motion.h1>
        <motion.img
          src={paintStrokeWord}
          alt="Paintstroke"
          className="paintstroke"
        />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0 }}  // Delay to make the second "MADE SIMPLE" appear last
      >
        MADE SIMPLE
      </motion.h1>
    </motion.div>
  );
}