'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    title: string
    price: string
}
interface Product {
    id: string;
    title: string;
    price: string;
}


function UpdateProduct() {
    const params = useParams<{ id: string }>()
    const id = params?.id;

    useEffect(() => {
        const fetchProducts = async (id: any) => {
            try {
                const response = await axios.post<{ product: Product }>("/api/products/getsingleproduct", { id })
                reset({
                    title: response.data.product.title,
                    price: response.data.product.price,
                })
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        fetchProducts(id)
    }, [id])
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        axios.put("/api/products/update", {id,...data})
            .then(response => {
                console.log('API response:', response);
                if (response.status === 200) {
                    alert('Product added successfully!');
                } else if (response.status === 500) {
                    alert('Failed to add product. Please try again.');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }
    return (
        <>
            <h1 className='text-xl'>Add New Product</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[30rem] py-6 px-10'>
                <div>
                    <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                        Enter Title/Name
                    </label>
                    <div className="mt-2">
                        <input {...register("title", { required: true })}
                            id="title"
                            name="title"
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                        Enter Price
                    </label>
                    <div className="mt-2">
                        <input {...register("price", { required: true })}
                            id="price"
                            name="price"
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="mt-4 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        UPDATE Now
                    </button>
                </div>
            </form>
        </>
    )
}

export default UpdateProduct
