import ReactDOM from 'react-dom'
import { useRef } from 'react'
import { CSSTransition } from 'react-transition-group';

import './Backdrop.css';

export default function Backdrop(props) {

  const nodeRef = useRef(null);

  const content = 
  <CSSTransition in={props.show} nodeRef={nodeRef} timeout={200} mountOnEnter unmountOnExit>
      <div className="backdrop" onClick={props.onClick} ref={nodeRef}></div>
  </CSSTransition>

  return ReactDOM.createPortal(content, document.getElementById('backdrop-portal-root'));
}
