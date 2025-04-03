import { useMemo } from 'react';
import { useState } from 'react';

import './OrderHistoryItem.css'
import CartItem from '../CartItem/CartItem'
import rightArrow from '../../assets/right-arrow.svg';
import leftArrow from '../../assets/left-arrow.svg';
import calendarIcon from '../../assets/calendar-icon.svg';
import checkIcon from '../../assets/check-icon.svg';
import xIcon from '../../assets/x-icon.svg';


export default function OrderHistoryItem(props) {

  const [sliderIndex, setSliderIndex] = useState(0);

  const nextSlide = () => {
    if(sliderIndex <= props.order.items.length - 2) setSliderIndex((prev) => prev + 1);
  }

  const prevSlide = () => {
    if(sliderIndex >= 1) setSliderIndex((prev) => prev - 1);
  }

  const formattedDate = useMemo(() => {
    const date = props.order.date.toDate();
    return date.toLocaleDateString();
  }, [props.order.date]);

  return (
    <div className="order-history-item">
      <div className="order-history-item__date">
        <img src={calendarIcon}></img>
        {props.order.status === 'pending' && <p>Date Requested: {formattedDate}</p>}
        {props.order.status === 'accepted' && (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <p style={{color: 'var(--primary-color)', fontWeight: '600'}}>Declined</p>
            <img style={{margin: '1px 4px 0px 4px', height: '15px'}} src={checkIcon}></img>
            <p>{': '+ formattedDate}</p>
        </div>
          )}
        {props.order.status === 'declined' && (
          <div style={{display: 'flex', alignItems: 'center'}}>
            <p style={{color: '#CE0000', fontWeight: '600'}}>Declined</p>
            <img style={{margin: '1px 4px 0px 4px', height: '15px'}} src={xIcon}></img>
            <p>{': '+ formattedDate}</p>
          </div>
          )}
      </div>
      <div className="order-history-item__item-carousel">
        <button className={`order-history-item__slider-btn btn-left ${sliderIndex <= 0 && 'inactive'}`} style={{left: '20px'}} onClick={prevSlide}>
          <img src={leftArrow}></img>
        </button>
        <button className={`order-history-item__slider-btn btn-right ${sliderIndex >= props.order.items.length - 1 && 'inactive'}`} style={{right: '20px'}} onClick={nextSlide}>
          <img src={rightArrow}></img>
        </button>
        <div className="order-history-item__item-container">
          {props.order.items.map((item, index) => 
            (
              <CartItem key={index} translate={sliderIndex} className="order-history-item__slide" item={item} noRemove />
          ))}
        </div>
      </div>
    </div>
  )
}