export function retrieveCartFromSession(){
  let cart = sessionStorage.getItem("vox-guestCart");
  cart = cart ? JSON.parse(cart) : [];
  return cart;
}

export function addToCartFromSession(cartItem){
  let cart = retrieveCartFromSession();
  cart.push({...cartItem, cartItemID: crypto.randomUUID()});
  sessionStorage.setItem('vox-guestCart', JSON.stringify(cart));
}

export function updateCartSessionQuantity(cartItemID, newQuantity){
  let cart = retrieveCartFromSession();
  let cartItem = cart.find(item => item.cartItemID === cartItemID);
  cartItem.quantity = newQuantity;
  sessionStorage.setItem('vox-guestCart', JSON.stringify(cart));
}