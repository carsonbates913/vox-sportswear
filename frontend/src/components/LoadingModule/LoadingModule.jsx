import { AnimatePresence } from 'motion/react';

import './LoadingModule.css';
import Modal from '../Modal/Modal.jsx';
import Backdrop from '../Backdrop/Backdrop.jsx';

export default function LoadingModule(props) {

  return (
    <AnimatePresence>
      {props.modal && props.show && (
        <>
        <Modal>
          <div className={`loader-container ${props.modal && 'modal'}`} style={(props.viewport && { height: "calc(100vh - 80px)" })}>
            <div className="loader"></div>
          </div>
        </Modal>
        <Backdrop />
        </>
      )}

      {!props.modal && props.show && (
        <div className={`loader-container ${props.modal && 'modal'}`} style={(props.viewport && { height: "calc(100vh - 80px)" })}>
          <div className="loader"></div>
        </div>
      )}
    </AnimatePresence>
  )
}