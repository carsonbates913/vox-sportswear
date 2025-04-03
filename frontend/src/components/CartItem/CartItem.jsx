import './CartItem.css';

export default function CartItem(props) {
  return (
    <div className={`cart-item ${props.className}`} style={{transform: `translateX(${props.translate * -100}%)`}}>
      <div className="cart-item__image-container">
        {props.item?.imageURL ? <img src={props.item.imageURL} /> : <p>No Custom Image Provided</p>}
      </div>
      <div className="cart-item__description">
        <h1>{props.item.product}</h1>
        <div className="cart-item__description__attribute">
          <h2>Color</h2>
          <p>{JSON.parse(props.item.color).name} ({JSON.parse(props.item.color).hex})</p>
        </div>
        <div className="cart-item__description__attribute">
          <h2>Sizes</h2>
          {Object.values(props.item.sizes).every(value => value === 0) ? (
            <p>No Sizes Selected</p>
          ) : (
            <div>
              {Object.entries(props.item.sizes)
                .filter(([_, quantity]) => quantity > 0)
                .map(([size, quantity]) => (
                  <div className="cart-item__size-tag" key={size}>{size} - {quantity}</div>
                ))}
            </div>
          )}
        </div>
        <div className="cart-item__description__attribute">
          <h2>Design Notes</h2>
          {props.item.designNotes ? <p>{props.item.designNotes}</p> : <p>No Design Notes Provided</p>}
        </div>
      </div>
      {!props.noRemove &&
      <button className="delete-from-cart" onClick={() => props.handleDeleteFromCart(props.item.cartItemID, props.item.imageName)}>Remove</button>
  }
    </div>
  )
}