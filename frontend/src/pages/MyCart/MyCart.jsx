import MyAccount from '../MyAccount/MyAccount.jsx';
import { getSpecificProduct, initFirebase } from '../../services/datastore';
import './MyCart.css'
import { getAllCart, updateCartQuantity, deleteFromCart, addOrder} from '../../services/datastore';
import { retrieveCartFromSession, updateCartSessionQuantity} from '../../services/sessionStorage.js';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';

const MyCart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const [requests, setRequests] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);
    const [loadingCartDelete, setLoadingCartDelete] = useState(false);

    const {user} = useAuth();

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
            if(user){
                const cancel = getAllCart(user.uid, async (data)=>{

                    if(data){
                        let cartArray = data.docs.map((doc) => ({ cartItemID: doc.id, ...doc.data()}));
                        const promises = cartArray.map(async (cartItem) => {
                            console.log(cartItem);
                            const productSnapshot = await getSpecificProduct(cartItem.product);
                            return { ...cartItem, ...productSnapshot.docs[0].data() };
                        });
                
                        cartArray = await Promise.all(promises);
                        setCartProducts(cartArray);
                        setLoadingCart(false);
                    }else{
                        setCartProducts([]);
                        setLoadingCart(false);
                    }
                })
                return cancel; 
            }else{
                await indexCartFromSession();
                setLoadingCart(false);
                window.addEventListener('storage', indexCartFromSession);
                
                return () => {
                    window.removeEventListener('storage', indexCartFromSession);
                };
            }
        }
        fetchCart();
    }, [user])

    const handleCartQuantityChange = (e, cartItemID, operation) => {
        setCartProducts(prevCartProducts => {
            return prevCartProducts.map(product => {
                if (product.cartItemID === cartItemID) {
                    let newQuantity;
                    if(operation){
                        newQuantity = operation === 'increment' ? Number(product.quantity) + 1 : Number(product.quantity) - 1;
                    }else{
                        newQuantity = e.target.value;
                    }
                    if(newQuantity==="" || newQuantity<=0){
                        newQuantity = 1;
                    }else if (newQuantity > 1000){
                        newQuantity = 1000;
                    }else {
                        if(user){
                            updateCartQuantity(user.uid, cartItemID, newQuantity);
                        } else {
                            updateCartSessionQuantity(cartItemID, newQuantity);
                        }
                    }
                    return { ...product, quantity: newQuantity };
                }
                return product;
            });
        });
    }

    const handleDeleteFromCart = (cartItemID, imageName) => {
        if(user){
            console.log("user");
            deleteFromCart(user.uid, cartItemID, imageName);
        }else{
            let cart = JSON.parse(sessionStorage.getItem('vox-guestCart'));
            cart.splice(cartItemID, 1);
            sessionStorage.setItem("vox-guestCart", JSON.stringify(cart));
            window.dispatchEvent(new Event('storage'));
        }
    }

    const clearCart = async () => {
        setLoadingCartDelete(true);
        const results = cartProducts.map(async (product)=> {
            return deleteFromCart(user.uid, product.cartItemID, product.imageName);
        });
        await Promise.all(results);
        setCartProducts([]);
        setLoadingCartDelete(false);
    }

    const handleCheckout = async () => {
        if(user && cartProducts.length > 0){
            console.log(cartProducts);
            const order = cartProducts.map(({ product, sizes, color, designNotes, imageURL}) => ({ product, sizes, color, designNotes, imageURL}));
            await addOrder(user.uid, user.email, order);
            await clearCart();
        }else{
            alert("must be signed in to order");
        }
    }

    if(loadingCart || loadingCartDelete){
        return (
            <div>loading...</div>
        )
    }else{
        return (
            <div className="my-cart-main-content">
                <section className="section-my-cart">
                <div className="cart">
                {cartProducts.length === 0 || !cartProducts ?
                    <p className="cart__empty-alert">your cart is currently empty</p>
                    : cartProducts.map((product)=>(
                        <div className="cart-card" key={product.cartItemID}>
                            <img className="cart-card-image" src={product.imageURL} />
                            <div className="cart-inner-description">
                                <p className="cart-product-title">{product.product}</p>
                                <div className="cart-inner-description-row">
                                    <p className="cart-product-attribute">Size</p>
                                    <p className="cart-product-attribute-selected">{product.sizes.M}</p>
                                </div>
                                <div className="cart-inner-description-row">
                                    <p className="cart-product-attribute">Color</p>
                                    <p className="cart-product-attribute-selected">{JSON.parse(product.color).name}</p>
                                </div>
                                {product.designNotes && (
                                    <div className="cart-inner-description-row">
                                        <p className="cart-product-attribute">Request Details</p>
                                        <p className="cart-product-attribute-selected">{product.designNotes}</p>
                                    </div>
                                )}
                                {product.imageURL && (
                                    <div className="cart-inner-description-row">
                                        <p className="cart-product-attribute">Image URL</p>
                                        <p className="cart-product-attribute-selected">{product.imageURL || "none"}</p>
                                    </div>
                                )}
                            </div>
                            <button className="delete-from-cart" onClick={() => handleDeleteFromCart(product.cartItemID, product.imageName)}>X</button>
                        </div>
                ))}
               </div>
               <div className="right-cart-container">
                <div className="order-summary">
                <p className="order-summary__num-items">{cartProducts.length} {cartProducts.length > 1 ? "items" : "item"}</p>
                    <button className="button-checkout" onClick={handleCheckout}>
                        Send Request</button>
                </div>
               </div>
               </section>
            </div>
        )
    }
}

export default MyCart;
