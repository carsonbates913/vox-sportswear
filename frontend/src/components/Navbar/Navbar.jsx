import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCart, getUserData } from "../../services/datastore.js";
import { retrieveCartFromSession } from '../../services/sessionStorage.js';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navbar.css'

const Navbar = () => {

    const [cartProducts, setCartProducts] = useState([]);

    const { user } = useAuth();

    const updateCartFromSession = () => {
        let cart = retrieveCartFromSession();
        setCartProducts(cart);
    }

    useEffect(()=>{
        if(user){
            const cancel = getAllCart(user.uid, (snapshot)=>{
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
    }, [user]);

        return (
            <div className="navbar">
                <NavLink className="inactive" activeclassname="active" to="/">
                <img src="/assets/DartmouthLogo.png" className="navbar-image"/></NavLink>
                <div className="navbar-right-container">
                    <NavLink className="inactive" activeclassname="active" to="/aboutus">AboutUs</NavLink>
                    <NavLink className="inactive" activeclassname="active" to="/products">Products</NavLink>
                    <NavLink className="inactive" activeclassname="active" to="/mycart">
                    {user ? user.displayName : "MyAccount"} / Cart
                        <div className="cart-length-container">
                            {cartProducts.length > 0 && <span className="length-span">{cartProducts.length}</span>}
                        </div>
                    </NavLink>
                </div>
            </div>
        )
}

export default Navbar;
