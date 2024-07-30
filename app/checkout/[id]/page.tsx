'use client'
import React from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/utils/convertToSubcurrency';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC ?? '');

function page() {
    const amount = 99.99
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

export default page