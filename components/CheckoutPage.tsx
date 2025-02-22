'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

interface CartItem {
    id: string;
    quantity: number;
    createdAt: string;
    updatedAt: string;
    product: Product;
}

interface Product {
    id: string;
    title: string;
    price: string;
}

function CheckoutPage({ amount, cartItems, selectedAddress }: { amount: number, cartItems: CartItem[], selectedAddress: any }) {
    const [errorMessage, setErrorMessage] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter(); // Initialize useRouter

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!selectedAddress) {
            alert("Please select address")
            setLoading(false);
            return;
        }

        try {
            // Step 1: Create a Razorpay order
            const razorpayResponse = await fetch("/api/orders/createrazor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
            });

            const razorpayOrder = await razorpayResponse.json();

            // Step 2: Load Razorpay script dynamically
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            document.body.appendChild(script);

            script.onload = () => {
                const options = {
                    key: process.env.NEXT_PUBLIC_PAYMENT_PUBLIC, // Use your Razorpay key ID
                    amount: razorpayOrder.order.amount * 100,
                    currency: razorpayOrder.order.currency,
                    name: "Your Company Name",
                    description: "Test Transaction",
                    image: "https://example.com/your_logo.png",
                    order_id: razorpayOrder.order.id,
                    handler: async function (response: any) {
                        // Step 3: Handle successful payment
                        alert(`Payment successful! Payment ID: ${response.razorpay_payment_id}`);

                        // Step 4: Create an order in your database
                        try {
                            const orderResponse = await fetch("/api/orders/create", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    paymentIntentId: response.razorpay_payment_id,
                                    cartItems,
                                    quantity: 1, // Assuming quantity is 1 for single product
                                    selectedAddress,
                                }),
                            });

                            const order = await orderResponse.json();

                            if (orderResponse.ok) {
                                // Step 5: Redirect to the success page or order details page
                                router.push(`http://localhost:3000/user/orders`); // Redirect to order details page
                            } else {
                                setErrorMessage("Failed to create order. Please contact support.");
                            }
                        } catch (error) {
                            console.error("Order creation failed:", error);
                            setErrorMessage("Order creation failed. Please contact support.");
                        }
                    },
                    prefill: {
                        name: "John Doe",
                        email: "john.doe@example.com",
                        contact: "9999999999",
                    },
                    notes: {
                        address: "Razorpay Corporate Office",
                    },
                    theme: {
                        color: "#3399cc",
                    },
                };

                const rzp = new (window as any).Razorpay(options);
                rzp.open();
            };
        } catch (error) {
            console.error("Payment failed:", error);
            setErrorMessage("Payment failed. Please try again.");
        } finally {
            setLoading(false);
        }


        setLoading(false);
    };



    return (
        <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
            {errorMessage && <div>{errorMessage}</div>}
            <button
                disabled={loading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay $${amount}` : "Processing..."}
            </button>
        </form>
    );
}

export default CheckoutPage;
