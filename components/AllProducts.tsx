'use client'

import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./Card";

interface Product {
  id: string;
  title: string;
  price: string;
  images: string[],
  createdAt: string;
  updatedAt: string;
}

function AllProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>("/api/products/getproducts")
        setProducts(response.data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [])

  const SkeletonCard = () => (
    <article className="relative  h-96 w-80 animate-pulse">
      <div className="h-full w-full bg-gray-200"></div>
      <div className="absolute top-0 m-1 rounded-full bg-white">
        <div className="text-[10px] rounded-full bg-gray-300 p-1 sm:px-3 sm:py-1 h-4 w-12"></div>
      </div>
      <div className="mt-4 flex items-start justify-between">
        <div>
          <div className="h-4 bg-gray-300 rounded w-32 sm:w-40 mb-2"></div>
          <div className="flex space-x-1">
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
            <div className="h-3 w-3 bg-gray-300 rounded-full"></div>
          </div>
        </div>
        <div className="text-right">
          <div className="h-4 w-16 bg-gray-300 mb-1"></div>
          <div className="h-4 w-10 bg-gray-300"></div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center bg-gray-300 rounded-md h-10 w-full"></div>
    </article>

  );

  return (
    <section className='w-full flex gap-3 justify-center flex-wrap'>
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
