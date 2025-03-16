import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';
import PropTypes from 'prop-types';

import './SideDrawer.css'

export default function SideDrawer(props) {

  const nodeRef = useRef(null);

  const content =   
    <CSSTransition nodeRef={nodeRef} in={props.show} timeout={200} classNames="slide-in-left" mountOnEnter unmountOnExit>
      <aside className="side-drawer" ref={nodeRef}>
        {props.children}
      </aside>
    </CSSTransition>

    return ReactDOM.createPortal(content, document.getElementById('nav-portal-root'));
  }

SideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.object,
  isStatic: PropTypes.object,
}