'use client'
import axios from 'axios'
import React, { useState } from 'react'
import { useForm, SubmitHandler } from "react-hook-form"
import "@uploadthing/react/styles.css";
import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../app/api/uploadthing/core";
import Link from "next/link";

type Inputs = {
    title: string
    price: number
    category: string
}

function AddProduct() {
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

            const response = await axios.post("/api/products/add", productData);

            console.log('API response:', response);
            if (response.status === 200) {
                alert('Product added successfully!');
            } else if (response.status === 500) {
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
                            type="number"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                        Enter category
                    </label>
                    <div className="mt-2">
                        <input {...register("category", { required: true })}
                            id="category"
                            name="category"
                            type="text"
                            required
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Add Now
                    </button>
                </div>
                <section className="flex min-h-screen flex-col items-center justify-start p-24">
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
            </form>
        </>
    )
}

export default AddProduct
