import { useState, useEffect } from 'react'
import { motion } from 'motion/react';

import './ScrollIndicator.css'
import downArrow from '../../assets/down-arrow.svg';

export default function ScrollIndicator() {

  const [isScrolled, setIsScrolled] = useState(false); 
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);


  useEffect(() => {

      const handleScroll = () => {
          setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
  }, [])

  return (
    <motion.div
      className="homepage__scroll-indicator"
      initial={{ opacity: 0, y: 50, x: "-50%" }}
      animate={{ opacity: 1, y: isScrolled ? 200 : 0, x: "-50%" }}
      transition={{
          duration: 0.6,
          ...(hasMounted ? {} : { delay: 1.2 })
      }}
    >
      <img src={downArrow}></img>
    </motion.div>
  )
}