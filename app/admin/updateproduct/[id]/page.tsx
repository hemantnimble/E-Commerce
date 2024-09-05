'use client'
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../../api/uploadthing/core";
import { useForm, SubmitHandler } from "react-hook-form"

type Inputs = {
    title: string
    price: string
}

interface Product {
    id: string;
    title: string;
    price: string;
    images: string[],
}

function UpdateProduct() {
    const params = useParams<{ id: string }>()
    const id = params?.id;
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<string[]>([]);

    useEffect(() => {
        const fetchProducts = async (id: string) => {
            try {
                const response = await axios.post<{ product: Product }>("/api/products/getsingleproduct", { id })
                reset({
                    title: response.data.product.title,
                    price: response.data.product.price,
                })
                setExistingImages(response.data.product.images)
            } catch (error) {
                console.error("Error fetching products:", error)
            }
        }
        if (id) {
            fetchProducts(id);
        }
    }, [id]);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const allImages = [...existingImages, ...newImages];
        axios.put("/api/products/update", { id, ...data, images: allImages })
            .then(response => {
                console.log('API response:', response);
                if (response.status === 200) {
                    alert('Product updated successfully!');
                } else if (response.status === 500) {
                    alert('Failed to update product. Please try again.');
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const imgList = (
        <>
            <h2 className="text-lg font-semibold">Existing Images</h2>
            <ul className='flex gap-2'>
                {existingImages.map((url, index) => (
                    <li key={index} className="mt-2">
                        <img className='w-[25rem]' src={`${url}`} alt="" />
                    </li>
                ))}
            </ul>
            <h2 className="text-lg font-semibold mt-4">New Images</h2>
            <ul>
                {newImages.map((url, index) => (
                    <li key={index} className="mt-2">
                        <img className='w-44' src={`${url}`} alt="" />
                    </li>
                ))}
            </ul>
        </>
    );

    return (
        <>
            <h1 className='text-xl'>Update Product</h1>
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
                <section className="flex flex-col items-center justify-start p-4">
                    <UploadButton<OurFileRouter, "imageUploader">
                        endpoint="imageUploader"
                        onClientUploadComplete={(res: any) => {
                            if (res) {
                                const newImageUrls = res.map((file: { url: string }) => file.url);
                                setNewImages(newImageUrls);
                            }
                            alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                            alert(`ERROR! ${error.message}`);
                        }}
                    />
                    {imgList}
                </section>
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
