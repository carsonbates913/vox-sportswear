import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initFirebase, getOrders, getSpecificProduct } from '../../services/datastore.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { retrieveCartFromSession } from '../../services/sessionStorage.js';
import { useAuth } from '../../context/AuthContext.jsx';
import sgMail from '@sendgrid/mail'
sgMail.setApiKey(process.env.TWILIO_KEY)
import './MyAccount.css'

const MyAccount = () => {

    const [cartProducts, setCartProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [formData, setFormData] = useState({price: "", description: ""})

    const {user} = useAuth();

    const app = initFirebase();
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();
    const navigateTo = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const unsubscribe = getOrders(async (snapshot) => {
                let ordersArray = snapshot.docs.map((doc) => ({ orderID: doc.id, ...doc.data() }));
                console.log(ordersArray);
                const promises = ordersArray.map(async (order) => {
                    const promises = order.items.map(async (item) => {
                        console.log(item.productID);
                        const productSnapshot = await getSpecificProduct(item.productID);
                        return {...item, ...productSnapshot.data()}
                    })
                    const itemsArray = await Promise.all(promises);
                    return {...order, items: itemsArray};
                });
                ordersArray = await Promise.all(promises);

                setOrders(ordersArray);
                console.log(ordersArray);
            }); 

            return unsubscribe; 
        }

        fetchOrders();
    }, [])

    const signIn = async () => {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        if (user) {
            navigateTo('/homepage');
        }
    }

    const signOut = async () => {
        await auth.signOut();
        navigateTo('/homepage');
    }

    const handleSelectOrder = (index) => {
        setSelectedOrder(orders[index]); 
        setSelectedItem(orders[index].items[0]); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if(action === "accept"){
            sgMail.send
        }else if (action === "decline"){
            console.log("decline");
        }
        setFormData({price: "", description: ""});
    }

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value }));
    }

    if(user?.role === "admin"){
        return (
            <div className="myaccount-main">
                <div className="pending-orders">
                    <p>Pending Orders</p>
                    <ul className="pending-orders-list">
                        {orders.length > 0 && orders.map((order, index) => (
                            <div key={order.orderID} className="pending-order" onClick={()=> {handleSelectOrder(index)}}>
                                <p>{order.userEmail}</p>
                                <p>{order.items.length}</p>
                            </div>
                        ))}
                    </ul>
                </div>
                <div className="review-order">
                    <div className="selected-order">
                        {selectedOrder ? (
                            <>
                                <div className="item-gallery"> 
                                    {selectedOrder.items.map((item, index)=> {
                                        return (<button key={index} onClick={()=> {setSelectedItem(item)}}>{item.name}</button>);
                                    })}
                                </div>
                                <div className="selected-item">
                                    <img className="selected-item-image"/>
                                    <div className="selected-item-details">
                                        <p>Quantity: {selectedItem.quantity}</p>
                                        <p>Size: {selectedItem.size}</p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div>No order selected</div>
                        )}
                    </div>
                    <form className="review-order-form" onSubmit={handleSubmit}>
                        <input className="order-form-price" type="number" placeholder="$0.00" value={formData.price} onChange={e => {handleFormChange(e)}} name="price"></input>
                        <textarea required className="order-form-description" name="description" value={formData.description} onChange={e => {handleFormChange(e)}}></textarea>
                        <button className="order-form-submit" type="submit" name="hello" value="decline">Decline</button>
                        <button className="order-form-submit" type="submit" name="action" value="accept">Accept</button>
                    </form>
                </div>
                <div></div>
            </div>
        )
    }else{
        return (
            <div>
                {user ?
                <button onClick={signOut}>Log out</button>
                : <button onClick={signIn}>Log in with Google</button>
                }
            </div>
        )
    }
}

export default MyAccount;
