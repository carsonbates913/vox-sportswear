import './ImageUpload.css';

import { useState, useEffect } from 'react';
import camera from '../../assets/camera.svg';
import { uploadProduct } from '../../services/datastore.js';

export default function ImageUpload({register, className, id, selectedImage}) {

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();

  useEffect(() => {
    if (!selectedImage || selectedImage.length === 0) {
      setFile(null);
      return;
    }
    setFile(selectedImage[0]); // Select the first file
  }, [selectedImage]);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);

    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [file, previewUrl]);

  return (
    <div className={`image-upload ${className}`}>
      <label htmlFor={id}></label>
        {previewUrl ? 
          (<img className="image-upload__preview-img" src={previewUrl}/>) :
          (<>
            <img className="image-upload__camera-icon" src={camera}></img>
            <h3>Upload Image</h3>
          </>)
        }
      <input {...register("file")} id={id} style={{display: "none"}} type="file" accept=".jpg,.png,.jpeg"/>
    </div>
  )
}