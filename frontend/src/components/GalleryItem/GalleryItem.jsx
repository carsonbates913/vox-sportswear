import { forwardRef } from 'react';

import './GalleryItem.css'

export default function GalleryItem(props) {
  return(
    <div className="gallery-item">
      <div className="gallery-item__hover"/>
      {/*<div className="gallery-item__view">View Item</div>*/}
      <img className="gallery-item__image" src={props.ImageURL ? props.ImageURL : null} alt="hello" />
      <div className="gallery-item__background"/>
    </div>
  )
}
