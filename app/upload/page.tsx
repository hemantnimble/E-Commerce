"use client";

// Import styles for the button
import "@uploadthing/react/styles.css";

import { UploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core"; // Adjust path as needed

import { useState } from 'react';
import Link from "next/link";

export default function UploadButtonPage() {
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
        <main className="flex min-h-screen flex-col items-center justify-start p-24">
            <UploadButton<OurFileRouter, "imageUploader">
                endpoint="imageUploader"
                onClientUploadComplete={(res:any) => {
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
        </main>
    );
}
