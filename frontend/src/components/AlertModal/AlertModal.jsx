import './AlertModal.css';
import Modal from '../Modal/Modal.jsx';
import Backdrop from '../Backdrop/Backdrop.jsx';
import { AnimatePresence } from 'motion/react';

export default function AlertModal(props) {

  return (
    <>
    <AnimatePresence>
      {props.show && (
        <>
            <Modal>
              <div className="alert-modal">
                <h1>{props.header}</h1>
                <p>{props.body}</p>
                <div className="alert-modal__btn-container">
                  <button className="alert-modal__btn" onClick={props.handleClear} style={{backgroundColor: 'black', color: 'white'}}>Close</button>
                  {props.children}
                </div>
              </div>
            </Modal>
            <Backdrop onClick={props.handleClear}/>
        </>
      )}
      </AnimatePresence>
    </>
  )
}