'use client'

import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./Card";

interface Product {
  id: string;
  title: string;
  price: string;
  category: string;
  images: string[],
  createdAt: string;
  updatedAt: string;
}

function AllProducts({ category }: { category: string }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post<{ products: Product[] }>("/api/products/filter", {category})
        setProducts(response.data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [category])

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

  return (
    <section className='w-full grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5'>
      {loading ? (
        Array.from({ length: 2 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))
      ) : (
        products.length > 0 ? (
          products.map(item => (
            <Card key={item.id} item={item}></Card>
          ))
        ) : (
          <p>No products found</p>
        )
      )}
    </section>
  )
}

export default AllProducts;
