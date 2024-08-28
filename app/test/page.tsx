'use client'
import { useEffect } from 'react';
import axios from 'axios';
import { useCart } from '@/components/CartContext';

const Navbar = () => {
  const { cartItems, setCartItems } = useCart();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart/get');
        const items = response.data.length;
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div>
      Cart Items: {cartItems}
    </div>
  );
};

export default Navbar;
