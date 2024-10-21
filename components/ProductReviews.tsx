'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { Trash } from 'lucide-react';

interface Review {
    id: string;
    rating: number;
    price: string;
    images: string[];
    createdAt: string;
    updatedAt: string;
}

const ProductReviews = ({ productId }: { productId: any }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [reviewPopup, setReviewPopup] = useState(false);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0); // Changed initial rating to 0
    const [hoverRating, setHoverRating] = useState(0);
    const session = useSession();
    const userId = session.data?.user.id;

    const fetchReviews = async () => {
        try {
            const response = await axios.post("/api/user/reviews/fetch", { productId });
            setReviews(response.data.reviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };
    useEffect(() => {
        fetchReviews();
    }, [productId]);

    const averageRating = reviews.length
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
        : 0;

    const renderStars = (rating: any) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width={36}
                    height={36}
                    viewBox="0 0 36 36"
                    fill="none"
                    className={i <= rating ? 'fill-current text-yellow-500' : 'fill-[#dddddd]'} // Change color based on rating
                >
                    <g clipPath="url(#clip0_13624_3137)">
                        <path
                            d="M17.1033 2.71738C17.4701 1.97413 18.5299 1.97413 18.8967 2.71738L23.0574 11.1478C23.2031 11.4429 23.4846 11.6475 23.8103 11.6948L33.1139 13.0467C33.9341 13.1659 34.2616 14.1739 33.6681 14.7524L26.936 21.3146C26.7003 21.5443 26.5927 21.8753 26.6484 22.1997L28.2376 31.4656C28.3777 32.2825 27.5203 32.9055 26.7867 32.5198L18.4653 28.145C18.174 27.9919 17.826 27.9919 17.5347 28.145L9.21334 32.5198C8.47971 32.9055 7.62228 32.2825 7.76239 31.4656L9.35162 22.1997C9.40726 21.8753 9.29971 21.5443 9.06402 21.3146L2.33193 14.7524C1.73841 14.1739 2.06593 13.1659 2.88615 13.0467L12.1897 11.6948C12.5154 11.6475 12.7969 11.4429 12.9426 11.1478L17.1033 2.71738Z"
                        />
                    </g>
                    <defs>
                        <clipPath id="clip0_13624_3137">
                            <rect width={36} height={36} fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            );
        }
        return stars;
    };

    const StarRating = ({ rating }: { rating: number }) => {
        const fullStars = Math.floor(rating); // Get the number of full stars
        const hasHalfStar = rating % 1 >= 0.5; // Check if there's a half star
        const totalStars = 5; // Total number of stars

        return (
            <div className="flex items-center gap-1">
                {/* Render full stars */}
                {[...Array(fullStars)].map((_, index) => (
                    <svg key={`full-${index}`} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                        <g clipPath="url(#clip0_13624_2974)">
                            <path d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z" fill="#FBBF24" />
                        </g>
                        <defs>
                            <clipPath id="clip0_13624_2974">
                                <rect width={30} height={30} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                ))}
                {/* Render half star if applicable */}
                {hasHalfStar && (
                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                        <g clipPath="url(#clip0_13624_2974)">
                            <path d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z" fill="#FBBF24" />
                        </g>
                        <defs>
                            <clipPath id="clip0_13624_2974">
                                <rect width={30} height={30} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                )}
                {/* Render empty stars */}
                {[...Array(totalStars - fullStars - (hasHalfStar ? 1 : 0))].map((_, index) => (
                    <svg key={`empty-${index}`} xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                        <g clipPath="url(#clip0_13624_2974)">
                            <path d="M14.1033 2.56698C14.4701 1.82374 15.5299 1.82374 15.8967 2.56699L19.1757 9.21093C19.3214 9.50607 19.6029 9.71064 19.9287 9.75797L27.2607 10.8234C28.0809 10.9426 28.4084 11.9505 27.8149 12.5291L22.5094 17.7007C22.2737 17.9304 22.1662 18.2614 22.2218 18.5858L23.4743 25.8882C23.6144 26.7051 22.7569 27.3281 22.0233 26.9424L15.4653 23.4946C15.174 23.3415 14.826 23.3415 14.5347 23.4946L7.9767 26.9424C7.24307 27.3281 6.38563 26.7051 6.52574 25.8882L7.7782 18.5858C7.83384 18.2614 7.72629 17.9304 7.49061 17.7007L2.1851 12.5291C1.59159 11.9505 1.91909 10.9426 2.73931 10.8234L10.0713 9.75797C10.3971 9.71064 10.6786 9.50607 10.8243 9.21093L14.1033 2.56698Z" fill="#E5E7EB" />
                        </g>
                        <defs>
                            <clipPath id="clip0_13624_2974">
                                <rect width={30} height={30} fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                ))}
            </div>
        );
    };

    const handleSubmit = async (e: any) => {
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
        } finally {
            fetchReviews();
            setReviewPopup(false);
            setContent('');
            setRating(0);
        }
    };

    const deleteReview = async (id: string, e: any) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/user/reviews/delete', { reviewId: id, });
            toast.success('Review deleted');
        } catch (error) {
            console.error('Error deleting review:', error);
            toast.error('Failed to delete review');
        } finally {
            fetchReviews();
        }
    };
    return (
        <div >
            <h2 className="font-bold text-2xl sm:text-4xl leading-10 text-black mb-5">
                Customer reviews &amp;
                rating</h2>
            <div className="grid grid-cols-12 mb-11">
                {/* ratings  */}
                <div className="col-span-12 max-xl:mt-8 xl:col-span-8 xl:pl-8 w-full min-h-[230px]">
                    <div className="grid grid-cols-12 h-full px-8 max-lg:py-8 rounded-3xl bg-gray-100 w-full">
                        <div className="col-span-12 md:col-span-8 flex items-center">
                            <div className="flex flex-col sm:flex-row items-center max-lg:justify-center w-full h-full">
                                <div className="sm:pr-3 sm:border-r border-gray-200 flex items-center justify-center flex-col">
                                    <h2 className="font-manrope font-bold text-5xl text-black text-center mb-4">
                                        {averageRating ? averageRating.toFixed(1) : 'No ratings yet'}
                                    </h2>
                                    <div className="flex items-center gap-3 mb-4">
                                        {renderStars(Math.round(averageRating))}
                                    </div>
                                    <p className="font-normal text-lg leading-8 text-gray-400">
                                        {reviews.length} Ratings
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4 max-lg:mt-8 md:pl-8">
                            <div className="flex items-center flex-col justify-center w-full h-full ">
                                <button onClick={() => setReviewPopup(true)} className="rounded-full px-6 py-4 bg-indigo-600 font-semibold text-lg text-white whitespace-nowrap mb-6 w-full text-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                                    Write A Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* reviews display  */}
            <div className="pb-8 border-b border-gray-200 ">
                <h4 className="font-manrope font-semibold text-3xl leading-10 text-black mb-6">Most helpful positive
                    review</h4>
                {reviews &&
                    reviews.length > 0 ? (
                    reviews.map((review: any) => (
                        <div key={review.id}>
                            <div className="flex sm:items-center flex-col sm:flex-row justify-between  mb-4">
                            <StarRating rating={review.rating} /> 
                                <div className="flex items-center gap-3">
                                    <h6 className="font-semibold text-lg leading-8 text-black">@{review.user.name}</h6>
                                    <p className="font-medium text-base leading-7 text-gray-400">{new Date(review.createdAt).toLocaleDateString()}</p>
                                    {/* <button >X</button> */}
                                    <Trash className='cursor-pointer hover:text-red-600 hover:animate-pulse' onClick={(e) => deleteReview(review.id, e)}></Trash>
                                </div>
                            </div>
                            <p className="font-normal text-lg leading-8 text-gray-500 ">
                                {review.content}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
            {/* Review Submission Form */}
            {reviewPopup &&
                <section className='absolute z-10 top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white w-full rounded-md shadow-lg'>
                    <form onSubmit={handleSubmit} className="p-4">
                        {/* Star Rating Section */}
                        <div className="mb-4">
                            <label htmlFor="rating" className="block text-lg font-medium mb-2">Rating</label>
                            <div className="flex space-x-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <FaStar
                                        key={star}
                                        className={`cursor-pointer text-2xl ${star <= (hoverRating || rating) ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHoverRating(star)}
                                        onMouseLeave={() => setHoverRating(0)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Review Content */}
                        <div className="mb-4">
                            <label htmlFor="content" className="block text-lg font-medium mb-2">Review</label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md"
                                rows={4}
                                placeholder="Write your review here..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            disabled={rating === 0 || !content} // Disable if rating or content is empty
                        >
                            Submit Review
                        </button>
                    </form>
                </section>
            }
        </div>
    );
};

export default ProductReviews;


