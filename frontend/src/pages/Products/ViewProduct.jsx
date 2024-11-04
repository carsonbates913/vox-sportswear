/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { get } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Navbar from '../../components/Navbar/Navbar';
import { initFirebase, addToCart, getSpecificProduct } from '../../services/datastore';
import { retrieveCartFromSession, addToCartFromSession } from '../../services/sessionStorage.js';
import React, {useEffect, useState } from 'react';
import './Products.css'


const ViewProduct =(props) => {
    const [productInfo, setProductInfo] = useState([]);
    const [size, setSize] = useState();
    const app = initFirebase();
    const auth = getAuth(app);
    console.log("productinfo,", size);

    useEffect(() => {
        const getProduct = async () => {
            const data = await getSpecificProduct(props.selectedProduct);
            setProductInfo(data.data());
        }

        getProduct();
    }, []);

    /* Returns to the all product page */
    const handleBack=()=>{
        props.setViewProduct(false);
    }
    /*Tracks the selected size by user */
    const handleSelectedSize =(e) =>{ 
        setSize(e.target.value);
    }
    
    const handlePurchase =() =>{
        if (size) {
            if(auth.currentUser){
                addToCart(auth.currentUser.uid, props.selectedProduct, size);
            }else{
                addToCartFromSession({productID: props.selectedProduct, size: size});
                window.dispatchEvent(new Event('storage'));
            }
        } else {
            alert("select size")
        }
    }

    return(
        <div>
            <ul id="layout">
                <li className="layout-item">
                    <button onClick={handleBack}>Back</button>
                    <p id="p-name">{productInfo.productName}</p>
                    <p id="p-desc">{productInfo.description}</p>
                    <img src='/assets/mockimg.png' width="100px"/>
                    <p id="p-price">${productInfo.price}</p>
                    <select onChange={handleSelectedSize} value={size}>
                            <option>Select Size</option>
                            <option>XS</option>
                            <option>S</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                    </select>
                    <button onClick={handlePurchase}>Purchase</button>
                </li>
            </ul>
        </div>
    )
}
export default ViewProduct;