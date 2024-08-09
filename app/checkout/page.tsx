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

    useEffect(() => {
        const fetchProducts = async () => {
            const savedCartItems = await localStorage.getItem('cartItems');
            try {
                if (savedCartItems) {
                    setCartItems(JSON.parse(savedCartItems));
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    useEffect(() => {
        console.log("Cart Items for price calculation:", cartItems);
        const total = cartItems.reduce((sum: number, item: CartItem) => {
            const price = parseFloat(item.product.price); 
            return sum + price * item.quantity;
        }, 0);

        setTotalPrice(total);
    }, [cartItems]);

    const amount = totalPrice ?? 1;
    console.log('totalprice', totalPrice);
    // console.log('cartitems', cartItems);
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