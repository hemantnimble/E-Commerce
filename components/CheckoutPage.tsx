'use client'
import React, { useEffect, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import convertToSubcurrency from '@/utils/convertToSubcurrency';
import axios from 'axios';

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

function CheckoutPage() {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState<number>(0);

    // Fetch cart items and calculate total price
    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('/api/cart/get');
                const items = response.data as CartItem[];
                setCartItems(items);
                
                const total = items.reduce((sum, item) => {
                    const price = parseFloat(item.product.price);
                    return sum + price * item.quantity;
                }, 0);
                
                setTotalPrice(total);

                // Create PaymentIntent
                const paymentIntentResponse = await fetch("/api/paymentIntent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ amount: convertToSubcurrency(total) }),
                });

                const paymentIntentData = await paymentIntentResponse.json();
                setClientSecret(paymentIntentData.clientSecret);
            } catch (error) {
                console.error('Error fetching cart items:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCartItems();
    }, []);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setErrorMessage("Stripe.js has not loaded yet.");
            setLoading(false);
            return;
        }

        const { error: submitError } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${process.env.NEXT_PUBLIC_RETURN_URL}/profile`,
            },
        });

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }

        // Create the order
        const response = await fetch('/api/orders/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentIntentId: clientSecret, cartItems }),
        });

        const data = await response.json();
        if (!data.success) {
            setErrorMessage('Failed to create order');
        }

        setLoading(false);
    };

    if (!clientSecret || !stripe || !elements) {
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

    return (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
            {clientSecret && <PaymentElement />}

            {errorMessage && <div>{errorMessage}</div>}

            <button
                disabled={!stripe || loading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay $${totalPrice.toFixed(2)}` : "Processing..."}
            </button>
        </form>
    )
}

export default CheckoutPage
