import { useEffect, useState } from 'react';
import { httpsCallable } from 'firebase/functions';

import './MyCart.css'
import { getAllCart, deleteFromCart} from '../../services/datastore';
import { useAuth } from '../../context/AuthContext.jsx';
import CartList from '../../components/CartList/CartList.jsx';
import OrderSummary from '../../components/OrderSummary/OrderSummary.jsx';
import LoadingModule from '../../components/LoadingModule/LoadingModule.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import { functions } from '../../services/datastore.js';
import AlertModal from '../../components/AlertModal/AlertModal.jsx';

const MyCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState("page");
    const [currentModal, setCurrentModal] = useState(null);
    const { user, signIn } = useAuth();

    const addOrder = httpsCallable(functions, "addOrder");

    const handleClear = () => {
        setCurrentModal(null);
    }

    useEffect(()=>{
        if(user){
            const cancel = getAllCart(user.uid, async (data)=>{
                if(data){
                    let cartArray = data.docs.map((doc) => ({ cartItemID: doc.id, ...doc.data()}));
                    setCartItems(cartArray);
                }else{
                    setCartItems([]);
                }
                setLoading(null);
            })
            return () => cancel();
        }
        setLoading(null);
    }, [user])

    const handleDeleteFromCart = (cartItemID, imageName) => {
        if(user){
            deleteFromCart(user.uid, cartItemID, imageName);
        }
    }

    const handleCheckout = async () => {

        if(!user){
            setCurrentModal("signIn");
            return;
        }

        if(cartItems.length === 0){
            setCurrentModal("emptyCart");
            return;
        }

        setLoading("request");

        try{
            const order = cartItems.map(({ product, sizes, color, designNotes, imageURL}) => ({ product, sizes, color, designNotes, imageURL}));
            await addOrder(order);
            setCartItems([]);
        }catch(error){
            if(error.code){
                console.error("Firebase error:", error.code, error.message);

                if(error.code === "unauthenticated"){
                    setCurrentModal("signIn");
                }else if(error.code === "resource-exhausted"){
                    setCurrentModal("emptyCart");
                }
            }
        } finally {
            setLoading(null);
        }
    }

        return (
            <main className="my-cart">
                <LoadingModule modal show={(loading === "request")} />
                <AlertModal 
                show={(currentModal === "signIn") && !user}
                header="Sign In Required"
                body="Please sign in to continue with your order"
                handleClear={handleClear}>
                    <button 
                        className="sign-in-alert__btn" 
                        onClick={async () => {
                        const result = await signIn()
                        if(result){
                            handleClear()
                        }
                        }}
                    style={{backgroundColor: '#3EFFA1', color: 'black'}}
                    >
                    Sign in
                    </button>
                </AlertModal>
                <AlertModal 
                show={(currentModal === "emptyCart")}
                header="Cart is Empty"
                body="Please add items to your cart before checking out"
                handleClear={handleClear}
                />
                <div className="my-cart-wrapper">
                    <header>
                        <h1>My Cart</h1>
                    </header>
                    <LoadingModule show={loading == "page"} viewport />
                    {(loading != "page") && (
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
