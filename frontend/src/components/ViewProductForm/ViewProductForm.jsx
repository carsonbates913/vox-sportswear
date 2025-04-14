import { set, useForm } from "react-hook-form"
import { useState } from "react";
import { httpsCallable } from "firebase/functions";

import './ViewProductForm.css'
import ColorInput from '../ColorInput/ColorInput.jsx';
import SizeInput from '../SizeInput/SizeInput.jsx';
import CustomizationInput from "../CustomizationInput/CustomizationInput.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { uploadImageToStorage, functions } from "../../services/datastore.js";
import InfoBox from '../InfoBox/InfoBox.jsx';
import AlertModal from '../AlertModal/AlertModal.jsx';
import { uploadProduct } from "../../services/datastore.js";

export default function ViewProductForm(props) {

  const [currentModal, setCurrentModal] = useState(null);

  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
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

  const selectedColor = watch("color");

  const selectedImage = watch("file");

  const handleClear = () => {
    setCurrentModal(null);
  }

  const addToCart = httpsCallable(functions, "addToCart");

  const onSubmit = async (data) =>{
    if(!user){
      setCurrentModal("signIn");
      return;
    }

    if(!data){
      console.error("Error: No data");
      return;
    }

    props.loader(true);

    try {
      console.log("hello");
      const result = await addToCart({
        product: props.productInfo.name,
        sizes: data.sizes,
        color: data.color,
        designNotes: data.designNotes,
      })

      console.log(result);

      if (data.file[0]) {
        console.log("check");
        console.log(result.data.docId);
        await uploadImageToStorage(user.uid, result.data.docId, data.file[0]);
      }

    }catch(error){
      if(error.code){
        console.error("Firebase error:", error.code, error.message);

        if(error.code === "functions/unauthenticated"){
          setCurrentModal("signIn");
        }else if(error.code === "functions/resource-exhausted") {
          setCurrentModal("overloadedCart");
        }
      }
    }finally {
      props.loader(false);
    }
  }

  return (
    <form className="view-product-form" onSubmit={handleSubmit(onSubmit)}>
      <AlertModal 
        show={(currentModal === "signIn") && !user}
        header="Sign In Required"
        body="Please sign in to continue with your order"
        handleClear={handleClear}>
            <button 
              className="sign-in-alert__btn" 
              onClick={async () => {
                const result = await props.signIn()
                if(result){
                  handleClear()
                }
              }}
            style={{backgroundColor: '#3EFFA1', color: 'black'}}
            >
            Sign in
            </button>
      </AlertModal>
      <AlertModal 
        show={(currentModal === "overloadedCart")}
        header="Cart Full"
        body="Maxiumum of 20 items is allowed per request"
        handleClear={handleClear}
      />
      <div className="view-product-form__input-container">
        <div className="view-product-form__product-info">
            <h1>{props.productInfo.name}</h1>
            <InfoBox />
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