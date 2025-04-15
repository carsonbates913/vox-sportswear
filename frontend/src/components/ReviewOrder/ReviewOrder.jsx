import { useState, useEffect } from 'react';

import './ReviewOrder.css';
import CartItem from '../CartItem/CartItem';

export default function ReviewOrder({selectedOrder}) {

  const [selectedItem, setSelectedItem] = useState(0);

  useEffect(() => {
    setSelectedItem(0);
  } , [selectedOrder]);

  return (
    <div className="review-order">
      <div className="review-order__item-list">
          {selectedOrder.items.map((item, index)=> {
              return (<button className={`review-order__item ${selectedItem === index ? "active" : ""}`} key={index} onClick={()=> {setSelectedItem(index)}}>{item.product}</button>);
          })}
      </div>
      <CartItem item={selectedOrder.items[selectedItem ] || selectedOrder.items[0]} noRemove />
  </div>
  )
}