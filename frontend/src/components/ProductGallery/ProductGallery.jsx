import { useState, useEffect, useRef } from 'react';
import { CSSTransition} from 'react-transition-group';
import { motion, AnimatePresence } from 'framer-motion';

import './ProductGallery.css'
import GalleryItem from '../GalleryItem/GalleryItem';

export default function ProductGallery({ImageURLs}) {
  const [displayedImages, setDisplayedImages] = useState([]);
  const [remainingImages, setRemainingImages] = useState([]);
  const nodeRef = useRef(null);

  const shuffleArray = (array) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  useEffect(() => {
    const shuffledImages = shuffleArray(ImageURLs);
    setDisplayedImages(shuffledImages.slice(0, 12).map(item => [item, item]));
    setRemainingImages(shuffledImages.slice(12));
    console.log(displayedImages);
  }, [ImageURLs]); // This runs only once when ImageURLs changes

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(remainingImages);
      if (remainingImages.length >= 2) {
        const indicesToReplace = [];
        while (indicesToReplace.length < 2) {
          const randomIndex = Math.floor(Math.random() * displayedImages.length);
          if (!indicesToReplace.includes(randomIndex)) {
            indicesToReplace.push(randomIndex);
          }
        }

        let nextImages = remainingImages.slice(0, 2);
        let updatedRemainingImages = remainingImages.slice(2);

        let updatedDisplayedImages = [...displayedImages];
        let remainingImagesToAdd = [];
        
        updatedDisplayedImages = updatedDisplayedImages.map((images, index) => {
          if(indicesToReplace.includes(index)){
            remainingImagesToAdd.push(images[1]);

            const index1 = images[1];
            const index2 = nextImages[0];
            nextImages.shift();
            console.log("check");
            return [index1, index2];
          }else{
            return [images[1], images[1]];
          }
        })
        /*
        indicesToReplace.forEach((index, i) => {
          remainingImagesToAdd.push(displayedImages[index][1]);
          updatedDisplayedImages[index][0] = updatedDisplayedImages[index][1];
          updatedDisplayedImages[index][1] = nextImages[i];
        });
        */

        updatedRemainingImages = [...updatedRemainingImages, ...remainingImagesToAdd];
        console.log(updatedDisplayedImages);

        setDisplayedImages(updatedDisplayedImages);
        setRemainingImages(updatedRemainingImages);
      }
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [displayedImages, remainingImages]); // Only triggers when images are swapped (do not update dependencies inside the effect)


  return(
    <>
      <div className="product-gallery">
      {displayedImages.map((ImageURLs, index) => {
        return (
        <GalleryItem key={index} ImageURLs={ImageURLs} />
        )
})}
      </div>
    </>
  )
}