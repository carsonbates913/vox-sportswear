import { useState } from 'react';

import './CustomizationInput.css'
import ImageUpload from '../ImageUpload/ImageUpload.jsx';

export default function CustomizationInput({register, selectedImage}) {

  const [textValue, setTextValue] = useState('');

  return(
    <>
      <div className="customization-input">
        <p className="customization-input__title">Request Notes</p>
        {(
            <>
            <textarea {...register("designNotes")} className="view-product-personal-customization"/>
            <ImageUpload register={register} className="custom-image" id="customImage" selectedImage={selectedImage}/>
            <label className="image-customization-label">
            </label>
            </>
        )}
      </div>
    </>
  )
}