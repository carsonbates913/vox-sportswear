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
        <div>
            {viewProduct ? (
                <main className="view-product">
                    <ViewProduct selectedProduct={selectedProduct} setViewProduct={setViewProduct} />
                </main>
            ) : (
                <main className="products">
                    <div className="products__grid">
                        {products.map((product) => (
                            <div key={product.id} className="grid__product-item" onClick={() => handleViewClick(product.id)}>
                                <div className="product-item__hover"/>
                                <div className="product-item__view">View Item</div>
                                <img className="product-item__image" src='/assets/Vox-Bag.png' alt="hello" />
                                <div className="product-item__background"/>
                            </div>
                        ))}
                    </div>
                </main>
            )}
        </div>
    )
}

export default Products;
