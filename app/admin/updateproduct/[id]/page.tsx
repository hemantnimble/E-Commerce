'use client'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../../../api/uploadthing/core";
import { useForm, SubmitHandler } from "react-hook-form"
import { useAppDispatch, useAppSelector } from '@/app/lib/store/hooks';
import { updateProduct, fetchSingleProduct } from '@/app/lib/store/features/products/productSlice';

type Inputs = {
    title: string
    price: number
    stock: number
    category:string;
}

interface Product {
    id: string;
    title: string;
    price: number;
    stock: number;
    category:string;
    images: string[],
}

function UpdateProduct() {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.products);
    
    const params = useParams<{ id: string }>()
    const id = params?.id;
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [newImages, setNewImages] = useState<string[]>([]);
    
    const product = items.find((p) => p.id === id);
    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()


    useEffect(() => {
        if (id) {
            if (items.length === 0) {
                // Fetch single product if items array is empty
                dispatch(fetchSingleProduct(id))
                    .unwrap()
                    .then((product) => {
                        reset({
                            title: product.title,
                            price: product.price,
                            stock: product.stock,
                        });
                        setExistingImages(product.images);
                    })
                    .catch((error) => {
                        console.error("Error fetching product:", error);
                    });
            } else if (product) {
                // Prefill form if product is found in items array
                reset({
                    title: product.title,
                    price: product.price,
                    stock: product.stock,
                });
                setExistingImages(product.images);
            }
        }
    }, [id, items, product, dispatch, reset]);



    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const allImages = [...existingImages, ...newImages];
        const updatedProduct = { id, ...data, images: allImages };

        try {
            await dispatch(updateProduct(updatedProduct)).unwrap();
            alert('Product updated successfully!');
        } catch (error) {
            alert(`Failed to update product: ${error}`);
        }
    };

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
                            type="number"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                        Enter stock
                    </label>
                    <div className="mt-2">
                        <input {...register("stock", { required: true })}
                            id="stock"
                            name="stock"
                            type="number"
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
