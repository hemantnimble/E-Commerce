'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Review {
    id: string;
    title: string;
    price: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

const ProductReviews = ({ productId }: { productId: any }) => {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.post("/api/user/reviews/fetch",{productId});
                setReviews(response.data.reviews);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchReviews();
    }, [productId]);

    return (
        <div>
            <h3>Reviews</h3>
            {reviews &&
                reviews.length > 0 ? (
                reviews.map((review:any) => (
                    <div key={review.id}>
                        <p>
                            <strong>{review.user.name}</strong> ({review.rating}/5)
                        </p>
                        <p>{review.content}</p>
                    </div>
                ))
            ) : (
                <p>No reviews yet.</p>
            )}
        </div>
    );
};

export default ProductReviews;
