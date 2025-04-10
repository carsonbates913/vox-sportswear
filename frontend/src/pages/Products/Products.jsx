import { useEffect, useState } from 'react';

import './Products.css';
import ProductList from '../../components/ProductList/ProductList.jsx';
import ProductGallery from '../../components/ProductGallery/ProductGallery.jsx';
import { getAllProducts } from '../../services/datastore';
import Footer from '../../components/Footer/Footer.jsx';
import LoadingModule from '../../components/LoadingModule/LoadingModule.jsx';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const data = await getAllProducts();
                const productArray = data.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
                setProducts(productArray);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
            setLoading(false);
        }
        getProducts();
    }, [])

    return (
        <main className="products">
            <div className="products-wrapper">
                <div className="products__note">
                    <h3>The products on our website are just a <span style={{color:'4A4A4A', fontWeight:"600"}}>sample</span> of what we can create.</h3>
                    <h3>If you’re looking for something specific that’s not listed, just reach out—we’d love to make it happen for you!</h3>
                </div>
                <LoadingModule show={loading} viewport/>
                {!loading && (
                    <>
                        <ProductList products={products} />
                        <div className="products__line-break" />
                        <p>Our Products</p>
                        <ProductGallery/>
                    </>
                )}
            </div>
            <Footer />
        </main>
    )
}

export default Products;
