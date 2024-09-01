'use client'

import * as React from "react"
import { Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function EnhancedEarpodsProductPage() {
  const [selectedColor, setSelectedColor] = React.useState("white")

  const colors = [
    { name: "White", value: "white", class: "bg-white" },
    { name: "Black", value: "black", class: "bg-black" },
    { name: "Green", value: "green", class: "bg-green-500" },
    { name: "Pink", value: "pink", class: "bg-pink-500" },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <div className="grid lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-4">
          <Badge className="mb-2">New Release</Badge>
          <Carousel className="w-full max-w-xl">
            <CarouselContent>
              {[...Array(4)].map((_, index) => (
                <CarouselItem key={index}>
                  <div className="overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                    <img
                      alt={`Earpods Pro - View ${index + 1}`}
                      className="object-cover w-full h-full"
                      height="600"
                      src={`/placeholder.svg?height=600&width=600&text=Earpods+Image+${index + 1}`}
                      style={{
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                      width="600"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">Earpods Pro</h1>
            <div className="flex items-center space-x-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">(121 reviews)</span>
            </div>
          </div>
          <div>
            <p className="text-4xl font-bold">$249.99</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Free shipping on orders over $100</p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Select Color</h2>
            <div className="flex space-x-4">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`w-12 h-12 rounded-full border-2 ${
                    selectedColor === color.value ? "border-primary" : "border-transparent"
                  } focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => setSelectedColor(color.value)}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Experience unparalleled sound quality with our latest Earpods Pro. Featuring active noise cancellation,
              adaptive EQ, and a customizable fit, these earpods deliver an exceptional listening experience. With up to
              6 hours of listening time and additional 24 hours with the charging case, your music never stops.
            </p>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Key Features</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Active Noise Cancellation</li>
              <li>Adaptive EQ</li>
              <li>Customizable fit with multiple ear tip sizes</li>
              <li>Water and sweat resistant</li>
              <li>30 hours total listening time with charging case</li>
            </ul>
          </div>
          <Button size="lg" className="w-full text-lg">
            <ShoppingCart className="mr-2 h-5 w-5" />
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}