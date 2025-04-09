import { motion } from 'motion/react';

import './GalleryItem.css'

export default function GalleryItem(props) {

  if(props.ImageURLs[0] == props.ImageURLs[1]){
    return(
      <div className="gallery-item">
        <img className="gallery-item__image" src={props.ImageURLs[0] ? props.ImageURLs[0] : null} alt="hello" />
        <div className="gallery-item__background"/>
      </div>
    )
  } else {
    return (
      <div className="gallery-item">
        <motion.img initial={{opacity: 1}} animate={{opacity: 0, transition: { duration: 2 }}} loading="lazy" className="gallery-item__image" src={props.ImageURLs[0]} alt="hello" />
        <motion.img initial={{opacity: 0}} animate={{opacity: 1, transition: { duration: 2 }}} loading="lazy" className="gallery-item__image" src={props.ImageURLs[1]} alt="hello" />
        <div className="gallery-item__background"/>
      </div>
    )
  }
}

//