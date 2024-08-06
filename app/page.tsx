'use client'
import { Toaster } from "react-hot-toast";
import AllProducts from "@/components/AllProducts";
import Link from "next/link";


export default function Home() {

  return (
    <main className="flex flex-col gap-5">
      <Toaster />
      <div className="flex flex-col min-h-dvh">
      <main className="flex-1">
        <section className="relative h-[80vh] w-full overflow-hidden">
          <img
            src="https://img.freepik.com/premium-photo/product-photography-simple-background-sports-shoes-with-chinese-landscape-carving-style_919910-666.jpg"
            alt="Hero Image"
            className="h-full w-full object-cover object-center"
            width={1920}
            height={1080}
            style={{ aspectRatio: "1920/1080", objectFit: "cover" }}
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">Elevate Your Style</h1>
              <p className="mt-4 text-lg md:text-xl">Discover the latest fashion trends and must-have pieces.</p>
              <Link
                href="#"
                className="mt-8 inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Featured Products</h2>
              <p className="mt-4 text-muted-foreground">Discover our latest fashion collections.</p>
            </div>
            <div className="">
            <AllProducts />

            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20 bg-muted">
          <div className="container">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">New Arrivals</h2>
              <p className="mt-4 text-muted-foreground">Check out our latest fashion collections.</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {/* {[1, 2, 3, 4].map((item) => (
                <Card key={item}>
                  <img
                    src="/placeholder.svg"
                    alt={`New Arrival ${item}`}
                    className="h-64 w-full object-cover object-center"
                    width={400}
                    height={400}
                    style={{ aspectRatio: "400/400", objectFit: "cover" }}
                  />
                  <CardContent className="p-4">
                    <h3 className="text-lg font-medium">New Arrival {item}</h3>
                    <p className="mt-2 text-muted-foreground">$59.99</p>
                    <div className="mt-4">
                      <Button>Add to Cart</Button>
                    </div>
                  </CardContent>
                </Card>
              ))} */}
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Explore Our Collections</h2>
              <p className="mt-4 text-muted-foreground">Browse our latest fashion trends and must-have pieces.</p>
            </div>
            <div className="flex justify-center">
              <Link
                href="#"
                className="inline-flex items-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                prefetch={false}
              >
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:p-8 lg:p-10">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <div>
              <h4 className="text-lg font-medium">About</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Sustainability
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium">Shop</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Women
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Men
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Kids
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Sale
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium">Customer Service</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Returns & Exchanges
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Shipping & Delivery
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium">Follow Us</h4>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm hover:underline" prefetch={false}>
                    Twitter
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            &copy; 2024 Fashionista. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    </main>
  );
}
