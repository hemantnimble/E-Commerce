'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  title: string;
  price: string;
}

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  product: Product;
}

interface Order {
  id: string;
  createdAt: string;
  items: OrderItem[];
}

interface OrdersProps {
  userId: string;
}

function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`/api/admin/orders/get`);
          setOrders(response.data.orders);
        } catch (error) {
          setError('Failed to load orders');
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }
    fetchProducts()
  }, [])
  return (
    <div>
      <h2>Your Orders</h2>
      {/* {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3 className='text-red-500'>Order ID: {order.id}</h3>
              <p>Created At: {new Date(order.createdAt).toLocaleDateString()}</p>
              <ul>
                {order.items.map((item) => (
                  <li key={item.id}>
                    <p>Product: {item.product.title}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.product.price}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )} */}
    </div>

  )
}

export default Page