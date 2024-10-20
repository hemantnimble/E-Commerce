'use client'
import * as React from "react";
import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useCart } from "@/components/CartContext";
import toast from "react-hot-toast";
import Link from "next/link";
import Reviews from '@/components/magicui/Reviews'
import Model3d from "@/components/Model3d";

interface Product {
    id: string;
    title: string;
    price: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

export default function Component() {
    const params = useParams<{ id: string }>();
    const id = params?.id;
    const [product, setProduct] = useState<Product | null>(null);
    const [ploading, setPloading] = useState(true);
    const [modal3d, setModal3d] = useState(false)

    useEffect(() => {
        const fetchProduct = async (productId: string) => {
            try {
                const response = await axios.post<{ product: Product }>("/api/products/getsingleproduct", { id: productId });
                setProduct(response.data.product);
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setPloading(false);
            }
        };

        // Check if id is defined and then fetch the product
        if (id) {
            fetchProduct(id);
        }
    }, [id]);

    const [loading, setLoading] = useState(false);
    const { cartItems, setCartItems } = useCart();

    const handleCart = async (productId: string | undefined) => {
        if (!productId) {
            toast.error('Invalid product ID');
            return;
        }

        setLoading(true);
        try {
            await axios.post("/api/cart/add", { productId, quantity: 1 });
            const response = await axios.get('/api/cart/get');
            const items = response.data.length;
            setCartItems(items);
            toast.success('Product added to cart');
        } catch (error) {
            console.error('Error adding to cart:', error);
            toast.error('Failed to add product to cart');
        } finally {
            setLoading(false);
        }
    }

    if (ploading) {
        return (<div role="status" className="px-4 mt-3 space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center">
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
                <svg className="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
            </div>
            <div className="w-full">
                <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5" />
                <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]" />
            </div>
            <span className="sr-only">Loading...</span>
        </div>
        )
    }

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900">
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div className="space-y-4">
                        <Carousel className="carousel w-full max-w-xl">
                            <CarouselContent>
                                {product?.images.map((image, index) => (
                                    <CarouselItem key={index}>
                                        <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                                            <img
                                                alt={`${product.title}${index + 1}`}
                                                className="object-contain w-full h-full"
                                                height="600"
                                                src={image}
                                                style={{
                                                    aspectRatio: "1/1",
                                                    objectFit: "contain",
                                                }}
                                                width="600"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                                <Button onClick={() => {
                                    setModal3d(true)
                                    // window.onscroll = function () { window.scrollTo(0, 0); }
                                }} className="absolute bottom-2 right-2">View 3d</Button>
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </div>
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{product?.title || 'Earpods Pro'}</h1>
                            <div className="flex items-center">
                                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                </svg>
                                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
                                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                                <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                            </div>

                        </div>
                        <div>
                            <p className="text-4xl font-bold">{product ? `$${product.price}` : '$249.99'}</p>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Free shipping on orders over $100</p>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Description</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Experience unparalleled sound quality with our latest Earpods Pro. Featuring active noise cancellation,
                                adaptive EQ, and a customizable fit, these earpods deliver an exceptional listening experience. With up to
                                6 hours of listening time and an additional 24 hours with the charging case, your music never stops.
                            </p>
                        </div>
                        <div className="flex justify-between">
                            <div
                                onClick={() => handleCart(product?.id)}
                                className={`flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}  >
                                {loading ? (
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <ShoppingCart className="mr-2 h-5 w-5" />
                                        Add to cart
                                    </>
                                )}
                            </div>
                            <Link href={`/user/checkoutone/${product?.id}`}>
                                <button type="button" className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-8 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                    Buy Now
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Key Features</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
                        <li>Active Noise Cancellation</li>
                        <li>Adaptive EQ</li>
                        <li>Customizable fit with multiple ear tip sizes</li>
                        <li>Water and sweat resistant</li>
                        <li>30 hours total listening time with charging case</li>
                    </ul>
                </div>
                <div className="bg-gray-50">
                    {/* Reviews */}
                    <div>
                        <div className="flex items-center mb-2">
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                            </svg>
                            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
                            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
                            <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
                        </div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">1,745 global ratings</p>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">5 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '70%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">70%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">4 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '17%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">17%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">3 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '8%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">8%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">2 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '4%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">4%</span>
                        </div>
                        <div className="flex items-center mt-4">
                            <a href="#" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">1 star</a>
                            <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                                <div className="h-5 bg-yellow-300 rounded" style={{ width: '1%' }} />
                            </div>
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">1%</span>
                        </div>
                    </div>
                    <Reviews></Reviews>
                    {/* /Reviews */}
                </div>
            </div>
            {
                modal3d &&
                <div className="w-full h-screen bg-white absolute top-0">
                    <Button onClick={() => {
                        setModal3d(false)
                        // window.onscroll = null;
                    }} className="absolute top-20 left-4 underline z-10">close</Button>
                    <Model3d  />
                </div>
            }
        </>

    );
}
