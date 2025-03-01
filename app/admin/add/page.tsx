'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { addProduct } from '@/lib/store/features/products/productSlice';

type Inputs = {
    title: string
    price: number
    category: string
    stock: number
}

function AddProduct() {
    const dispatch = useAppDispatch();
    const { items, status, error } = useAppSelector((state) => state.products);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>()

    const [images, setImages] = useState<{
        name: string;
        size: number;
        key: string;
        serverData: {
            uploadedBy: string;
        };
        url: string;
        customId: string | null;
        type: string;
    }[]>([]);

    const title = images.length ? (
        <>
            <p>Upload Complete!</p>
            <p className="mt-2">{images.length} files</p>
        </>
    ) : null;

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            // Include image URLs in the product data
            const productData = {
                ...data,
                images: images.map(image => image.url), // Extract image URLs
            };

            // const response = await axios.post("/api/products/add", productData);
            dispatch(addProduct(productData))
            // console.log('API response:', response);
            if (status === "succeeded") {
                alert('Product added successfully!');
            } else if (status === "failed") {
                alert('Failed to add product. Please try again.');
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    const imgList = (
        <>
            {title}
            <ul>
                {images.map(image => (
                    <li key={image.key} className="mt-2">
                        {image.url ? (
                            <Link href={image.url} target="_blank">
                                {image.url}
                            </Link>
                        ) : (
                            <p>URL not available</p>
                        )}
                    </li>
                ))}
            </ul>
        </>
    );
    return (
        <>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new product</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="sm:col-span-2">
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                                <input {...register("title", { required: true })} type="text" name="title" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                                <input {...register("stock", { required: true })} type="number" name="stock" id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="stock" required />
                            </div>
                            <div className="w-full">
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                                <input {...register("price", { required: true })} type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$2999" required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product category</label>
                                <input {...register("category", { required: true })} type="text" name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type product name" required />
                            </div>
                            {/* <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                                <select id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option selected>Select category</option>
                                    <option value="TV">TV/Monitors</option>
                                    <option value="PC">PC</option>
                                    <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option>
                                </select>
                            </div> */}
                            {/* <div>
                                <label htmlFor="item-weight" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Item Weight (kg)</label>
                                <input type="number" name="item-weight" id="item-weight" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder={"12"} required />
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                <textarea id="description" rows={8} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here" defaultValue={""} />
                            </div> */}
                        </div>
                        <section className="flex flex-col items-center justify-start pt-4">
                            <UploadButton<OurFileRouter, "imageUploader">
                                endpoint="imageUploader"
                                onClientUploadComplete={(res: any) => {
                                    if (res) {
                                        setImages(res);
                                        const json = JSON.stringify(res);

                                    }
                                    alert("Upload Completed");
                                }}
                                onUploadError={(error: Error) => {
                                    // Do something with the error
                                    alert(`ERROR! ${error.message}`);
                                }}
                            />
                            {imgList}
                        </section>
                        <button type="submit" className="mt-4 flex w-full justify-center rounded-md bg-cyan-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"> Add Product </button>
                    </form>
                </div>
            </section>
        </>
    )
}

export default AddProduct




