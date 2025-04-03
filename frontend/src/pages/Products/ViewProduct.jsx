import {useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import './Products.css'
import ViewProductForm from '../../components/ViewProductForm/ViewProductForm.jsx';
import { getSpecificProduct } from '../../services/datastore';
import LoadingModule from '../../components/LoadingModule/LoadingModule.jsx';
import Footer from '../../components/Footer/Footer.jsx';

const ViewProduct =(props) => {
    const [productInfo, setProductInfo] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(0);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();

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
    }, []);

    const handleBack=()=>{
        navigate('/products')
    }

    if(loading){
        return(
            <LoadingModule viewport />
        )
    }

    return(
        <>
            <main className="view-product">
                <section className="view-product__display-section">
                    <button className="display-section__back-button"onClick={handleBack}>
                        <svg className="back-button-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                    </button>
                    <div className="display-section__product-card">
                        <div className="product-card__image-container">
                            <img src={productInfo?.ImageURLs?.[selectedProduct] || ""}></img>
                        </div>
                        <ul className="options-container">
                            {productInfo?.ImageURLs?.map((image, index) => 
                                <li key={image} onClick={() => {setSelectedProduct(index)}} className={(selectedProduct == index) && 'active'}>
                                    <img src={image} alt={`Product Image ${index + 1}`} />
                                </li>
                                    )}
                        </ul>
                    </div>
                    <ViewProductForm productInfo={productInfo} />
                </section>
            </main>
            <Footer />
            </>
    )
}
export default ViewProduct;