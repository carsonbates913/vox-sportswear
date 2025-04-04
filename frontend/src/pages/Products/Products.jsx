import './Products.css';
import ProductList from '../../components/ProductList/ProductList.jsx';
import ProductGallery from '../../components/ProductGallery/ProductGallery.jsx';
import { getAllProducts } from '../../services/datastore';
import { useEffect, useState } from 'react';
import ViewProduct from './ViewProduct';

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await getAllProducts();
                const productArray = data.docs.map((doc) => ({ id: doc.id, ...doc.data()}));
                setProducts(productArray);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        getProducts();
    }, [])

    return (
        <main className="products">
            <div className="products__note">
                <h3>The products on our website are just a <span style={{color:'4A4A4A', fontWeight:"600"}}>sample</span> of what we can create.</h3>
                <h3>If you’re looking for something specific that’s not listed, just reach out—we’d love to make it happen for you!</h3>
            </div>
                <ProductList products={products} />
                <p>Our Products</p>
                <ProductGallery ImageURLs={products.flatMap(product => product.ImageURLs)}/>
        </main>
    )
}

export default Products;
