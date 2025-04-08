import { useForm } from "react-hook-form"
import { httpsCallable } from "firebase/functions";

import './OrderForm.css'
import { functions } from "../../services/datastore.js";

export default function OrderForm(props) {

  const sendOrderResponse = httpsCallable(functions, "sendOrderResponse");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      message: "",
    },
  })

  const onSubmit = async (data, e) => {
    const action = e.nativeEvent.submitter.value;
    
    try {
      if(action === "accept"){
        await sendOrderResponse({
          submitType: "accept",
          consumerID: props.selectedOrder.userID,
          consumerEmail: props.selectedOrder.userEmail,
          price: data.price,
          message: data.message,
          orderID: props.selectedOrder.orderID,
        });
        /*
          await fetch("https://sendorderresponse-ffshwcchqq-uc.a.run.app", {
              mode: "cors",
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({submitType: "accept", consumerID: props.selectedOrder.userID, consumerEmail: props.selectedOrder.userEmail, price: data.price, message: data.message, orderID: props.selectedOrder.orderID}),
          })
        */
      }else if (action === "decline"){
        await sendOrderResponse({
          submitType: "decline",
          consumerID: props.selectedOrder.userID,
          consumerEmail: props.selectedOrder.userEmail,
          price: data.price,
          message: data.message,
          orderID: props.selectedOrder.orderID,
        });
      }
    } catch(error) {
      if(error.code){
        console.log(error.code);
        console.log(error);
      }
    }
}

  return (
    <form className="review-order-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="review-order-form__price-container">
            <p style={{marginRight: "20px"}}>Price: </p>
            {errors.price && <p className="order-form-error">{errors.price.message}</p>}
            <input {...register("price", {required: "Must provide a valid price", pattern: {value: /^\d+(\.\d{2})$/, message: "Must be a valid number with two decimal places (e.g., 10.99)"} })} placeholder="$0.00"></input>
        </div>
        <div className="review-order-form__message-container">
            <p>Message: </p>
            <input {...register("message")}></input>
        </div>
        <div className="review-order-form__submit-container">
            <button type="submit" name="hello" value="decline">Decline</button>
            <button type="submit" name="action" value="accept">Accept</button>
        </div>
    </form>
  )
}