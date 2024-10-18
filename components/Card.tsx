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
        // <Link href={`/product/${item.id}`}>
        <div className='w-48 relative mb-10'>
            <div className=''>
                <img className='rounded-t-lg h-48 w-48 object-cover' src={item.images[0]} alt={`${item.title}`} />
            </div>
            <div className='flex justify-between px-2 py-2 bg-[#195c6d] rounded-lg absolute -bottom-[42px] w-48 text-white items-center'>
                <span className='text-xs font-extralight'>
                    <h5>{item.title}</h5>
                    <p>${item.price}</p>
                </span>
                <button onClick={(e) => {
                    e.stopPropagation();
                    handleCart(item.id);
                }}
                    className='h-7 w-7 bg-white rounded-full p-[6px]'>
                    {loading ? (
                        <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 120 30"
                        fill="black"
                        className="h-[15px] w-[15px]"
                      >
                        <circle cx="15" cy="15" r="15">
                          <animate
                            attributeName="cy"
                            begin="0s"
                            dur="0.6s"
                            values="15;5;15"
                            calcMode="linear"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle cx="60" cy="15" r="15">
                          <animate
                            attributeName="cy"
                            begin="0.15s"
                            dur="0.6s"
                            values="15;5;15"
                            calcMode="linear"
                            repeatCount="indefinite"
                          />
                        </circle>
                        <circle cx="105" cy="15" r="15">
                          <animate
                            attributeName="cy"
                            begin="0.3s"
                            dur="0.6s"
                            values="15;5;15"
                            calcMode="linear"
                            repeatCount="indefinite"
                          />
                        </circle>
                      </svg>
                      
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-black w-full h-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </>
                    )}
                </button>
            </div>
        </div>
        // </Link>

    )
}

export default Card;


