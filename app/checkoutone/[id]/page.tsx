'use client'
import React, { useEffect, useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import CheckoutPage from '@/components/CheckoutPage';
import convertToSubcurrency from '@/utils/convertToSubcurrency';
import { useParams } from 'next/navigation';
import axios from 'axios';
interface Product {
    id: string;
    title: string;
    price: GLfloat;
    createdAt: string;
    updatedAt: string;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC ?? '');

function Page() {
    const params = useParams<{ id: string }>()
    const id = params?.id;
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async (id: any) => {
            try {
                const response = await axios.post<{ product: Product }>("/api/products/getsingleproduct", { id })
                setProduct(response.data.product)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts(id)
    }, [id])
    const amount = product?.price ?? 1;
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