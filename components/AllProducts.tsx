'use client'

import axios from "axios"
import { useState, useEffect } from "react"

interface Product {
  id: string;
  title: string;
  price: string;
  createdAt: string;
  updatedAt: string;
}

function AllProducts() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<{ products: Product[] }>("/api/products")
        // console.log("Response data:", response.data) 
        setProducts(response.data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div>
      <h1>All Products</h1>
      {products.length > 0 ? (
        products.map(item => (
          <div key={item.id}>
            <h2>{item.title}</h2>
            <p>{item.price}</p>
          </div>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  )
}

export default AllProducts
