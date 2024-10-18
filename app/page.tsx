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
            text="Discover Your Perfect Space"
            default_velocity={5}
            className="font-display text-center text-4xl font-bold tracking-[-0.02em] text-black drop-shadow-sm dark:text-white md:text-7xl md:leading-[5rem]"
          />

          <section className="bg-white py-12 text-gray-700 sm:py-16 lg:py-20">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold sm:text-3xl">Our Best Selling Profuct</h2>
                <p className="mt-4 text-base text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Purus faucibus massa dignissim tempus.</p>
              </div>
              <div className="mt-10 lg:mt-16 lg:grid-cols-4 lg:gap-4">
                <AllProducts></AllProducts>
              </div>
            </div>
          </section>

          <section className="mx-3">
            <div className="overflow-hidden rounded-xl">
              <div className="flex flex-col overflow-hidden bg-white sm:flex-row md:h-80">
                <div className="relative order-first ml-auto h-48 w-full bg-gray-700 sm:order-none sm:h-auto sm:w-1/2 lg:w-full">
                  <img className="h-full w-full object-cover relative" src="assets/sofa.jpeg" loading="lazy" alt="kjk" />
                  {/* LAMP DOT  */}
                  <div className="absolute top-[33%] left-[16%]">
                    <div className="relative flex items-center justify-center">
                      {/* <!-- Dot --> */}
                      <div className="absolute w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      {/* <!-- Ring --> */}
                      <div className="absolute w-4 h-4 border-[2px] border-white rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <hr className="absolute w-12" />
                      <span className="text-[#0d3945] text-sm flex items-center justify-center w-20 h-6 bg-[#ffffff66] backdrop-blur-sm rounded-xl absolute -top-[12px] left-[48px] text-center">Lamps</span>
                    </div>
                  </div>
                  {/* PILLOW DOT  */}
                  <div className="absolute top-[44%] left-[58%]">
                    <div className="relative flex items-center justify-center">
                      {/* <!-- Dot --> */}
                      <div className="absolute w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      {/* <!-- Ring --> */}
                      <div className="absolute w-4 h-4 border-[2px] border-white rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <hr className="absolute w-12 rotate-90 top-[-32px] left-[-24px]" />
                      <span className="text-white text-sm w-20 h-6 bg-[#ffffff66] backdrop-blur-sm rounded-xl absolute -top-[79px] -left-[40px] flex items-center justify-center">Pillows</span>
                    </div>
                  </div>
                  {/* TABLE DOT  */}
                  <div className="absolute top-[70%] right-[24%]">
                    <div className="relative flex items-center justify-center">
                      {/* <!-- Dot --> */}
                      <div className="absolute w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      {/* <!-- Ring --> */}
                      <div className="absolute w-4 h-4 border-[2px] border-white rounded-full animate-pulse"></div>
                    </div>
                    <div>
                      <hr className="absolute md:w-12 w-9" />
                      <span className="text-white text-sm flex items-center justify-center w-16 h-6 bg-[#ffffff66] backdrop-blur-sm rounded-xl absolute -top-[12px] left-[25px] md:left-[48px] text-center">Table</span>
                    </div>
                  </div>
                </div>
                <div className="flex w-full flex-col p-4 sm:w-1/2 sm:p-8 lg:w-3/5">
                  <h2 className="text-xl font-bold text-gray-900 md:text-2xl lg:text-4xl">Winter Collection</h2>
                  <p className="mt-2 text-lg">By Luis Vuitton</p>
                  <p className="mt-4 mb-8 max-w-md text-gray-500">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam iusto, cumque dolores sit odio ex.</p>
                  <a href="#" className="group mt-auto flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition">
                    <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Shop now </span>
                    <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                </div>
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
