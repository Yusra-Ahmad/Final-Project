import React, { useContext, useEffect, useState } from 'react';
import './OrderList.scss'; 
import { UserContext } from '../../context/UserContext';
// import Products from '../products/products';

interface Product {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface Order {
    _id: string;
    totalAmount: number;
    orderDate: string;
    status: string;
    products: Product[];
}
const Orders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const { token } = useContext(UserContext);
    console.log('Token:', token);
    const Base_Url = 'http://localhost:3020'; 
console.log(orders);


    useEffect(() => {
        if (token) {
            const fetchOrders = async () => {
                try {
                    const response = await fetch(`${Base_Url}/orders`, {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });
                    console.log(response);

                    if (!response.ok) {
                        
                        throw new Error('Failed to fetch orders');
                    }
                    const data = await response.json();
                    console.log(data);
                    setOrders(data);
                } catch (error) {
                    console.error('Error fetching orders:', error);
                }
            };
    
            fetchOrders();
        }
    }, [token, Base_Url]); 
    return (

        <div className="orders-container">
            <h1>My Orders</h1>
            {orders.length > 0 ? orders.map((order) => (
                <div className="order-item" key={order._id}>
                     <h2>Products</h2>
                    <p>Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                    <p>Total: €{order.totalAmount.toFixed(2)}</p>
                    <div className="order-details">

                        
                        {order.products.map(({product}) =>  {
                           

                            return <div key={product._id} className="product-details">
                                <img src={`${Base_Url}/${product.image}`} alt={product.name} style={{ width: '100px', height: '100px' }} />
                               
                                 <p>Quantity: {product.quantity}</p>
                                <p>Price: €{product.price}</p>
                            </div>
                           }
                           )}
                    </div>
                    <p>Status: {order.status}</p>
                </div>
            )) : <p>No orders found.</p>}


        </div>

    );
};


export default Orders;
