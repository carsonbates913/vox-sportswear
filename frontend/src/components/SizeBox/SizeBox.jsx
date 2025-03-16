import { useState, useEffect } from 'react';

import './SizeBox.css';

export default function SizeBox({register, size, setValue}) {

  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  }

  useEffect(() => {
    if (!isActive) {
      setValue(`sizes.${size}`, 0); // Reset value when inactive
    }
  }, [isActive, setValue, size]);

  return (
    <div className={`size-box ${isActive && 'active'}`}>
      <label className="size-box__label" onClick={toggleActive}>
        {size}
      </label>
      <div className="size-box__input-container"> 
        <input type="number" {...register(`sizes.${size}`, { valueAsNumber: true, min: 0 })} defaultValue={0} ></input>
      </div>
  </div>
  )

}