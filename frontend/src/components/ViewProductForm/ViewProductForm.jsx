import { useForm } from "react-hook-form"
import { useState } from "react";

import './ViewProductForm.css'
import ColorInput from '../ColorInput/ColorInput.jsx';
import SizeInput from '../SizeInput/SizeInput.jsx';
import CustomizationInput from "../CustomizationInput/CustomizationInput.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { addToCartFromSession } from "../../services/sessionStorage.js";
import { addToCart } from "../../services/datastore.js";
import notesIcon from '../../assets/notes-icon.svg';
import xIconGreen from '../../assets/x-icon-green.svg';

export default function ViewProductForm(props) {

  const [alertVisible, setAlertVisible] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      sizes: {
        XS: 0,
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
        XXL: 0,
      },
      color: JSON.stringify({
        hex: null, 
        name: "See Request Notes" }),
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
            {alertVisible && (
              <div className="alert">
                <div className="alert__icon-container">
                  <img src={notesIcon} />
                </div>
                <div className="alert__note">If there's a specific size, color, image, or anything else you'd like that isn't listed below, just let us know in the Request Notes section — we can make it happen!</div>
                <div className="alert__exit">
                  <button onClick={() => setAlertVisible(false)}>x</button>
                </div>
              </div>
            )}
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