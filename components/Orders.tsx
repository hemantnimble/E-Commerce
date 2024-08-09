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

const Orders: React.FC = () => {

  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProducts = async () => {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(`/api/orders/get`);
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
    // <div>
    //   <h1>Orders</h1>
    //   <div className="relative overflow-x-auto">
    //     <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    //       <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
    //         <tr>
    //           <th scope="col" className="px-6 py-3">
    //             Product name
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Color
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Category
    //           </th>
    //           <th scope="col" className="px-6 py-3">
    //             Price
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //             Apple MacBook Pro 17
    //           </th>
    //           <td className="px-6 py-4">
    //             Silver
    //           </td>
    //           <td className="px-6 py-4">
    //             Laptop
    //           </td>
    //           <td className="px-6 py-4">
    //             $2999
    //           </td>
    //         </tr>
    //         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
    //           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //             Microsoft Surface Pro
    //           </th>
    //           <td className="px-6 py-4">
    //             White
    //           </td>
    //           <td className="px-6 py-4">
    //             Laptop PC
    //           </td>
    //           <td className="px-6 py-4">
    //             $1999
    //           </td>
    //         </tr>
    //         <tr className="bg-white dark:bg-gray-800">
    //           <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
    //             Magic Mouse 2
    //           </th>
    //           <td className="px-6 py-4">
    //             Black
    //           </td>
    //           <td className="px-6 py-4">
    //             Accessories
    //           </td>
    //           <td className="px-6 py-4">
    //             $99
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table>
    //   </div>

    // </div>
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <h3>Order ID: {order.id}</h3>
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
      )}
    </div>
  );
};

export default Orders;