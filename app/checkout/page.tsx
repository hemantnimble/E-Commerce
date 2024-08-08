'use client'
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/utils/convertToSubcurrency';

interface Product {
    id: string;
    title: string;
    price: string;
}

interface CartItem {
    id: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC ?? '');

function Page() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    // Fetch cart items from localStorage
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const savedCartItems = await localStorage.getItem('cartItems');
                if (savedCartItems) {
                    setCartItems(JSON.parse(savedCartItems));
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    // Calculate total price whenever cartItems changes
    useEffect(() => {
        const total = cartItems.reduce((sum: number, item: CartItem) => {
            const price = parseFloat(item.product.price); // Convert price to number
            return sum + price * item.quantity; // Multiply price by quantity and add to sum
        }, 0);

        setTotalPrice(total);
    }, [cartItems]);

    const amount = totalPrice ?? 1;
    console.log('totalprice', totalPrice);
    console.log('cartitems', cartItems);
    return (
        <Elements stripe={stripePromise}
            options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "usd",
            }}
        >
            <CheckoutPage amount={amount} />
        </Elements>
    )
}

export default Page