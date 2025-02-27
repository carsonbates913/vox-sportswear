import { addToCart, getSpecificProduct } from '../../services/datastore';
import { addToCartFromSession } from '../../services/sessionStorage.js';
import {useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Products.css'
import ImageUpload from '../../components/ImageUpload/ImageUpload.jsx';
import ViewProductForm from '../../components/ViewProductForm/ViewProductForm.jsx';


const ViewProduct =(props) => {
    const colorList = ["#FFFFFF", "#000000", "#D3D3D3", "#333333", "#F5F5DC", "#B38B6D", "#FFFFF0"];
    const sizeList = ["S", "M", "L", "XL", "XXL"];

    const [formData, setFormData] = useState({color: colorList[0], size: null, customization: "", image: null}) 
    const [addPersonalDesign, setAddPersonalDesign] = useState(false);
    const [productInfo, setProductInfo] = useState([]);
    const { user } = useAuth();

    const navigate = useNavigate();
    const { productName } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const data = await getSpecificProduct(productName);
            console.log(data);
            setProductInfo(data.docs[0].data());
        }

        getProduct();
        console.log(productInfo);
    }, []);

    /* Returns to the all product page */
    const handleBack=()=>{
        console.log(productInfo);
        navigate('/products')
    }
    
    const handlePurchase =() =>{
        if (!formData.size){
            alert("select size");
        }else {
            if(user){
                console.log(formData);
                addToCart(user.uid, props.selectedProduct, formData);
            }else{
                addToCartFromSession({productID: props.selectedProduct, ...formData, quantity: 1});
                window.dispatchEvent(new Event('storage'));
            }
            props.setViewProduct(false);
        }
    }

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        if(image) {
            setFormData((prevData) => ({...prevData, image: image}))
        }
    }

    return(
            <main className="view-product">
                <section className="view-product__display-section">
                    <button className="display-section__back-button"onClick={handleBack}>
                        <svg className="back-button-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div className="display-section__product-card">
                        <img className="product-card__image" src={productInfo?.ImageURLs?.[0] || ""}></img>
                    </div>
                    <ViewProductForm productInfo={productInfo} />
                    {/*}
                    <div className="display-section__form">
                        <div className="form__product-info">
                            <p className="product-info__name">{productInfo.name}</p>
                            <p className="product-info__description">Customizeable Label</p>
                        </div>
                        <div className="form__line-break"/>
                        <div className="form__customizeables">
                            <div className="customizeables__color">
                                <p className="customizeables__label">Color: <span style={{fontWeight: "200"}}>{formData.color}</span></p>
                                <div className="customizeables__set">
                                    {colorList.map( color => {
                                        return (
                                            <input key={color} type="radio" className={`color-selector ${formData.color === color ? 'color-selected' : ''}`} style={{backgroundColor: `${color}`}} name="color" value={color} onChange={e=>{handleFormChange(e)}} checked={formData.color===color}/>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="customizeables__size">
                                <p className="customizeables__label">Size*</p>
                                <div className="customizeables__set">
                                    {sizeList.map(size => {
                                        return (
                                            <label key={size} htmlFor={size} className={`view-product-size-label ${formData.size === size ? 'size-selected' : ''}`}>
                                                {size}
                                                <input key={size} type="radio" className="size-selector" id={size} name="size"  value={size} onChange={e=>{handleFormChange(e)}} checked={formData.size===size}/>
                                            </label>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="customizeables__personal-design">
                                <p className="customizeables__label" onClick={()=>{setAddPersonalDesign(!addPersonalDesign)}}>Personal Design +</p>
                                {addPersonalDesign && (
                                    <>
                                    <textarea className="view-product-personal-customization" name="customization" value={formData.customization} onChange={(e) => {handleFormChange(e)}}/>
                                    <ImageUpload className="custom-image" id="customImage"/>
                                    <label className="image-customization-label">
                                    </label>
                                    </>
                                )}
                            </div>
                        </div>
                        <button className="form__add-cart-button" onClick={handlePurchase}>Add To Cart</button>
                    </div>
                    */}
                </section>
            </main>
    )
}
export default ViewProduct;