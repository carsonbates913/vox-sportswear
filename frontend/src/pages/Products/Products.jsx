import './Products.css';
import { getAllProducts } from '../../services/datastore';
import { useEffect, useState } from 'react';
import ViewProduct from './ViewProduct';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [viewProduct, setViewProduct] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(''); // holds the ID of the Product 
    console.log(products);

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
                <div>
                    <ViewProduct selectedProduct={selectedProduct} setViewProduct={setViewProduct} />
                </div>
            ) : (
                <div>
                    <div className="grid-products" id="layout">
                        {products.map((product) => (
                            <div key={product.id} className="product-item" onClick={() => handleViewClick(product.id)}>
                                <div className="product-hover"/>
                                <div className="product-view">View Item</div>
                                <img className="product-image" src='/assets/Vox-Bag.png' alt="hello" />
                                <div className="product-background"/>
                            </div>
                        ))}
                            <div className="product-item" >
                                <div className="product-hover"/>
                                <div className="product-view">View Item</div>
                                <img className="product-image" src='/assets/Vox-Bag.png' alt="hello" />
                                <div className="product-background"/>
                            </div>
                            <div className="product-item" >
                                <div className="product-hover"/>
                                <div className="product-view">View Item</div>
                                <img className="product-image" src='/assets/Vox-Bag.png' alt="hello" />
                                <div className="product-background"/>
                            </div>
                            <div className="product-item" >
                                <div className="product-hover"/>
                                <div className="product-view">View Item</div>
                                <img className="product-image" src='/assets/Vox-Bag.png' alt="hello" />
                                <div className="product-background"/>
                            </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default Products;
