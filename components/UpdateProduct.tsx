'use client'
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import Card from './Card';

interface Product {
    id: string;
    title: string;
    price: string;
    images:string[];
    createdAt: string;
    updatedAt: string;
}
function UpdateProduct() {
    const [products, setProducts] = useState<Product[]>([])

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get<{ products: Product[] }>("/api/products/getproducts")
                setProducts(response.data.products)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }

        fetchProducts()
    }, [])

    const handleDelete = async (id: string) => {
        const deleteProduct = await axios.post("/api/products/delete", { id })
    }

    return (
        <>
            <h1>
                Existing Products
                {products.length > 0 ? (
                    products.map(item => (
                        <div key={item.id}>
                            <Card item={item}></Card>
                            <Link href={`/updateproduct/${item.id}`}>
                                <button className='mr-6 text-blue-700'>Update</button>
                            </Link>
                            <button onClick={() => handleDelete(item.id)} className='text-red-600'>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>Loading products...</p>
                )}
            </h1>

        </>
    )
}

export default UpdateProduct