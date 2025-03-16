import './ImageUpload.css';

import { useState, useEffect } from 'react';
import imageUpload from '../../assets/image-upload.png';

export default function ImageUpload({register, className, id, selectedImage}) {

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

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
      <label htmlFor={id}>Upload Image</label>
        {previewUrl && 
              <div className="image-upload__preview">
        <img src={previewUrl}/>
        </div>}
      <input {...register("file")} id={id} style={{display: "none"}} type="file" accept=".jpg,.png,.jpeg"/>
    </div>
  )
}