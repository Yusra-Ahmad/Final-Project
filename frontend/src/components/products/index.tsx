import React, { useContext, useEffect, useState } from 'react';
import './styles.scss';
import { CartContext } from '../../context/Cart';

interface Product {
    _id: string;
    title: string;
    description: string;
    image: string;
    price: number;
}

const Base_Url = 'http://localhost:3020';

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const { addToCart } = useContext(CartContext)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${Base_Url}/products`);
                if (!response.ok) {
                    throw new Error('Failed to fetch products');
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className='product-list'>
            <h1>Products</h1>
            <div className='products-container'>
                {products.map(product => (
                    <div className='product-item'>
                        <img className='product-image' src={`${Base_Url}/${product.image}`} alt={product.title} />
                        <h2 className='product-title'>{product.title}</h2>
                        <p className='product-description'>{product.description}</p>
                        <p className='product-price'>${product.price}</p>
                        <button
                            className="px-4 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                            onClick={() => {
                                addToCart(product)
                            }}
                        >
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;
