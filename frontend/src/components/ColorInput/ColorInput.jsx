import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import './ColorInput.css';
import Backdrop from '../Backdrop/Backdrop.jsx';
import dropdown from '../../assets/Dropdown.svg';

export default function ColorInput({register, selectedColor}) {

  const colorList = [{hex: null, name: "See Request Notes" }, {hex: "#000000", name: "Black"}, {hex: "#FFFFFF", name: "White"}, {hex: "#8B4513", name: "Brown"}, {hex: "#006400", name: "Dark Green"}, {hex: "#90EE90", name: "Light Green"}, {hex: "#FFFF00", name: "Yellow"}, {hex: "#FFA500", name: "Orange"}, {hex: "#ADD8E6", name: "Light Blue"}, {hex: "#00008B", name: "Dark Blue"}, {hex: "#FFC0CB", name: "Pink"}, {hex: "#800080", name: "Purple"}, {hex: "#800000", name: "Maroon"}, {hex: "#D3D3D3", name: "Light Grey"}, {hex: "#A9A9A9", name: "Dark Grey"}, {hex: "#FF0000", name: "Red"}, {hex: "#000080", name: "Navy"}, {hex: "#F0E68C", name: "Khaki"}]

  const [isOpen, setIsOpen] = useState(false);

  const openDropdown = () => {
    setIsOpen(true);
  }
  const closeDropdown = () => {
    setIsOpen(false);
  }

  return(
    <>
      <div className="color-input view-product-form__input">
        <div className="color-input__title">COLOR<span style={{fontWeight: "200"}}></span></div>
        <div className="color-input__dropdown">
          <div className="color-input__dropdown__selectedColor" onClick={openDropdown}>
            <div>
              <div className="color-display" style={{backgroundColor: selectedColor ? JSON.parse(selectedColor).hex : "", border: '1px solid lightgray'}}></div>
              <p>{selectedColor ? JSON.parse(selectedColor).name : ""}</p>
            </div>
            <img src={dropdown} style={{rotate: isOpen && "180deg"}}></img>
          </div>
          <AnimatePresence>
            {isOpen && (
              <>
                <motion.div 
                  initial={{opacity: 0, scale: 0.9}}
                  animate={{opacity: 1, scale: 1}}
                  exit={{opacity: 0, scale: 0.9}}
                  transition={{duration: .2, type: "spring"}}
                  className="color-input__dropdown__list">
                  {colorList.map( color => {
                        return (
                          <label htmlFor={color.hex} key={color.hex} onClick={closeDropdown}> 
                              <div className="color-display" style={{backgroundColor: color.hex}}></div>
                              <p>{color.name}</p>
                            <input id={color.hex} {...register("color")} type="radio" style={{display: 'none'}} name="color" value={JSON.stringify(color)}/>
                          </label>
                        )
                    })}
                </motion.div>
                <Backdrop onClick={closeDropdown} backgroundColor="rgba(0, 0, 0, 0)"/>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  )
}