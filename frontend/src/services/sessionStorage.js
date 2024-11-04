
export function retrieveCartFromSession(){
  let cart = sessionStorage.getItem("vox-guestCart");
  cart = cart ? JSON.parse(cart) : [];
  return cart;
}

export function addToCartFromSession(cartItem){
  let cart = retrieveCartFromSession();
  cart.push(cartItem);
  sessionStorage.setItem('vox-guestCart', JSON.stringify(cart));
}