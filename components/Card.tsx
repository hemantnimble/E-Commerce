import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useCart } from './CartContext';

interface Item {
    id: string;
    price: string;
    title: string;
    images: string[];
}

function Card({ item }: { item: Item }) {
    const [loading, setLoading] = useState(false);
    const { cartItems, setCartItems } = useCart();
    const handleCart = async (productId: string) => {
        setLoading(true);
        try {
            const response1 = await axios.post("/api/cart/add", { productId, quantity: 1 });
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

    return (
        <div className="relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
            <a className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl" href="#">
                <img className="object-cover" src={`${item.images[0]}`} alt="product image" />
                <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">39% OFF</span>
            </a>
            <div className="mt-4 px-5 pb-5">
                <Link href={`/product/${item.id}`}>
                    <h5 className="text-xl tracking-tight text-slate-900">{item.title}</h5>
                </Link>
                <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                        <span className="text-3xl font-bold text-slate-900">${item.price}</span>
                        {/* <span className="text-sm text-slate-900 line-through">$699</span> */}
                    </p>
                    <div className="flex items-center">
                        {/* Add star ratings here */}
                        <span className="mr-2 ml-3 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">5.0</span>
                    </div>
                </div>
                <div 
                    onClick={() => handleCart(item.id)} 
                    className={`flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    // disabled={loading}
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            Add to cart
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Card;
