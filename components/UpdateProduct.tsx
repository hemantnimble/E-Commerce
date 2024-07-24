'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface Product {
    id: string;
    title: string;
    price: string;
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
        try {
            const response = await axios.post(
                "/api/products/delete",
                { id },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log('Delete response:', response.data);
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    }
    return (
        <>
            <h1>
                Existing Products
                {products.length > 0 ? (
                    products.map(item => (
                        <div key={item.id}>
                            <h2>{item.title}</h2>
                            <p>{item.price}</p>
                            <button className='mr-6 text-blue-700'>Update</button>
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