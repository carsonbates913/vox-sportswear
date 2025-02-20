import React from 'react';
import '../../App.css';

const OrderItem = ({ item }) => {
  return (
    <div className="order-item">
      <p>Product ID: {item.productID}</p>
      <p>Quantity: {item.quantity}</p>
      <p>Size: {item.size}</p>
      <p>Color: {item.color}</p>
      <p>Customization: {item.customization}</p>
    </div>
  );
};

export default OrderItem;
