import './Products.css';
import { getAllProducts } from '../../services/datastore';
import { useEffect, useState } from 'react';
import ViewProduct from './ViewProduct';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [viewProduct, setViewProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState('');

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

    const handleViewClick = (id) => {
        setSelectedProduct(id);
        setViewProduct(true);
    }

    return (
        <>
            {viewProduct ? (
                <main className="view-product">
                    <ViewProduct selectedProduct={selectedProduct} setViewProduct={setViewProduct} />
                </main>
            ) : (
                <main className="products">
                    <h3>We offer a wide range of custom merchandise to fit your needs! The products on our website are just a sample of what we can create. If you’re looking for something specific that’s not listed, just reach out—we’d love to make it happen for you!</h3>
                    <div className="products__grid">
                        {products.map((product) => (
                            <div key={product.id} className="grid__product-item" onClick={() => handleViewClick(product.id)}>
                                <div className="product-item__hover"/>
                                <div className="product-item__view">View Item</div>
                                <img className="product-item__image" src={product.imageURL} alt="hello" />
                                <div className="product-item__background"/>
                            </div>
                        ))}
                    </div>
                </main>
            )}
        </>
    )
}

export default Products;
