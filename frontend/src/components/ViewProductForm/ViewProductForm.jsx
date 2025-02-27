import { useForm } from "react-hook-form"

import './ViewProductForm.css'
import ColorInput from '../ColorInput/ColorInput.jsx';
import SizeInput from '../SizeInput/SizeInput.jsx';
import CustomizationInput from "../CustomizationInput/CustomizationInput.jsx";

export default function ViewProductForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = (data) => {console.log(data)}

  const selectedColor = watch("color");


  return (
    <form className="view-product-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="view-product-form__product-info">
          <p className="product-info__name">{props.productInfo.name}</p>
          <p className="product-info__description">Customizeable Label</p>
      </div>
      <div className="form__line-break"/>
      <ColorInput selectedColor={selectedColor} register={register}/>
      <SizeInput register={register}/>
      <CustomizationInput register={register}/>
      {/*}
      <SizeInput register={register} />
      <div className="customizeables__size">
          <p className="customizeables__label">Size*</p>
          <div className="customizeables__set">
              {sizeList.map(size => {
                  return (
                      <label key={size} htmlFor={size} className={`view-product-size-label ${formData.size === size ? 'size-selected' : ''}`}>
                          {size}
                          <input key={size} type="radio" className="size-selector" id={size} name="size"  value={size} onChange={e=>{handleFormChange(e)}} checked={formData.size===size}/>
                      </label>
                  )
              })}
          </div>
      </div>
      <div className="customizeables__personal-design">
          <p className="customizeables__label" onClick={()=>{setAddPersonalDesign(!addPersonalDesign)}}>Personal Design +</p>
          {addPersonalDesign && (
              <>
              <textarea className="view-product-personal-customization" name="customization" value={formData.customization} onChange={(e) => {handleFormChange(e)}}/>
              <ImageUpload className="custom-image" id="customImage"/>
              <label className="image-customization-label">
              </label>
              </>
          )}
      </div>
*/}
      <button className="form__add-cart-button">Add To Cart</button>
    </form>
  )
}