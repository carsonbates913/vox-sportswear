import { CSSTransition } from 'react-transition-group';
import { useEffect, useState, useRef } from 'react';

import './ColorInput.css';
import Backdrop from '../Backdrop/Backdrop.jsx';
import dropdown from '../../../public/assets/Dropdown.svg';

export default function ColorInput({register, selectedColor}) {

  const colorList = [{hex: null, name: "See Request Notes" }, {hex: "#000000", name: "Black"}, {hex: "#FFFFFF", name: "White"}, {hex: "#8B4513", name: "Brown"}, {hex: "#006400", name: "Dark Green"}, {hex: "#90EE90", name: "Light Green"}, {hex: "#FFFF00", name: "Yellow"}, {hex: "#FFA500", name: "Orange"}, {hex: "#ADD8E6", name: "Light Blue"}, {hex: "#00008B", name: "Dark Blue"}, {hex: "#FFC0CB", name: "Pink"}, {hex: "#800080", name: "Purple"}, {hex: "#800000", name: "Maroon"}, {hex: "#D3D3D3", name: "Light Grey"}, {hex: "#A9A9A9", name: "Dark Grey"}, {hex: "#FF0000", name: "Red"}, {hex: "#000080", name: "Navy"}, {hex: "#F0E68C", name: "Khaki"}]

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
      <div className="color-input view-product-form__input">
        <div className="color-input__title">Color<span style={{fontWeight: "200"}}></span></div>
        <div className="color-input__dropdown">
          <div className="color-input__dropdown__selectedColor" onClick={openDropdown}>
            <div>
              <div className="color-display" style={{backgroundColor: selectedColor ? JSON.parse(selectedColor).hex : ""}}></div>
              <p>{selectedColor ? JSON.parse(selectedColor).name : ""}</p>
            </div>
            <img src={dropdown} style={{rotate: isOpen && "180deg"}}></img>
          </div>
          <CSSTransition in={isOpen} nodeRef={dropdownRef} timeout={200} classNames="dropdown" mountOnEnter unmountOnExit>
            <div className="color-input__dropdown__list" ref={dropdownRef}>
              {colorList.map( color => {
                    return (
                      <label htmlFor={color.hex} key={color.hex} onClick={closeDropdown}> 
                          <div className="color-display" style={{backgroundColor: color.hex}}></div>
                          <p>{color.name}</p>
                        <input id={color.hex} {...register("color")} type="radio" style={{display: 'none'}} name="color" value={JSON.stringify(color)} onClick={() => console.log(selectedColor)}/>
                      </label>
                    )
                })}
            </div>
          </CSSTransition>
          {isOpen && (
            <Backdrop onClick={closeDropdown} backgroundColor="rgba(0, 0, 0, 0)"/>
          )}
        </div>
      </div>
    </>
  )
}