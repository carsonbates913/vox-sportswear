import { useState, useEffect, useRef} from 'react';

import './Carousel.css'
import paintStroke from '../../assets/PaintStroke.svg'

export default function Carousel({images, isRunning}){ 
  const [currentIndex, setCurrentIndex] = useState(1);

  const FirstComponent = images[0];
  const LastComponent = images[images.length - 1];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1 + images.length);
  }

  const goToSlide = (index) => {
    setCurrentIndex(index);
  }

  const transitionRef = useRef(true);

  useEffect(() => {
    if (currentIndex === images.length + 1) {
      setTimeout(() => {
        transitionRef.current = false;
        setCurrentIndex(1);
      }, 300);
    } else if (currentIndex === 0) {
      setTimeout(() => {
        transitionRef.current = false;
        setCurrentIndex(images.length);
      }, 300);
    }else {
      transitionRef.current = true;
    }
  }, [currentIndex, images]);

  useEffect(() => {
    if(isRunning) {
      const interval = setInterval(() => {
        nextSlide();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isRunning])

  return (
    <div className="carousel">
      <div className="carousel__container">
        <div className="carousel__container__background">
          <img src={paintStroke}></img>
        </div>
        <div className={`carousel__item`} style={{translate: `${-100 * currentIndex}%`, transition: transitionRef.current ? 'all .3s' : 'none'}}>
            <img src={images[images.length - 1]}></img>
        </div>
        {images.map((Image, index) => (
          <div key={index} className={`carousel__item`} style={{translate: `${-100 * currentIndex}%`, transition: transitionRef.current ? 'all .3s' : 'none'}}>
              <img src={Image} />
          </div>
        ))}
        <div className={`carousel__item`} style={{translate: `${-100 * currentIndex}%`, transition: transitionRef.current ? 'all .3s' : 'none'}}>
            <img src={images[0]} />
        </div>
      </div>
      <div className="carousel__slider-btn-container">
          {images.map((image, index) => {
            if(index == 0) return <button key={index} className={`carousel__slider-btn ${(currentIndex == 1 || currentIndex == images.length + 1)  ? 'active' : ''}`} onClick={()=> {goToSlide(1)}} />
            return <button key={index} className={`carousel__slider-btn ${currentIndex == index + 1 ? 'active' : ''}`} onClick={()=> {goToSlide(index+1)}} />
          })}
      </div>
    </div>
  )
}