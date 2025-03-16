import { useForm } from "react-hook-form"

import './ViewProductForm.css'
import ColorInput from '../ColorInput/ColorInput.jsx';
import SizeInput from '../SizeInput/SizeInput.jsx';
import CustomizationInput from "../CustomizationInput/CustomizationInput.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { addToCartFromSession } from "../../services/sessionStorage.js";
import { addToCart } from "../../services/datastore.js";

export default function ViewProductForm(props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sizes: {
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
      },
    },
  })

  const { user } = useAuth();

  const onSubmit = (data) =>{
    if (!data){
        alert("No Data");
    }else {
        if(user){
            console.log(data);
            addToCart(user.uid, props.productInfo.name, data);
        }else{
            addToCartFromSession({productID: props.selectedProduct, ...formData, quantity: 1});
            window.dispatchEvent(new Event('storage'));
        }
    }
}

  const selectedColor = watch("color");

  const selectedImage = watch("file");


  return (
    <form className="view-product-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="view-product-form__input-container">
        <div className="view-product-form__product-info">
            <h1>{props.productInfo.name}</h1>
            <h2>If there's something you need that isn't listed, simply request it in the box below."</h2>
        </div>
        <div className="form__line-break"/>
        <ColorInput selectedColor={selectedColor} register={register}/>
        <SizeInput register={register} setValue={setValue}/>
        <CustomizationInput register={register} selectedImage={selectedImage}/>
      </div>
      <button className="form__add-cart-button">Add To Cart</button>
    </form>
  )
}