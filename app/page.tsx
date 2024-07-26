'use client'
import { Toaster } from "react-hot-toast";
import AllProducts from "@/components/AllProducts";

export default function Home() {
  return (
    <main className="flex flex-col gap-5">
      <Toaster />
      <AllProducts />
    </main>
  );
}
