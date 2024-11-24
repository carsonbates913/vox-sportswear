import MyAccount from '../../auth/MyAccount';
import { getSpecificProduct, initFirebase } from '../../services/datastore';
import './MyCart.css'
import { getAllCart, updateCartQuantity, deleteFromCart, addOrder} from '../../services/datastore';
import { retrieveCartFromSession } from '../../services/sessionStorage.js';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const MyCart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loadingCart, setLoadingCart] = useState(false);

    const {loading, user} = useAuth();

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
            console.log("fetch");
            console.log(user.displayName);
            if(user){
                const cancel = getAllCart(user.uid, async (data)=>{
                    if(data){
                        let cartArray = data.docs.map((doc) => ({ cartItemID: doc.id, ...doc.data()}));
                        const promises = cartArray.map(async (cartItem) => {
                            const productSnapshot = await getSpecificProduct(cartItem.productID);
                            return { ...cartItem, ...productSnapshot.data() };
                        });
                
                        cartArray = await Promise.all(promises);
                        setCartProducts(cartArray);
                    }else{
                        setCartProducts([]);
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

        setLoadingCart(true);
        if(!loading){
            fetchCart();
        }
        setLoadingCart(false);
    }, [user])

    const handleCartQuantity = (cartItemID, operation) => {
        setCartProducts(prevCartProducts => {
            return prevCartProducts.map(product => {
                if (product.cartItemID === cartItemID) {
                    const newQuantity = operation === 'increment' ? product.quantity + 1 : product.quantity - 1;
                    updateCartQuantity(user.uid, cartItemID, newQuantity);
                    return { ...product, quantity: newQuantity };
                }
                return product;
            });
        });
    }

    const handleDeleteFromCart = (cartItemID) => {
        if(user){
            console.log("user");
            deleteFromCart(user.uid, cartItemID);
        }else{
            let cart = JSON.parse(sessionStorage.getItem('vox-guestCart'));
            cart.splice(cartItemID, 1);
            sessionStorage.setItem("vox-guestCart", JSON.stringify(cart));
            window.dispatchEvent(new Event('storage'));
        }
    }

    const clearCart = async () => {
        setLoadingCart(true);
        const results = cartProducts.map(async (product)=> {
            return deleteFromCart(user.uid, product.cartItemID);
        });
        await Promise.all(results);
        setCartProducts([]);
        setLoadingCart(false);
    }

    const handleCheckout = async () => {
        if(user){
            await clearCart();
        }else{
            alert("must be signed in to order");
        }
    }


    if(loadingCart){
        return (
            <div>loading...</div>
        )
    }else{
        return (
            <div>
                <div className="cart-main">
                <div className="cart">
                {(user) ? (<p>Signed In</p>) : (<p>Not Signed in</p>)}
                {(user && user.email == "carson.d.bates.27@dartmouth.edu") ? (<p>Admin Permission</p>) : (<p>No Admin Permission</p>)}
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
}

export default MyCart;
