import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './AdminDashboard.css';
import { getOrders, getSpecificProduct } from '../../services/datastore.js';
import { useAuth } from '../../context/AuthContext.jsx';
import PendingOrders from '../../components/PendingOrders/PendingOrders.jsx';
import ReviewOrder from '../../components/ReviewOrder/ReviewOrder.jsx';
import OrderForm from '../../components/OrderForm/OrderForm.jsx';

export default function AdminDashboard () {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {signOut} = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = getOrders(async (snapshot) => {
        let ordersArray = snapshot.docs.map((doc) => ({ orderID: doc.id, ...doc.data() }));
        setOrders(ordersArray);
        setSelectedOrder(ordersArray[0]);
    }); 

    return () => unsubscribe(); 
  }, [])

  const handleSelectOrder = (index) => {
    setSelectedOrder(orders[index]); 
}

  return (
      <main className="admin-dashboard">
        <header>
          <h1>Admin Dashboard</h1>
          <button className="sign-out-button" onClick={() => {signOut(); navigate('/')}}>Sign Out</button>
        </header>
        <div className="admin-dashboard__content">
          <div className="admin-dashboard__content__pending-orders-container">
            <PendingOrders orders={orders} selectedOrder={selectedOrder} handleSelectOrder={handleSelectOrder} />
          </div>
          <div className="admin-dashboard__content__review-order-container">
            {selectedOrder ? (
              <>
                <ReviewOrder selectedOrder={selectedOrder}/>
                <OrderForm selectedOrder={selectedOrder}/>
              </>
            ) : <p>No Order Selected</p>}
          </div>
        </div>
      </main>
  )
}