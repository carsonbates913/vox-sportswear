import { useState } from 'react';

import ImageUpload from '../ImageUpload/ImageUpload.jsx';

export default function CustomizationInput({register}) {

  const [addPersonalDesign, setAddPersonalDesign] = useState(false);

  return(
    <>
      <div className="customizeables__personal-design">
        <p className="customizeables__label" onClick={()=>{setAddPersonalDesign(!addPersonalDesign)}}>Personal Design +</p>
        {addPersonalDesign && (
            <>
            <textarea {...register("designNotes")} className="view-product-personal-customization" name="customization"/>
            <ImageUpload className="custom-image" id="customImage"/>
            <label className="image-customization-label">
            </label>
            </>
        )}
      </div>
    </>
  )
}