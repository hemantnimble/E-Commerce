'use client'
import { UserDetails } from "@/actions/auth";
import { auth } from "@/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useSession } from "next-auth/react";
import AllProducts from "@/components/AllProducts";

export default function Home() {
  const session = useSession()
  return (
    <main className="flex flex-col gap-5">
      <Toaster />
      <p>Landing Page</p>
      <Link href="/signin">
        <button>SignIn</button>
      </Link>
      {session && (
        <p>
          name: {session?.data?.user?.name}
          <br />
          email: {session?.data?.user?.email}
        </p>
      )}
      <AllProducts />
      <Link href="/add">
        <button>Add Products</button>
      </Link>
      <Link href="/updateproduct">
        <button>Update Products</button>
      </Link>
    </main>
  );
}
