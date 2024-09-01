'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingCart, Star } from "lucide-react"

const ProductCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg aspect-square">
        <img
          src={images[currentIndex]}
          alt={`Product image ${currentIndex + 1}`}
          className="object-cover w-full h-full transition-opacity duration-500"
        />
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 left-2 transform -translate-y-1/2"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous image</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-1/2 right-2 transform -translate-y-1/2"
        onClick={nextSlide}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next image</span>
      </Button>
      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              index === currentIndex ? 'bg-primary' : 'bg-muted'
            }`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to image {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const StarRating = ({ rating }) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`}
        />
      ))}
      <span className="ml-2 text-sm text-muted-foreground">({rating.toFixed(1)})</span>
    </div>
  )
}

export function EnhancedProductPage() {
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('white')
  const [quantity, setQuantity] = useState(1)

  const productImages = [
    "/placeholder.svg?height=600&width=600&text=Front",
    "/placeholder.svg?height=600&width=600&text=Back",
    "/placeholder.svg?height=600&width=600&text=Side",
    "/placeholder.svg?height=600&width=600&text=Detail",
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ProductCarousel images={productImages} />
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Premium Cotton T-Shirt</h1>
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-semibold">$29.99</p>
              <StarRating rating={4.7} />
            </div>
            <p className="text-muted-foreground mb-6">
              Elevate your everyday style with our Premium Cotton T-Shirt. Crafted from 100% organic cotton, this
              versatile piece offers both comfort and a sleek aesthetic. Its clean lines and perfect fit make it an
              essential addition to any wardrobe.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="color-select">Color</Label>
              <RadioGroup
                id="color-select"
                value={selectedColor}
                onValueChange={setSelectedColor}
                className="flex space-x-2 mt-2"
              >
                {['white', 'black', 'gray', 'blue'].map((color) => (
                  <RadioGroupItem
                    key={color}
                    value={color}
                    id={`color-${color}`}
                    className={`w-6 h-6 rounded-full bg-${color === 'white' ? 'gray-200' : color}-500`}
                  />
                ))}
              </RadioGroup>
            </div>
            <div>
              <Label htmlFor="size-select">Size</Label>
              <Select id="size-select" value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="xs">XS</SelectItem>
                  <SelectItem value="s">S</SelectItem>
                  <SelectItem value="m">M</SelectItem>
                  <SelectItem value="l">L</SelectItem>
                  <SelectItem value="xl">XL</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="quantity-select">Quantity</Label>
              <div className="flex items-center mt-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <span className="mx-4 font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>
            <Button className="w-full" size="lg">
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="details" className="mt-12">
        <TabsList>
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="care">Care Instructions</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>100% organic cotton for superior comfort</li>
            <li>Reinforced seams for durability</li>
            <li>Tailored fit for a modern silhouette</li>
            <li>Available in multiple colors</li>
            <li>Suitable for both casual and semi-formal occasions</li>
          </ul>
        </TabsContent>
        <TabsContent value="care" className="mt-4">
          <ul className="list-disc pl-5 space-y-2">
            <li>Machine wash cold with like colors</li>
            <li>Tumble dry low</li>
            <li>Do not bleach</li>
            <li>Iron on low heat if needed</li>
            <li>Do not dry clean</li>
          </ul>
        </TabsContent>
        <TabsContent value="shipping" className="mt-4">
          <p>
            We offer free standard shipping on all orders over $50. Orders typically process within 1-2 business days.
            Delivery times vary based on location but usually take 3-5 business days.
          </p>
          <p className="mt-2">
            If you're not completely satisfied with your purchase, you can return it within 30 days for a full refund
            or exchange. Please see our returns policy for more details.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  )
}