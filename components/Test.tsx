'use client'
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/utils/convertToSubcurrency';
import axios from 'axios';
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC ?? '');
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

function Page() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/cart/get');
                const items: CartItem[] = response.data;
                setCartItems(items);
                const total = items.reduce((sum: number, item: CartItem) => {
                    const price = parseFloat(item.product.price);
                    return sum + price * item.quantity;
                }, 0);
                setTotalPrice(total);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchCartItems();
    }, []);

    const amount = totalPrice ?? 1;

    if (loading) {
        return (
            <div className="flex items-center justify-center">
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                    role="status"
                >
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                        Loading...
                    </span>
                </div>
            </div>
        );
    }

    if (amount === undefined) {
        return <div>Error: Total price not available.</div>;
    }
    return (
        <Elements stripe={stripePromise}
            options={{
                mode: "payment",
                amount: convertToSubcurrency(amount),
                currency: "usd",
            }}>
            <CheckoutPage amount={amount} cartItems={cartItems} />
        </Elements>
    )
}
export default Page
