import './SizeInput.css';

import SizeBox from '../SizeBox/SizeBox.jsx';

export default function SizeInput({register, setValue}) {

  const sizeList = ["XS", "S", "M", "L", "XL", "XXL"];

  return(
    <>
    <div className="size-input view-product-form__input">
      <div className="size-input__title"><span>SIZES</span></div>
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