'use client'
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const SubmitReview = ({ productId, userId }:{productId:any,userId:any}) => {
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/reviews/add', {
                productId,
                userId,
                content,
                rating,
            });
            toast.success('Review submitted');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="rating">Rating</label>
                <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                >
                    {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="content">Review</label>
                <textarea
                    id="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                ></textarea>
            </div>
            <button type="submit">Submit Review</button>
        </form>
    );
};

export default SubmitReview;
