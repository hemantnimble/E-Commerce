'use client'
import { Toaster } from "react-hot-toast";
import AllProducts from "@/components/AllProducts";
import Link from "next/link";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import TextReveal from "@/components/magicui/text-reveal";

export default function Home() {

  return (
    <main className="flex flex-col gap-5">
      <Toaster />
      <div className="flex flex-col min-h-dvh">
        <main className="flex-1">
          <section className="relative h-[60vh] lg:h-[85vh] w-full overflow-hidden">
            <div className="grid grid-cols-4 grid-rows-5 gap-2 lg:gap-4 w-full h-full py-3 px-6">
              <div className="row-span-3">
                <img src="https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448750.jpg?ga=GA1.1.696854174.1725166886&semt=ais_hybrid" alt="Image 1" className="rounded-lg w-full h-full object-cover" />
              </div>
              <div className="col-span-2 row-span-2">
                <img src="https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448751.jpg?ga=GA1.1.696854174.1725166886&semt=ais_hybrid" alt="Image 2" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="row-span-3 col-start-4">
                <img src="https://img.freepik.com/free-photo/clothing-rack-with-floral-hawaiian-shirts-hangers-hat_23-2149366018.jpg?ga=GA1.1.696854174.1725166886&semt=ais_hybrid" alt="Image 3" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="row-span-2 col-start-1 row-start-4">
                <img src="https://img.freepik.com/free-photo/shirt-mockup-concept-with-plain-clothing_23-2149448748.jpg?ga=GA1.1.696854174.1725166886&semt=ais_hybrid" alt="Image 4" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="row-span-3 col-start-2 row-start-3">
                <img src="https://img.freepik.com/premium-photo/3d-rendered-photo-mens-clothes-ad-backgorund_1198274-27546.jpg?ga=GA1.1.696854174.1725166886&semt=ais_hybrid" alt="Image 5" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="col-span-2 col-start-3 row-start-5">
                <img src="https://img.freepik.com/free-photo/clothing-rack-with-hawaiian-shirts-with-floral-print-hat_23-2149366013.jpg?ga=GA1.1.696854174.1725166886&semt=ais_hybrid" alt="Image 8" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="row-span-2 col-start-3 row-start-3">
                <img src="https://img.freepik.com/free-photo/assortment-father-son-clothing_23-2148868939.jpg?ga=GA1.1.696854174.1725166886&semt=ais_hybrid" alt="Image 10" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="col-start-4 row-start-4">
                <img src="https://img.freepik.com/free-photo/view-hawaiian-shirt-with-pants-sneakers_23-2149366039.jpg?ga=GA1.1.696854174.1725166886&semt=ais_hybrid" alt="Image 11" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </section>
          <VelocityScroll
            text="Fashion On Point"
            default_velocity={5}
            className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
          />
          <div className="textRevel z-10 flex min-h-[16rem] items-center justify-center rounded-lg border bg-white dark:bg-black">
            <TextReveal  text="Magic UI will change the way you design." />
          </div>
          <section className="py-12 md:py-16 lg:py-20">
            <div className=" w-full">
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
                {/*  */}
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
      </div>
    </main>
  );
}
