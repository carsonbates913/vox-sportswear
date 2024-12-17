import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { initFirebase, getOrders, getSpecificProduct } from '../../services/datastore.js';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { retrieveCartFromSession } from '../../services/sessionStorage.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './MyAccount.css'

const MyAccount = () => {
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

    useEffect(()=> {
        if(selectedOrder){
            setFormData({price: "", description: ""});
        }
    }, [selectedOrder])

    const signIn = async () => {
        try{
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            if (user) {
                navigateTo('/homepage');
            }
        } catch (error) {
            console.error("Error - ", error);
        }
    } 

    const signOut = async () => {
        await auth.signOut();
        navigateTo('/homepage');
    }

    const handleSelectOrder = (index) => {
        console.log(orders);
        setSelectedOrder(orders[index]); 
        setSelectedItem(orders[index].items[0]); 
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const action = e.nativeEvent.submitter.value;
        if(action === "accept"){
            const response = await fetch("https://sendorderresponse-ffshwcchqq-uc.a.run.app", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({submitType: "accept", recipientEmail: selectedOrder.userEmail, price: formData.price, message: formData.description, orderID: selectedOrder.orderID}),
            })
            const data = await response.text();
            console.log(data);
        }else if (action === "decline"){
            const response = await fetch("https://sendorderresponse-ffshwcchqq-uc.a.run.app", {
                mode: "cors",
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({submitType: "decline", recipientEmail: selectedOrder.userEmail, price: formData.price, message: formData.description, orderID: selectedOrder.orderID}),
            })
            const data = await response.text();
            console.log(data);
            console.log("decline");
        }
        setFormData({price: "", description: ""});
    }

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({...prevData, [name]: value }));
    }

    if(user?.isAdmin){
        return (
            <div className="myaccount-main">
                <section className="myaccount-section">
                    <div className="pending-orders">
                        <p className="pending-orders-title">Pending Orders</p>
                        <ul className="pending-orders-list">
                            {orders.length > 0 && orders.map((order, index) => (
                                <div key={order.orderID} className="pending-order" onClick={()=> {handleSelectOrder(index)}}>
                                    <p className="pending-order-title">{order.userEmail}</p>
                                    <p className="pending-order-details">{order.items.length || 0} Items</p>
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
                                            return (<button className="item"key={index} onClick={()=> {setSelectedItem(item); console.log(selectedOrder)}}>{item.name}</button>);
                                        })}
                                    </div>
                                    <div className="selected-item" key={selectedItem.orderItemID}>
                                        <img className="selected-item-image" src={'/assets/Vox-Bag.png'} />
                                        <div className="selected-item-details">
                                            <p className="selected-item-title">{selectedItem.name}</p>
                                            <div className="selected-item-description-row">
                                                <p className="selected-item-attribute">Quantity</p>
                                                <p className="selected-item-attribute-selected">{selectedItem.quantity}</p>
                                            </div>
                                            <div className="selected-item-description-row">
                                                <p className="selected-item-attribute">Size</p>
                                                <p className="selected-item-attribute-selected">{selectedItem.size}</p>
                                            </div>
                                            <div className="selected-item-description-row">
                                                <p className="selected-item-attribute">Color</p>
                                                <p className="selected-item-attribute-selected">{selectedItem.size}</p>
                                            </div>
                                            {selectedItem.customization && (
                                                <div className="selected-item-description-row">
                                                    <p className="selected-item-attribute">Customization</p>
                                                    <p className="selected-item-attribute-selected">{selectedItem.customization}</p>
                                                </div>
                                            )}
                                            {selectedItem.imageURL && (
                                                <div className="selected-item-description-row">
                                                    <p className="selected-item-attribute">Image URL</p>
                                                    <p className="selected-item-attribute-selected">{selectedItem.imageName || "none"}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div>No order selected</div>
                            )}
                        </div>
                        {selectedOrder && (
                            <form className="review-order-form" onSubmit={handleSubmit}>
                                <div className="order-form-price-container">
                                    <p style={{marginRight: "20px"}}>Price: </p>
                                    <input className="order-form-price" type="number" placeholder="$0.00" value={formData.price} onChange={e => {handleFormChange(e)}} name="price"></input>
                                </div>
                                <div className="order-form-description-container">
                                    <p>Message: </p>
                                    <textarea required className="order-form-description" name="description" value={formData.description} onChange={e => {handleFormChange(e)}}></textarea>
                                </div>
                                <div className="order-form-buttons-container">
                                    <button className="order-form-submit" type="submit" name="hello" value="decline">Decline</button>
                                    <button className="order-form-submit" type="submit" name="action" value="accept">Accept</button>
                                </div>
                            </form>
                        )}
                                            <div>
                        {user ?
                        <button onClick={signOut}>Log out</button>
                        : <button onClick={signIn}>Log in with Google</button>
                        }
                    </div>
                    </div>
                </section>
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
