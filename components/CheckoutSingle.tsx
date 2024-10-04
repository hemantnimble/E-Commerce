'use client'
import React, { useEffect, useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import convertToSubcurrency from '@/utils/convertToSubcurrency';
import { Button } from './ui/button';

function CheckoutPageSingle({ amount, item, selectedAddress }: { amount: number, item: any, selectedAddress: any }) {
    const stripe = useStripe();
    const elements = useElements();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch("/api/paymentIntent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [amount]);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();

        if (submitError) {
            setErrorMessage(submitError.message);
            setLoading(false);
            return;
        }
        // const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');

        // Send order creation request to the server
        const response = await fetch('/api/orders/createone', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ paymentIntentId: clientSecret, item, quantity: 1, selectedAddress }),
        });


        const returnUrl = process.env.NEXT_PUBLIC_RETURN_URL;

        const { error } = await stripe.confirmPayment({
            elements,
            clientSecret,
            confirmParams: {
                return_url: `${returnUrl}/user/payment-success`,
            },
        });
        if (error) {
            //  This point is only reached if there's an immediate error when
            //  confirming the payment.Show the error to your customer(for example, payment details incomplete)
            setErrorMessage(error.message);
        } else {
            //  The payment UI automatically closes with a success animation.
            //  Your customer is redirected to your`return_url`.
        }


        const data = await response.json();
        if (data.success) {
            console.log('data', data)
            // Handle successful order creation (e.g., redirect or show a success message)
        } else {
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

            {/* <button
                disabled={!stripe || loading}
                className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
            >
                {!loading ? `Pay $${amount}` : "Processing..."}
            </button> */}

            <Button className="w-full mt-4" disabled={!stripe || loading}>
                {!loading ? `Pay $${amount}` : "Processing..."}
            </Button>
        </form>
    )
}

export default CheckoutPageSingle