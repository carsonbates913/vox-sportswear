import ReactDOM from 'react-dom'
import { motion } from 'motion/react';

import './Backdrop.css';

export default function Backdrop(props) {

  const content = 
      <motion.div 
      className="backdrop"
      style={{backgroundColor: props.backgroundColor}}
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: .4, type: 'spring'}}
      exit={{opacity: 0}}
      onClick={props.onClick}
  />

  return ReactDOM.createPortal(content, document.getElementById('backdrop-portal-root'));
}
