import { NavLink } from 'react-router-dom'
import './NavLinks.css'

export default function NavLinks (props) {
  return (
    <ul className="navlinks">
      <li>
        <NavLink className="navlinks__item" to="/aboutus">About</NavLink>
      </li>
      <li>
        <NavLink className="navlinks__item" to="/products">Products</NavLink>
      </li>
      <li>
        <NavLink className="navlinks__item navlinks__cart" to="/mycart">
            Cart
                {props.cart.length > 0 && (props.cart.length < 10 ? (<div>{props.cart.length}</div>) : (<div>9+</div>) ) }
        </NavLink>
      </li>
      <li>
        <NavLink className="navlinks__item navlinks__profile" onClick={() => !props.user && props.signIn()} to="/myaccount">
            {props.user ? (
                <>
                    <div className="navlinks__profile__connector"></div>
                    <button className="navlinks__profile__sign-out-button" onClick={props.signOut}>Sign Out</button>
                </>) : ''}
            <div className="navlinks__profile__container">
                <img src={props.user ? (props.user.photoURL ? props.user.photoURL : '/assets/Blank_Profile.jpeg') : '/assets/Blank_Profile.jpeg'} alt="profile-image" className="profile-container__image"/>
            </div>
        </NavLink>
      </li>
    </ul>
  )
}