import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import './MyAccount.css'
import { useAuth } from '../../context/AuthContext.jsx';
import { getPreviousOrders } from '../../services/datastore.js';
import OrderHistoryList from '../../components/OrderHistoryList/OrderHistoryList.jsx';
import LoadingModule from '../../components/LoadingModule/LoadingModule.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const MyAccount = () => {

    const [completedOrders, setCompletedOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const { user, signOut } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        const cancel = getPreviousOrders(user.uid, (snapshot) => {
            if(snapshot){
                const orderArray = snapshot.docs.map((doc) => ({orderID: doc.id, ...doc.data()}));
                const completedOrder = orderArray.filter((order) => order.status === "accepted" || order.status === "declined");
                const pendingOrder = orderArray.filter((order) => order.status === "pending");
                setCompletedOrders(completedOrder);
                setPendingOrders(pendingOrder);
            }else {
                setCompletedOrders([]);
                setPendingOrders([]);
            }
            setLoading(false);
        },)

        return () => cancel();
    }, [user.uid])

    return (
        <main className="my-account">
            <div className="my-account-wrapper">
                <header>
                    {user.displayName ? <h1>Hi, {user.displayName.split(" ").filter(Boolean)[0]}</h1> : <h1>My Account</h1>}
                    <button className="sign-out-button" onClick={() => {signOut(); navigate('/')}}>Sign Out</button>
                </header>
                <LoadingModule show={loading} viewport/>
                {!loading && (
                    <div className="my-account__content">
                    <div className="my-account__content__requests-container">
                        <div className="my-account__content__requests-container-title" style={{height: '100px'}}>
                        <h1><span>Pending</span> Requests</h1>
                        </div>
                        <OrderHistoryList orders={pendingOrders} />
                    </div>
                    <div className="my-account__content__requests-container">
                        <div className="my-account__content__requests-container-title" style={{height: '100px'}}>
                        <h1><span>Completed</span> Requests</h1>
                        <h2>Check your Email!</h2>
                        </div>
                        <OrderHistoryList orders={completedOrders} />
                    </div>
                </div>
                )}
            </div>
            <Footer />
        </main>
      )
   }

export default MyAccount;
