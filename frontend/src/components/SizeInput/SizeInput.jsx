import './SizeInput.css';

import SizeBox from '../SizeBox/SizeBox.jsx';

export default function SizeInput({register, setValue}) {

  const sizeList = ["S", "M", "L", "XL"];

  return(
    <>
    <div className="size-input view-product-form__input">
      <div className="size-input__title"><span>Sizes</span></div>
      <div className="size-input__set">
          {sizeList.map( (size, index) => {
              return (
                  <SizeBox setValue={setValue} key={index} register={register} size={size}></SizeBox>
              )
          })}
      </div>
    </div>
  </>
  )
}