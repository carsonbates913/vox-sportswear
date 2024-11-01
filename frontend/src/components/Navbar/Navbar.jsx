import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { initFirebase, getAllCart } from "../../services/datastore.js";
import { getAuth } from 'firebase/auth';
import './Navbar.css'

const Navbar = () => {

    const app = initFirebase();
    const auth = getAuth(app);
    const [cartProducts, setCartProducts] = useState([]);

    useEffect(()=>{
        getAllCart((getItems)=>{
            if(getItems){
                const cartArray = Object.keys(getItems).map((key)=>(
                    {
                        id: key,
                        ...getItems[key]
                    }
                ))
                setCartProducts(cartArray);
            }
        })
    }, [])

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
