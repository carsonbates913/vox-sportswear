/* eslint-disable no-unused-vars */
import Navbar from '../../components/Navbar/Navbar';
import MyAccount from '../../auth/MyAccount';
import { getSpecificProduct, initFirebase } from '../../services/datastore';
import { getAuth } from 'firebase/auth';
import './MyCart.css'
import { getAllCart, getSpecificCartItem, updateCartQuantity, deleteFromCart, addOrder} from '../../services/datastore';
import { retrieveCartFromSession } from '../../services/sessionStorage.js';
import { useEffect, useState } from 'react';

const MyCart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [requests, setRequests] = useState([]);
    const app = initFirebase();
    const auth = getAuth(app);

    async function indexCartFromSession(){
        let cartArray = retrieveCartFromSession();
        cartArray.forEach((cartItem) => {
            cartItem.productID
        })
        cartArray = cartArray.map((cartItem, index) => ({cartItemID: index, ...cartItem}));

        const promises = cartArray.map(async (cartItem) => {
            const productSnapshot = await getSpecificProduct(cartItem.productID);
            return { ...cartItem, ...productSnapshot.data() };
        });

        cartArray = await Promise.all(promises);
        setCartProducts(cartArray);
    }

    useEffect(()=>{
        const fetchCart = async () => {
            if(auth.currentUser){
                const cancel = getAllCart(auth.currentUser.uid, async (data)=>{
                    if(data){
                        let cartArray = data.docs.map((doc) => ({ cartItemID: doc.id, ...doc.data()}));
                        const promises = cartArray.map(async (cartItem) => {
                            const productSnapshot = await getSpecificProduct(cartItem.productID);
                            return { ...cartItem, ...productSnapshot.data() };
                        });
                
                        cartArray = await Promise.all(promises);
                        setCartProducts(cartArray);
                    }
                })
                return cancel; 
            }else{
                indexCartFromSession();
                window.addEventListener('storage', indexCartFromSession);
    
                return () => {
                    window.removeEventListener('storage', indexCartFromSession);
                };
            }
        }

        fetchCart();
    }, [auth.currentUser])

    const handleCartQuantity = (cartItemID, operation) => {
        setCartProducts(prevCartProducts => {
            return prevCartProducts.map(product => {
                if (product.cartItemID === cartItemID) {
                    const newQuantity = operation === 'increment' ? product.quantity + 1 : product.quantity - 1;
                    updateCartQuantity(auth.currentUser.uid, cartItemID, newQuantity);
                    return { ...product, quantity: newQuantity };
                }
                return product;
            });
        });
    }

    const handleDeleteFromCart = (cartItemID) => {
        if(auth.currentUser){
            console.log("user");
            deleteFromCart(auth.currentUser.uid, cartItemID);
        }else{
            let cart = JSON.parse(sessionStorage.getItem('vox-guestCart'));
            cart.splice(cartItemID, 1);
            sessionStorage.setItem("vox-guestCart", JSON.stringify(cart));
            window.dispatchEvent(new Event('storage'));
        }
    }

    const clearCart = async () => {
        const results = cartProducts.map(async (product)=> {
            return await deleteFromCart(auth.currentUser.uid, product.cartItemID);
        });
        await Promise.all(results);
    }

    const handleCheckout = async () => {
        if(auth.currentUser){
            await addOrder(auth.currentUser.email, cartProducts);
            await clearCart();
        }else{
            alert("must be signed in to order");
        }
    }

    return (
        <div>
            <Navbar />
            <div className="cart-main">
            <div className="cart">
            {(auth.currentUser) ? (<p>Signed In</p>) : (<p>Not Signed in</p>)}
            {(auth.currentUser && auth.currentUser.email == "carson.d.bates.27@dartmouth.edu") ? (<p>Admin Permission</p>) : (<p>No Admin Permission</p>)}
            {cartProducts.length === 0 || !cartProducts ?
                <p>your cart is currently empty</p>
                : cartProducts.map((product)=>(
                    <div className="cart-card" key={product.cartItemID}>
                        <img src='/assets/mockimg.png' width="150px" />
                        <div className="cart-inner-description">
                            <button id="delete-from-cart" onClick={() => handleDeleteFromCart(product.cartItemID)}>x</button>
                            <p>{product.productName}</p>
                            <p>$ {product.price}</p>
                            <p>{product.size}</p>
                            <div className="quantity-btn-container">
                                <button onClick={() => handleCartQuantity(product.cartItemID, 'decrement')} disabled={product.quantity <= 1}>-</button>
                                <p className="q-p">{product.quantity}</p>
                                <button onClick={() => handleCartQuantity(product.cartItemID, 'increment')}>+</button>
                            </div>
                        </div>
                    </div>
            ))}
           </div>
           <div className="right-cart-container">
                <MyAccount  />
                <button onClick={handleCheckout}>check out</button>
           </div>
           </div>
        </div>
    )
}

export default MyCart;
