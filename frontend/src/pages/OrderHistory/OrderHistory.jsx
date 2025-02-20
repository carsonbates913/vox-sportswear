import React, { useEffect, useState, useContext } from 'react';
import { getOrders } from '../../services/datastore';
import { useAuth } from '../../context/AuthContext';
import '../../App.css';
import OrderCard from './OrderCard';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchOrders = () => {
            if (user) {
                const cancel = getOrders((snapshot) => {
                    if (snapshot) {
                        let ordersData = snapshot.docs
                            .filter(doc => doc.data().userEmail === user.email)
                            .map((doc) => ({ id: doc.id, ...doc.data() }));
                        setOrders(ordersData);
                        setLoadingOrders(false);
                    } else {
                        setOrders([]);
                        setLoadingOrders(false);
                    }
                });
                return typeof cancel === "function" ? cancel : undefined;
            } else {
                setOrders([]);
                setLoadingOrders(false);
            }
        };
        fetchOrders();
    }, [user]);

    if (loadingOrders) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="order-history">
                <h2>Order History</h2>
                {orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))
                )}
            </div>
        );
    }
};

export default OrderHistory;
