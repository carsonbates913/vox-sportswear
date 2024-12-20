import { addToCart, getSpecificProduct } from '../../services/datastore';
import { addToCartFromSession } from '../../services/sessionStorage.js';
import {useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx'
import './Products.css'


const ViewProduct =(props) => {
    const colorList = ["#FFFFFF", "#000000", "#D3D3D3", "#333333", "#F5F5DC", "#B38B6D", "#FFFFF0"];
    const sizeList = ["S", "M", "L", "XL", "XXL"];

    const [formData, setFormData] = useState({color: colorList[0], size: null, customization: "", image: null}) 
    const [addPersonalDesign, setAddPersonalDesign] = useState(false);

    const [productInfo, setProductInfo] = useState([]);
    const [size, setSize] = useState();
    const { user } = useAuth();
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

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        console.log(formData);
        setFormData((prevData) => ({...prevData, [name]: value}));
    }

    const handleImageChange = (e) => {
        const image = e.target.files[0];
        if(image) {
            setFormData((prevData) => ({...prevData, image: image}))
        }
    }

    return(
        <div>
            <button onClick={handleBack}>Back</button>
            <div className="view-product-main-content">
                <section className="view-product-section">
                    <div className="view-product-card">
                        <img className="view-product-image" src="/assets/Vox-Bag.png"></img>
                    </div>
                    <div className="view-product-form">
                        <div className="view-product-info">
                            <p className="view-product-name">Short-Sleeve Shirt</p>
                            <p className="view-product-description">Customizeable Label</p>
                        </div>
                        <div className="view-product-line-break"/>
                        <div className="view-product-customizeables">
                            <div className="view-product-color">
                                <p className="view-product-customize-label">Color: <span style={{fontWeight: "200"}}>{formData.color}</span></p>
                                <div className="view-product-set">
                                    {colorList.map( color => {
                                        return (
                                            <input key={color} type="radio" className={`color-selector ${formData.color === color ? 'color-selected' : ''}`} style={{backgroundColor: `${color}`}} name="color" value={color} onChange={e=>{handleFormChange(e)}} checked={formData.color===color}/>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="view-product-size">
                                <p className="view-product-customize-label">Size*</p>
                                <div className="view-product-set">
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
                            <div className="view-product-personal-design">
                                <p className="view-product-customize-label" onClick={()=>{setAddPersonalDesign(!addPersonalDesign)}}>Personal Design +</p>
                                {addPersonalDesign && (
                                    <>
                                    <textarea className="view-product-personal-customization" name="customization" value={formData.customization} onChange={(e) => {handleFormChange(e)}}/>
                                    <input className="button-add-image" type="file" accept="image/*" onChange={e=>{handleImageChange(e)}} />
                                    </>
                                )}
                            </div>
                        </div>
                        <button className="button-add-to-cart" onClick={handlePurchase}>Add To Cart</button>
                    </div>
                </section>
            </div>
        </div>
    )
}
export default ViewProduct;