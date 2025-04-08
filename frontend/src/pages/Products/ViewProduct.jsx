import {useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';

import './ViewProduct.css';
import ViewProductForm from '../../components/ViewProductForm/ViewProductForm.jsx';
import { getSpecificProduct } from '../../services/datastore';
import LoadingModule from '../../components/LoadingModule/LoadingModule.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import rightArrow from '../../assets/right-arrow.svg';
import leftArrow from '../../assets/left-arrow.svg';
import rightArrow2 from '../../assets/right-arrow-2.svg';
import rightArrow2Black from '../../assets/right-arrow-2-black.svg';

const ViewProduct =(props) => {
    const [productInfo, setProductInfo] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [loading, setLoading] = useState(false);
    const [loadingCartAddition, setLoadingCartAddition] = useState(false);
    const { user, signIn } = useAuth();

    const navigate = useNavigate();

    const { productName } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            setLoading(true);
            const data = await getSpecificProduct(productName);
            setProductInfo(data.docs[0].data());
            setLoading(false);
        }
        getProduct();
    }, [productName]);

    const handleBack=()=>{
        navigate('/products')
    }

    const leftSlider = {
        hidden: {
            opacity: 0,
            x: -20,
        },
        visible: {
            opacity: selectedProduct===1 ? 1 : 0,
            x: 0,
        }
    }

    const rightSlider = {
        hidden: {
            opacity: 0,
            x: 20,
        },
        visible: {
            opacity: selectedProduct=== productInfo?.ImageURLs?.length - 2 ? 1 : 0,
            x: 0,
        }
    }

    const backButton = {
        hidden: {
            top: "-100%",
            left: "-100%",
            transition: {
                duration: .2, ease: "easeOut"
            }
        },
        visible: {
            top: "0",
            left: "0",
            transition: {
                duration: .2, ease: "easeOut"
            }
        }
    }

    const nextSlide = () => {
        if(selectedProduct <= productInfo?.ImageURLs?.length - 2) setSelectedProduct((prev) => prev + 1);
      }
    
    const prevSlide = () => {
        if(selectedProduct >= 1) setSelectedProduct((prev) => prev - 1);
    }

    if(loading){
        return(
            <LoadingModule viewport />
        )
    }

    return(
        <>
            <main className="view-product">
                <LoadingModule modal show={loadingCartAddition} />
                <section className="view-product__display-section">
                    <motion.button 
                        className="display-section__back-button"
                        onClick={handleBack}
                        initial="hidden" 
                        whileHover="visible" 
                    >
                        <img src={rightArrow2Black} />
                        <motion.div className="display-section__back-button__hover-container" variants={backButton}>
                            <img src={rightArrow2} />
                        </motion.div>
                    </motion.button>
                    <div className="display-section__product-card">
                        <motion.div 
                            className="product-card__image-container"
                            initial="hidden"
                            whileHover="visible"
                        >
                            {productInfo?.ImageURLs?.map((image, index) => {
                                return (
                                    <img 
                                        className={`product-card__image-container__image ${(selectedProduct == index) ? 'active' : ''}`}
                                        key={image} 
                                        src={image} 
                                        alt={`Product Image ${index + 1}`} 
                                    />
                                )
                            })}
                            <motion.button 
                                onClick={prevSlide}
                                className={`btn-left`} 
                                style={{left: "10px"}} 
                                variants={leftSlider} 
                            >
                                <img src={leftArrow} />
                            </motion.button>
                            <motion.button 
                                className="btn-right" 
                                onClick={nextSlide}
                                style={{right: "10px"}} 
                                variants={rightSlider} 
                            >
                                <img src={rightArrow}/>
                            </motion.button>
                        </motion.div>
                        <ul className="options-container">
                            {productInfo?.ImageURLs?.map((image, index) => 
                                <li 
                                    className={(selectedProduct == index) ? 'active' : ''}
                                    key={image} 
                                    onClick={() => {setSelectedProduct(index)}} 
                                >
                                    <img src={image} alt={`Product Image ${index + 1}`} />
                                </li>
                            )}
                        </ul>
                    </div>
                    <ViewProductForm productInfo={productInfo} user={user} signIn={signIn} loader={setLoadingCartAddition} />
                </section>
            </main>
            <Footer />
            </>
    )
}
export default ViewProduct;