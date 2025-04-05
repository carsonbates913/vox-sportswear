import { useState } from 'react';

import './CustomizationInput.css'
import ImageUpload from '../ImageUpload/ImageUpload.jsx';

export default function CustomizationInput({register, selectedImage}) {

  const [textValue, setTextValue] = useState('');

  return(
    <>
      <div className="customization-input">
        <p className="customization-input__title">REQUEST NOTES</p>
        {(
            <>
            <textarea {...register("designNotes")} className="view-product-personal-customization"/>
            <div className="custom-image__wrapper">
              <ImageUpload register={register} className="custom-image" id="customImage" selectedImage={selectedImage}/>
            </div>
            <label className="image-customization-label">
            </label>
            </>
        )}
      </div>
    </>
  )
}