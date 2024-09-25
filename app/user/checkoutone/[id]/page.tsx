'use client'
import React, { useEffect, useState } from 'react'
import CheckoutPageSingle from '@/components/CheckoutSingle'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '@/utils/convertToSubcurrency';
import AddressSection from '@/components/AddressSection';


interface Product {
    id: string;
    title: string;
    price: GLfloat;
    images: string[];
    createdAt: string;
    updatedAt: string;
}
function Page() {
    const params = useParams<{ id: string }>()
    const id = params?.id;
    const [product, setProduct] = useState<Product | null>(null);
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC ?? '');
    const fetchProducts = async (id: any) => {
        try {
            const response = await axios.post<{ product: Product }>("/api/products/getsingleproduct", { id })
            setProduct(response.data.product)
        } catch (error) {
            console.error("Error fetching products:", error)
        }
    }
    useEffect(() => {
        fetchProducts(id)
    }, [id])
    const amount = product?.price ?? 1;
    const item = product
    return (
        <div>
            <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
                <div className="px-4 pt-8">
                    <p className="text-xl font-medium">Order Summary</p>
                    <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
                    <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
                        <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                            <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={product?.images[0]} alt="" />
                            <div className="flex w-full flex-col px-4 py-4">
                                <span className="font-semibold">{product?.title}</span>
                                <span className="float-right text-gray-400">42EU - 8.5US</span>
                                <p className="text-lg font-bold">${product?.price}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <AddressSection></AddressSection>
                <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
                    <p className="text-xl font-medium">Payment Details</p>
                    <p className="text-gray-400">Complete your order by providing your payment details.</p>
                    <Elements stripe={stripePromise}
                        options={{
                            mode: "payment",
                            amount: convertToSubcurrency(amount),
                            currency: "usd",
                        }}
                    >
                        <CheckoutPageSingle amount={amount} item={product} />
                    </Elements>
                    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Place Order</button>
                </div>
            </div>
        </div>
    )
}

export default Page
