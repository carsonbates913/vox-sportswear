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
                    <h1>Our Products</h1>
                </div>
                <LoadingModule show={loading} viewport/>
                {!loading && (
                    <>
                        <ProductList products={products} />
                        <div className="products__line-break" />
                        <ProductGallery/>
                    </>
                )}
            </div>
            <Footer />
        </main>
    )
}

export default Products;
