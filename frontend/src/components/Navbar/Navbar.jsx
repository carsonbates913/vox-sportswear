import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { initFirebase, getAllCart } from "../../services/datastore.js";
import { getAuth } from 'firebase/auth';
import { retrieveCartFromSession } from '../../services/sessionStorage.js';
import './Navbar.css'

const Navbar = () => {

    const app = initFirebase();
    const auth = getAuth(app);
    const [cartProducts, setCartProducts] = useState([]);

    const updateCartFromSession = () => {
        let cart = retrieveCartFromSession();
        setCartProducts(cart);
    }

    useEffect(()=>{
        if(auth.currentUser){
            const cancel = getAllCart(auth.currentUser.uid, (snapshot)=>{
                if(snapshot){
                    const cartArray = snapshot.docs.map((doc) => ({id: doc.id ,...doc.data()}));
                    setCartProducts(cartArray);
                }
            })
            return typeof cancel === "function" ? cancel : undefined;
        }else{
            updateCartFromSession();
            window.addEventListener('storage', updateCartFromSession);
            return () => {
                window.removeEventListener('storage', updateCartFromSession);
            };
        }
    }, []);

    return (
        <div className="navbar">
            <NavLink className="inactive" activeclassname="active" to="/">
            <img src="/assets/DartmouthLogo.png" className="navbar-image"/></NavLink>
            <div className="navbar-right-container">
                <NavLink className="inactive" activeclassname="active" to="/aboutus">AboutUs</NavLink>
                <NavLink className="inactive" activeclassname="active" to="/products">Products</NavLink>
                <NavLink className="inactive" activeclassname="active" to="/mycart">
                {auth.currentUser ? auth.currentUser.displayName : "MyAccount"} / Cart
                    <div className="cart-length-container">
                        {cartProducts.length > 0 && <span className="length-span">{cartProducts.length}</span>}
                    </div>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar;
