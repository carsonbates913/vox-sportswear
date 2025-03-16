import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

import './MainNavigation.css';
import Navbar from './Navbar.jsx';
import SideDrawer from './SideDrawer.jsx';
import NavLinks from './NavLinks.jsx';
import Backdrop from '../Backdrop/Backdrop.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { getAllCart} from "../../services/datastore.js";
import { retrieveCartFromSession } from '../../services/sessionStorage.js';
import voxlogo from '../../assets/vox-logo.svg';


export default function MainNavigation(props) {
  const [cart, setCart] = useState([]);
  const { user, signIn, signOut } = useAuth();
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const closeDrawer = () => {
    setDrawerIsOpen(false);
  }

  const openDrawer = () => {
    setDrawerIsOpen(true);
  } 
      
  const updateCartFromSession = () => {
      let cart = retrieveCartFromSession();
      setCart(cart);
  }

  
  useEffect(()=>{
      if(user){
          const cancel = getAllCart(user.uid, (snapshot)=>{
              if(snapshot){
                  const cartArray = snapshot.docs.map((doc) => ({id: doc.id ,...doc.data()}));
                  setCart(cartArray);
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
    <>
        <Backdrop show={drawerIsOpen} onClick={closeDrawer}/>
        <SideDrawer show={drawerIsOpen} onClick={closeDrawer}>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>

        <Navbar>
          <NavLink to="/" className="main-navigation__logo">
            <img src={voxlogo}/>
          </NavLink>
          <nav className="main-navigation__header-nav">
            <NavLinks cart={cart} signIn={signIn} signOut={signOut} user={user}/>
          </nav>
        </Navbar>
    </>
  )
}