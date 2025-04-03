import './CartList.css';
import CartItem from '../../components/CartItem/CartItem.jsx';

export default function CartList(props) {
  return (
    <div className="cart">
                {props.cartItems.length === 0 || !props.cartItems ?
                    <p className="cart__empty-alert">your cart is currently empty</p>
                    : props.cartItems.map((item)=>(
                        <CartItem key={item.cartItemID} item={item} handleDeleteFromCart={props.handleDeleteFromCart}/>
                ))}
               </div>
  )
}