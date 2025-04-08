import './OrderHistoryList.css'
import OrderHistoryItem from '../OrderHistoryItem/OrderHistoryItem.jsx'

export default function OrderHistoryList(props) {
  return (
    <div className="order-history-list">
      {props.orders.map((order) => (
        <OrderHistoryItem key={order.orderID} order={order} />
      ))}
    </div>
  )
}