import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'motion/react';

import './SideDrawer.css'

export default function SideDrawer(props) {

  const content =   
    <motion.aside className="side-drawer"
      initial={{ opacity: 0, x: '-100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100%' }}
      transition={{ duration: 0.2 }}>
      {props.children}
    </motion.aside>

    return ReactDOM.createPortal(content, document.getElementById('nav-portal-root'));
  }

SideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.object,
  isStatic: PropTypes.object,
}