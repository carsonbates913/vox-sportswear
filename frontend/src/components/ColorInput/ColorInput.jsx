import { CSSTransition } from 'react-transition-group';
import { useEffect, useState, useRef } from 'react';

import './ColorInput.css';
import Backdrop from '../Backdrop/Backdrop.jsx';
import dropdown from '../../../public/assets/Dropdown.svg';

export default function ColorInput({register, selectedColor}) {

  const colorList = ["#FFFFFF", "#000000", "#D3D3D3", "#333333", "#F5F5DC", "#B38B6D", "#FFFFF0"];

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const openDropdown = () => {
    setIsOpen(true);
    console.log("hello");
  }
  const closeDropdown = () => {
    setIsOpen(false);
    console.log("helllllo");
  }

  return(
    <>
      <div className="color-input">
        <label>Color<span style={{fontWeight: "200"}}></span></label>
        <div className="color-input__dropdown">
          <div className="color-input__dropdown__selectedColor" onClick={openDropdown}>
            <div className="color-display" style={{backgroundColor: selectedColor}}></div>
            <img src={dropdown}></img>
          </div>
          <CSSTransition in={isOpen} nodeRef={dropdownRef} timeout={200} classNames="dropdown" mountOnEnter unmountOnExit>
            <div className="color-input__dropdown__list" ref={dropdownRef}>
              {colorList.map( color => {
                    return (
                      <label htmlFor={color} key={color} onClick={closeDropdown}> 
                          <div className="color-display" style={{backgroundColor: color}}></div>
                        <input id={color} {...register("color")} type="radio" style={{display: 'none'}} name="color" value={color} onClick={() => console.log("hello")}/>
                      </label>
                    )
                })}
            </div>
          </CSSTransition>
          <Backdrop show={isOpen} onClick={closeDropdown}/>
        </div>
      </div>
    </>
  )
}