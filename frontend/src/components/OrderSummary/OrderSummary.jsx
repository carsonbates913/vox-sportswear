import './OrderSummary.css';

export default function OrderSummary(props) {
  return (
    <div className="order-summary">
      <div className="order-summary__item">
        <p className="order-summary__num-items">{props.numItems} {props.numItems > 1 ? "items" : "item"}</p>
      </div>
      <div className="order-summary__item">
        <p>*Price and follow-up will be delivered via email within 48 hours of order request*</p>
      </div>
      <div className="order-summary__item">
        <button className="button-checkout" onClick={props.handleCheckout}>
          SEND REQUEST
        </button>
      </div>
    </div>
  )
}