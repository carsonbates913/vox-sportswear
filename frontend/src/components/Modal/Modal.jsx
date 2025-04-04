import ReactDOM from 'react-dom';
import { motion } from 'motion/react';
import { useEffect } from 'react';

import './Modal.css';

export default function Modal(props) {

 useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    }
 })

 return ReactDOM.createPortal((
  <motion.div className="modal"
    initial={{ opacity: 0, y: '20px', x: '-50%' }}
    animate={{ opacity: 1, y: "-50%", x: '-50%' }}>
    {props.children}
  </motion.div>
 ), document.getElementById('modal-portal-root'));
}