import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllCart} from "../../services/datastore.js";
import { retrieveCartFromSession } from '../../services/sessionStorage.js';
import { initFirebase } from '../../services/datastore.js';
import { useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuth } from '../../context/AuthContext.jsx';
import './Navbar.css';

const Navbar = () => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();

    const app = initFirebase();
    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    const navigateTo = useNavigate();
    
    const updateCartFromSession = () => {
        let cart = retrieveCartFromSession();
        setCartItems(cart);
    }

    const signOut = async () => {
        await auth.signOut();
        navigateTo('/homepage');
    }

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

    useEffect(()=>{
        if(user){
            const cancel = getAllCart(user.uid, (snapshot)=>{
                if(snapshot){
                    const cartArray = snapshot.docs.map((doc) => ({id: doc.id ,...doc.data()}));
                    setCartItems(cartArray);
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
            <nav className="navbar">
                <NavLink to="/">
                    <svg className="vox-logo-svg" width="186" height="68" viewBox="0 0 186 68" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M61.8633 50L49.4633 22H52.6633L64.2633 48.36H62.5033L74.1833 22H77.1833L64.7833 50H61.8633ZM93.2526 50.24C91.146 50.24 89.186 49.8933 87.3726 49.2C85.586 48.48 84.026 47.48 82.6926 46.2C81.386 44.8933 80.3593 43.3867 79.6126 41.68C78.8926 39.9467 78.5326 38.0533 78.5326 36C78.5326 33.9467 78.8926 32.0667 79.6126 30.36C80.3593 28.6267 81.386 27.12 82.6926 25.84C84.026 24.5333 85.586 23.5333 87.3726 22.84C89.1593 22.12 91.1193 21.76 93.2526 21.76C95.3593 21.76 97.306 22.12 99.0926 22.84C100.879 23.5333 102.426 24.52 103.733 25.8C105.066 27.08 106.093 28.5867 106.813 30.32C107.559 32.0533 107.933 33.9467 107.933 36C107.933 38.0533 107.559 39.9467 106.813 41.68C106.093 43.4133 105.066 44.92 103.733 46.2C102.426 47.48 100.879 48.48 99.0926 49.2C97.306 49.8933 95.3593 50.24 93.2526 50.24ZM93.2526 47.6C94.9326 47.6 96.4793 47.32 97.8926 46.76C99.3326 46.1733 100.573 45.36 101.613 44.32C102.679 43.2533 103.506 42.0267 104.093 40.64C104.679 39.2267 104.973 37.68 104.973 36C104.973 34.32 104.679 32.7867 104.093 31.4C103.506 29.9867 102.679 28.76 101.613 27.72C100.573 26.6533 99.3326 25.84 97.8926 25.28C96.4793 24.6933 94.9326 24.4 93.2526 24.4C91.5726 24.4 90.0126 24.6933 88.5726 25.28C87.1326 25.84 85.8793 26.6533 84.8126 27.72C83.7726 28.76 82.946 29.9867 82.3326 31.4C81.746 32.7867 81.4526 34.32 81.4526 36C81.4526 37.6533 81.746 39.1867 82.3326 40.6C82.946 42.0133 83.7726 43.2533 84.8126 44.32C85.8793 45.36 87.1326 46.1733 88.5726 46.76C90.0126 47.32 91.5726 47.6 93.2526 47.6ZM109.672 50L121.152 34.48V36.76L110.352 22H113.752L122.832 34.32L121.512 34.36L130.592 22H133.792L123.112 36.56V34.48L134.552 50H131.112L121.432 36.84H122.672L113.072 50H109.672Z" fill="#01683E"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M92.5444 0.229693L92.5443 0.229409L1.56376 33.4875L1.56465 33.49L0 34.0595L0.00057229 34.061L1.45721 34.5912L1.45824 34.5908L92.5503 67.8933L92.551 67.8912L92.8499 68L93.1487 67.8912L93.1488 67.8915L184.234 34.595L184.233 34.59L185.689 34.0599L184.233 33.5297L184.233 33.5293L93.1428 0.227605L93.1421 0.229672L92.8433 0.120911L92.5444 0.229693ZM182.779 34.0624L92.846 1.18383L2.91449 34.0585L92.8471 66.9371L182.779 34.0624Z" fill="#01683E"/>
                    </svg>
                </NavLink>
                <div className="navbar__right-container">
                    <NavLink className="right-container__navlink" to="/aboutus">About</NavLink>
                    <NavLink className="right-container__navlink" to="/products">Products</NavLink>
                    <NavLink className="right-container__navlink right-container__cart-navlink" to="/mycart">
                        Cart
                            {cartItems.length > 0 && (cartItems.length < 10 ? (<div className="cart-navlink__length">{cartItems.length}</div>) : (<div className="cart-navlink__length">9+</div>) ) }
                    </NavLink>
                    <NavLink className="right-container__profile-navlink" onClick={() => !user && signIn()} to="/myaccount">
                        {user ? (
                            <>
                                <div className="connector"></div>
                                <button className="navlink__sign-out-button" onClick={signOut}>Sign Out</button>
                            </>) : ''}
                        <div className="navlink__profile-container">
                            <img src={user ? (user.photoURL ? user.photoURL : '/assets/Blank_Profile.jpeg') : '/assets/Blank_Profile.jpeg'} alt="profile-image" className="profile-container__image"/>
                        </div>
                    </NavLink>
                </div>
            </nav>
        )
}

export default Navbar;
