'use client'
import { Toaster } from "react-hot-toast";
import AllProducts from "@/components/AllProducts";
import Link from "next/link";
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
import TextReveal from "@/components/magicui/text-reveal";
import Footer from "@/components/Footer";

export default function Home() {

  return (
    <main className="flex flex-col gap-5">
      <Toaster />
      <div className="flex flex-col min-h-dvh">
        <main className="flex-1">
          <section className="relative h-[60vh] lg:h-[85vh] w-full overflow-hidden">
            <div className="grid grid-cols-4 grid-rows-5 gap-2 lg:gap-4 w-full h-full py-3 px-6">
              <div className="row-span-3">
                <img src="https://img.freepik.com/free-psd/gadget-concept-poster-template_23-2148626930.jpg?semt=ais_hybrid" alt="Image 1" className="rounded-lg w-full h-full object-cover" />
              </div>
              <div className="col-span-2 row-span-2">
                <img src="https://img.freepik.com/premium-psd/airpods-cover-case-mockup_23-2150263561.jpg?semt=ais_hybrid" alt="Image 2" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="row-span-3 col-start-4">
                <img src="https://img.freepik.com/premium-psd/airpods-cover-case-mockup_23-2150263512.jpg?semt=ais_hybrid" alt="Image 3" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="row-span-2 col-start-1 row-start-4">
                <img src="https://img.freepik.com/premium-psd/wireless-earphones-case-mockup-psd-template_77323-1942.jpg?semt=ais_hybrid" alt="Image 4" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="row-span-3 col-start-2 row-start-3">
                <img src="https://img.freepik.com/premium-psd/airpods-cover-case-mockup_23-2150263528.jpg?semt=ais_hybrid" alt="Image 5" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="col-span-2 col-start-3 row-start-5">
                <img src="https://img.freepik.com/premium-psd/airpods-cover-case-mockup_23-2150263504.jpg?semt=ais_hybrid" alt="Image 8" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="row-span-2 col-start-3 row-start-3">
                <img src="https://img.freepik.com/premium-psd/airpods-cover-case-mockup_23-2150263590.jpg?semt=ais_hybrid" alt="Image 10" className="w-full h-full object-cover rounded-lg" />
              </div>
              <div className="col-start-4 row-start-4">
                <img src="https://img.freepik.com/premium-psd/airpods-cover-case-mockup_23-2150263488.jpg?semt=ais_hybrid" alt="Image 11" className="w-full h-full object-cover rounded-lg" />
              </div>
            </div>
          </section>
          <VelocityScroll
            text="Fashion On Point"
            default_velocity={5}
            className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
          />

          <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div className="mx-auto max-w-md text-center">
                <h2 className="font-serif text-2xl font-bold sm:text-3xl">Our featured Aroma Range</h2>
                <p className="mt-4 text-base text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus massa dignissim tempus.</p>
              </div>
              <div className="mt-10 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                <AllProducts></AllProducts>
              </div>
            </div>
          </section>
          <div className="textRevel z-10 flex min-h-[16rem] items-center justify-center rounded-lg border bg-white dark:bg-black">
            <TextReveal text="Immerse yourself in crystal-clear audio with our premium earbuds." />
          </div>
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
      <Footer />
    </main>
  );
}
