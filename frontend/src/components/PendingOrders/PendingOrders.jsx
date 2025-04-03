import { useState } from 'react';

import './PendingOrders.css'

export default function PendingOrders (props) {

  return (
    <div className="pending-orders">
        <p className="pending-orders__title">Pending Orders</p>
        <ul className="pending-orders__list">
            {props.orders.length > 0 && props.orders.map((order, index) => (
                <div key={order.orderID} className={`pending-orders__item ${props.selectedOrder?.orderID === order.orderID && 'active'}`} onClick={()=> {props.handleSelectOrder(index)}}>
                    <h1>{order.userEmail}</h1>
                    <p>{order.items.length || 0} Items</p>
                </div>
            ))}
        </ul>
    </div>
  )
}