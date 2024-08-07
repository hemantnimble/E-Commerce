'use client'

import axios from "axios"
import { useState, useEffect } from "react"
import Card from "./Card";

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
        const response = await axios.get<{ products: Product[] }>("/api/products/getproducts")
        // console.log("Response data:", response.data) 
        setProducts(response.data.products)
      } catch (error) {
        console.error("Error fetching products:", error)
      }
    }

    fetchProducts()
  }, [])

  return (
    <div className="flex flex-wrap justify-evenly">
      {products.length > 0 ? (
        products.map(item => (
          <Card key={item.id} item={item}></Card>
        ))
      ) : (
        <p>Loading products...</p>
      )}
    </div>
  )
}

export default AllProducts
