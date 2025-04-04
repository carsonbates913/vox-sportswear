import MyAccount from '../MyAccount/MyAccount.jsx';
import { getSpecificProduct, initFirebase } from '../../services/datastore';
import './MyCart.css'
import { getAllCart, deleteFromCart, addOrder} from '../../services/datastore';
import { retrieveCartFromSession, updateCartSessionQuantity} from '../../services/sessionStorage.js';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

import CartList from '../../components/CartList/CartList.jsx';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import LoadingModule from '../../components/LoadingModule/LoadingModule.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Modal from '../../components/Modal/Modal.jsx';
import Backdrop from '../../components/Backdrop/Backdrop.jsx';

const MyCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const {user} = useAuth();

    useEffect(()=>{
        if(user){
            const cancel = getAllCart(user.uid, async (data)=>{
                if(data){
                    let cartArray = data.docs.map((doc) => ({ cartItemID: doc.id, ...doc.data()}));
                    setCartItems(cartArray);
                }else{
                    setCartItems([]);
                }
                setLoading(false);
            })
            return () => cancel();
        }
    }, [user])

    const handleDeleteFromCart = (cartItemID, imageName) => {
        if(user){
            console.log("user");
            deleteFromCart(user.uid, cartItemID, imageName);
        }else{
            let cart = JSON.parse(sessionStorage.getItem('vox-guestCart'));
            console.log(cart);
            cart.splice(cartItemID, 1);
            sessionStorage.setItem("vox-guestCart", JSON.stringify(cart));
            window.dispatchEvent(new Event('storage'));
        }
    }

    const clearCart = async () => {
        const results = cartItems.map(async (item)=> {
            return deleteFromCart(user.uid, item.cartItemID, item.imageName);
        });
        await Promise.all(results);
        setCartItems([]);
    }

    const handleCheckout = async () => {
        setLoadingRequest(true);
        if(user && cartItems.length > 0){
            console.log(cartItems);
            const order = cartItems.map(({ product, sizes, color, designNotes, imageURL}) => ({ product, sizes, color, designNotes, imageURL}));
            await addOrder(user.uid, user.email, order);
            await clearCart();
        }else{
            alert("must be signed in to order");
        }
        setLoadingRequest(false);
    }

        return (
            <main className="my-cart">
                {loadingRequest && (
                    <>
                        <Modal>
                            <div className="loading-modal">
                                <LoadingModule />
                            </div>
                        </Modal>
                        <Backdrop />
                    </>
                )}
                <div className="my-cart-wrapper">
                    <header>
                        <h1>My Cart</h1>
                    </header>
                    {loading ? (<LoadingModule viewport />) : (
                        <div className="my-cart__content">
                        <div className="my-cart__content__list-container">
                            <CartList cartItems={cartItems} handleDeleteFromCart={handleDeleteFromCart}/>
                        </div>
                        <div className="my-cart__content__order-summary-container">
                            <OrderSummary numItems={cartItems.length} handleCheckout={handleCheckout}/>
                        </div>
                    </div>
                    )}
                </div>
                <Footer />
            </main>
        )
}

export default MyCart;
