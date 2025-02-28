'use client';
import { useEffect } from 'react';
import Card from './Card';
import { fetchProducts } from '@/lib/store/features/products/productSlice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';


function AllProducts({ category }: { category: string }) {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((state) => state.products);

  // Fetch products when the category changes
  useEffect(() => {
    dispatch(fetchProducts(category));
  }, [category, dispatch]);

  // Skeleton loading component
  const SkeletonCard = () => (
    <div className="mb-10 relative">
      <div className="relative group">
        {/* Skeleton for Cart Button */}
        <div className="h-8 w-8 bg-gray-200 rounded-full absolute top-2 right-2 animate-pulse"></div>

        {/* Tooltip Skeleton */}
        <div className="absolute top-10 right-0 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs p-2 rounded-lg">
          Add to Cart
        </div>
      </div>

      {/* Skeleton for Image */}
      <div className="w-full h-56 sm:h-72 bg-gray-200 rounded-lg animate-pulse"></div>

      <div className="flex justify-between px-2 py-2 items-start">
        <span>
          {/* Skeleton for Title */}
          <div className="w-32 h-4 bg-gray-200 rounded-md animate-pulse mb-2"></div>
          {/* Skeleton for Price */}
          <div className="w-16 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        </span>
        <span className="flex items-center gap-1">
          {/* Skeleton for Star Icon */}
          <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse"></div>
          {/* Skeleton for Rating */}
          <div className="w-8 h-4 bg-gray-200 rounded-md animate-pulse"></div>
        </span>
      </div>
    </div>
  );

  // Handle loading state
  if (status === 'loading') {
    return (
      <section className="w-full grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
        {Array.from({ length: items.length }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </section>
    );
  }

  // Handle error state
  if (status === 'failed') {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // Handle empty state
  if (items.length === 0) {
    return <p>No products found</p>;
  }

  // Render the products
  return (
    <section className="w-full grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </section>
  );
}

export default AllProducts;