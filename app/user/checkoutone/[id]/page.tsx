'use client'
import React, { useEffect, useState } from 'react'
import CheckoutPageSingle from '@/components/CheckoutSingle'
import { useParams } from 'next/navigation';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import convertToSubcurrency from '@/utils/convertToSubcurrency';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import AddressSection from '@/components/AddressSection'

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
    const [selectedAddress, setSelectedAddress] = useState(null);
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
    }, [id]);

    const handleSelectAddress = (addressId: any) => {
        setSelectedAddress(addressId);  
        console.log("Selected Address ID:", addressId);
    };

    const amount = product?.price ?? 1;
    const item = product
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <img className="h-24 w-28 rounded-md border object-cover object-center" src={product?.images[0]} alt="" />
                                <div className='flex flex-col'>
                                    <span>{product?.title}</span>
                                    <span>${product?.price}</span>
                                </div>
                            </div>
                            <hr />
                            <div className="flex justify-between font-bold">
                                <span>Total</span>
                                <span>${product?.price}+tax</span> 
                            </div>
                        </div>
                    </CardContent>
                </Card>
                {/* !Address Section */}
                <AddressSection onSelectAddress={handleSelectAddress} />
                <Card className="mt-6">
                    <div className="p-6">
                        <CardTitle>Payment</CardTitle>
                        <CardDescription>Enter your payment details</CardDescription>
                        <Elements stripe={stripePromise}
                            options={{
                                mode: "payment",
                                amount: convertToSubcurrency(amount),
                                currency: "usd",
                            }} >
                            <CheckoutPageSingle amount={amount} item={product} selectedAddress={selectedAddress} />
                        </Elements>
                    </div>
                </Card>
            </div>
        </div>
    )
}

export default Page


